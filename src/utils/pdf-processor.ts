import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import pdf from 'pdf-parse';
import pdf2pic from 'pdf2pic';
import * as sharp from 'sharp';

/**
 * Utility class for PDF processing operations
 */
export class PdfProcessor {

    /**
     * Extract text content from a PDF file
     */
    public static async extractText(pdfUri: vscode.Uri): Promise<string> {
        try {
            const pdfBuffer = await fs.promises.readFile(pdfUri.fsPath);
            const data = await pdf(pdfBuffer);
            return data.text;
        } catch (error) {
            console.error('Failed to extract text from PDF:', error);
            throw new Error(`Text extraction failed: ${error}`);
        }
    }

    /**
     * Extract metadata from a PDF file
     */
    public static async extractMetadata(pdfUri: vscode.Uri): Promise<any> {
        try {
            const pdfBuffer = await fs.promises.readFile(pdfUri.fsPath);
            const data = await pdf(pdfBuffer);
            return {
                title: data.info?.Title || 'Unknown',
                author: data.info?.Author || 'Unknown',
                subject: data.info?.Subject || 'Unknown',
                creator: data.info?.Creator || 'Unknown',
                producer: data.info?.Producer || 'Unknown',
                creationDate: data.info?.CreationDate || null,
                modificationDate: data.info?.ModDate || null,
                pages: data.numpages,
                version: data.version
            };
        } catch (error) {
            console.error('Failed to extract metadata from PDF:', error);
            throw new Error(`Metadata extraction failed: ${error}`);
        }
    }

    /**
     * Extract images from PDF pages and save to specified directory
     */
    public static async extractImages(pdfUri: vscode.Uri, outputDir: string): Promise<string[]> {
        try {
            const convert = pdf2pic.fromPath(pdfUri.fsPath, {
                density: 200,
                saveFilename: "page",
                savePath: outputDir,
                format: "png",
                width: 2000,
                height: 2000
            });

            // Extract first 10 pages (to avoid excessive resource usage)
            const maxPages = 10;
            const imagePaths: string[] = [];
            
            for (let i = 1; i <= maxPages; i++) {
                try {
                    const result = await convert(i, { responseType: "image" });
                    if (result.path) {
                        imagePaths.push(result.path);
                    }
                } catch (pageError) {
                    // Some pages might fail, continue with others
                    console.warn(`Failed to extract page ${i}:`, pageError);
                    break; // If a page fails, likely we've reached the end
                }
            }

            return imagePaths;
        } catch (error) {
            console.error('Failed to extract images from PDF:', error);
            throw new Error(`Image extraction failed: ${error}`);
        }
    }

    /**
     * Convert PDF to SVG format
     */
    public static async convertToSvg(pdfUri: vscode.Uri, outputPath: string): Promise<string> {
        try {
            // For SVG conversion, we'll first convert to high-quality PNG then create SVG wrapper
            const tempDir = path.join(path.dirname(outputPath), 'temp');
            await fs.promises.mkdir(tempDir, { recursive: true });
            
            const convert = pdf2pic.fromPath(pdfUri.fsPath, {
                density: 300,
                saveFilename: "svg_temp",
                savePath: tempDir,
                format: "png",
                width: 1200,
                height: 1600
            });

            const result = await convert(1, { responseType: "image" });
            if (!result.path) {
                throw new Error('Failed to create temporary image for SVG conversion');
            }

            // Create SVG wrapper around the image
            const imageBuffer = await fs.promises.readFile(result.path);
            const base64Image = imageBuffer.toString('base64');
            
            const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="1200" height="1600" viewBox="0 0 1200 1600">
  <image xlink:href="data:image/png;base64,${base64Image}" 
         width="1200" height="1600" x="0" y="0"/>
</svg>`;

            await fs.promises.writeFile(outputPath, svgContent);
            
            // Clean up temp file
            await fs.promises.unlink(result.path);
            await fs.promises.rmdir(tempDir);
            
            return outputPath;
        } catch (error) {
            console.error('Failed to convert PDF to SVG:', error);
            throw new Error(`SVG conversion failed: ${error}`);
        }
    }

    /**
     * Convert PDF to JPEG format
     */
    public static async convertToJpeg(pdfUri: vscode.Uri, outputPath: string): Promise<string> {
        try {
            const convert = pdf2pic.fromPath(pdfUri.fsPath, {
                density: 200,
                saveFilename: path.basename(outputPath, '.jpg'),
                savePath: path.dirname(outputPath),
                format: "jpg",
                width: 1600,
                height: 2000
            });

            const result = await convert(1, { responseType: "image" });
            if (!result.path) {
                throw new Error('Failed to convert PDF to JPEG');
            }

            return result.path;
        } catch (error) {
            console.error('Failed to convert PDF to JPEG:', error);
            throw new Error(`JPEG conversion failed: ${error}`);
        }
    }

    /**
     * Convert PDF to PNG format
     */
    public static async convertToPng(pdfUri: vscode.Uri, outputPath: string): Promise<string> {
        try {
            const convert = pdf2pic.fromPath(pdfUri.fsPath, {
                density: 200,
                saveFilename: path.basename(outputPath, '.png'),
                savePath: path.dirname(outputPath),
                format: "png",
                width: 1600,
                height: 2000
            });

            const result = await convert(1, { responseType: "image" });
            if (!result.path) {
                throw new Error('Failed to convert PDF to PNG');
            }

            return result.path;
        } catch (error) {
            console.error('Failed to convert PDF to PNG:', error);
            throw new Error(`PNG conversion failed: ${error}`);
        }
    }

    /**
     * Convert PDF content to Markdown format
     */
    public static async convertToMarkdown(pdfUri: vscode.Uri): Promise<string> {
        try {
            const text = await this.extractText(pdfUri);
            const metadata = await this.extractMetadata(pdfUri);
            
            // Create structured markdown from PDF content
            let markdown = `# ${metadata.title}\n\n`;
            
            if (metadata.author && metadata.author !== 'Unknown') {
                markdown += `**Author:** ${metadata.author}\n\n`;
            }
            
            if (metadata.subject && metadata.subject !== 'Unknown') {
                markdown += `**Subject:** ${metadata.subject}\n\n`;
            }
            
            markdown += `**Pages:** ${metadata.pages}\n\n`;
            
            if (metadata.creationDate) {
                markdown += `**Created:** ${metadata.creationDate}\n\n`;
            }
            
            markdown += '---\n\n';
            
            // Process the text content
            const lines = text.split('\n');
            let inCodeBlock = false;
            
            for (const line of lines) {
                const trimmedLine = line.trim();
                
                // Skip empty lines
                if (!trimmedLine) {
                    markdown += '\n';
                    continue;
                }
                
                // Try to identify headings (lines that are all caps or start with numbers)
                if (trimmedLine.length < 100 && (
                    trimmedLine === trimmedLine.toUpperCase() ||
                    /^\d+\.?\s/.test(trimmedLine) ||
                    /^[A-Z][A-Z\s]{5,}$/.test(trimmedLine)
                )) {
                    markdown += `\n## ${trimmedLine}\n\n`;
                } else {
                    markdown += `${trimmedLine}\n\n`;
                }
            }
            
            return markdown;
        } catch (error) {
            console.error('Failed to convert PDF to Markdown:', error);
            throw new Error(`Markdown conversion failed: ${error}`);
        }
    }

    /**
     * Get a summary of PDF content suitable for MCP context
     */
    public static async getPdfSummary(pdfUri: vscode.Uri): Promise<string> {
        try {
            const text = await this.extractText(pdfUri);
            const metadata = await this.extractMetadata(pdfUri);
            
            // Create a concise summary
            const textSample = text.length > 500 ? text.substring(0, 500) + '...' : text;
            
            return `PDF Summary:
Title: ${metadata.title}
Author: ${metadata.author}
Pages: ${metadata.pages}
Content Sample: ${textSample}`;
        } catch (error) {
            console.error('Failed to create PDF summary:', error);
            throw new Error(`PDF summary generation failed: ${error}`);
        }
    }
}