import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as pdfParse from 'pdf-parse';
import { pdf as pdfToImg } from 'pdf-to-img';
import sharp from 'sharp';

// Handle both ESM and CommonJS module formats
const pdf = (pdfParse as any).default || pdfParse;

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
            await fs.promises.mkdir(outputDir, { recursive: true });
            
            // Extract first 10 pages (to avoid excessive resource usage)
            const maxPages = 10;
            const imagePaths: string[] = [];
            
            const document = await pdfToImg(pdfUri.fsPath, { scale: 2 });
            
            let pageNumber = 0;
            for await (const image of document) {
                pageNumber++;
                if (pageNumber > maxPages) {
                    break;
                }
                
                const imagePath = path.join(outputDir, `page-${pageNumber}.png`);
                await fs.promises.writeFile(imagePath, image);
                imagePaths.push(imagePath);
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
            const document = await pdfToImg(pdfUri.fsPath, { scale: 3 });
            
            // Get first page
            let imageBuffer: Buffer | null = null;
            for await (const image of document) {
                imageBuffer = image;
                break; // Only get first page
            }
            
            if (!imageBuffer) {
                throw new Error('Failed to create temporary image for SVG conversion');
            }

            // Get image dimensions using sharp
            const metadata = await sharp(imageBuffer).metadata();
            const width = metadata.width || 1200;
            const height = metadata.height || 1600;
            
            // Create SVG wrapper around the image
            const base64Image = imageBuffer.toString('base64');
            
            const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <image xlink:href="data:image/png;base64,${base64Image}" 
         width="${width}" height="${height}" x="0" y="0"/>
</svg>`;

            await fs.promises.writeFile(outputPath, svgContent);
            
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
            const document = await pdfToImg(pdfUri.fsPath, { scale: 2 });
            
            // Get first page
            let imageBuffer: Buffer | null = null;
            for await (const image of document) {
                imageBuffer = image;
                break; // Only get first page
            }
            
            if (!imageBuffer) {
                throw new Error('Failed to convert PDF to JPEG');
            }

            // Convert PNG to JPEG using sharp
            await sharp(imageBuffer)
                .jpeg({ quality: 90 })
                .toFile(outputPath);

            return outputPath;
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
            const document = await pdfToImg(pdfUri.fsPath, { scale: 2 });
            
            // Get first page
            let imageBuffer: Buffer | null = null;
            for await (const image of document) {
                imageBuffer = image;
                break; // Only get first page
            }
            
            if (!imageBuffer) {
                throw new Error('Failed to convert PDF to PNG');
            }

            // Write PNG directly
            await fs.promises.writeFile(outputPath, imageBuffer);

            return outputPath;
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

    /**
     * Get the total number of pages in a PDF
     */
    public static async getPageCount(pdfUri: vscode.Uri): Promise<number> {
        try {
            const pdfBuffer = await fs.promises.readFile(pdfUri.fsPath);
            const data = await pdf(pdfBuffer);
            return data.numpages;
        } catch (error) {
            console.error('Failed to get page count:', error);
            throw new Error(`Page count retrieval failed: ${error}`);
        }
    }

    /**
     * Extract text from a specific page
     */
    public static async extractPageText(pdfUri: vscode.Uri, pageNumber: number): Promise<string> {
        try {
            const pdfBuffer = await fs.promises.readFile(pdfUri.fsPath);
            const data = await pdf(pdfBuffer);
            
            if (pageNumber < 1 || pageNumber > data.numpages) {
                throw new Error(`Page ${pageNumber} does not exist. PDF has ${data.numpages} pages.`);
            }
            
            // Extract text from specific page (simplified approach)
            // Note: pdf-parse doesn't directly support page-specific extraction
            // This is a basic implementation that splits content
            const fullText = data.text;
            const pages = fullText.split('\f'); // Form feed often separates pages
            
            if (pages.length >= pageNumber) {
                return pages[pageNumber - 1].trim();
            }
            
            // Fallback: estimate page content based on character distribution
            const charactersPerPage = Math.ceil(fullText.length / data.numpages);
            const startIndex = (pageNumber - 1) * charactersPerPage;
            const endIndex = Math.min(startIndex + charactersPerPage, fullText.length);
            
            return fullText.substring(startIndex, endIndex).trim();
        } catch (error) {
            console.error('Failed to extract page text:', error);
            throw new Error(`Page text extraction failed: ${error}`);
        }
    }

    /**
     * Extract a specific page as an image
     */
    public static async extractPageImage(pdfUri: vscode.Uri, pageNumber: number, outputPath?: string): Promise<string> {
        try {
            const pageCount = await this.getPageCount(pdfUri);
            if (pageNumber < 1 || pageNumber > pageCount) {
                throw new Error(`Page ${pageNumber} does not exist. PDF has ${pageCount} pages.`);
            }

            const outputDir = outputPath ? path.dirname(outputPath) : path.join(path.dirname(pdfUri.fsPath), 'extracted-pages');
            const filename = outputPath ? path.basename(outputPath) : `page-${pageNumber}.png`;
            
            await fs.promises.mkdir(outputDir, { recursive: true });

            const document = await pdfToImg(pdfUri.fsPath, { scale: 2 });
            
            // Extract specific page
            let currentPage = 0;
            let imageBuffer: Buffer | null = null;
            for await (const image of document) {
                currentPage++;
                if (currentPage === pageNumber) {
                    imageBuffer = image;
                    break;
                }
            }
            
            if (!imageBuffer) {
                throw new Error(`Failed to extract page ${pageNumber} as image`);
            }

            const finalPath = path.join(outputDir, filename);
            await fs.promises.writeFile(finalPath, imageBuffer);

            return finalPath;
        } catch (error) {
            console.error('Failed to extract page image:', error);
            throw new Error(`Page image extraction failed: ${error}`);
        }
    }

    /**
     * Search for text within the PDF and return page numbers and context
     */
    public static async searchText(pdfUri: vscode.Uri, searchTerm: string): Promise<Array<{page: number, context: string, position: number}>> {
        try {
            const text = await this.extractText(pdfUri);
            const pageCount = await this.getPageCount(pdfUri);
            const results: Array<{page: number, context: string, position: number}> = [];
            
            // Split text into pages (rough estimation)
            const pages = text.split('\f');
            if (pages.length < pageCount) {
                // Fallback: distribute text evenly across pages
                const charactersPerPage = Math.ceil(text.length / pageCount);
                for (let i = 0; i < pageCount; i++) {
                    const startIndex = i * charactersPerPage;
                    const endIndex = Math.min(startIndex + charactersPerPage, text.length);
                    pages[i] = text.substring(startIndex, endIndex);
                }
            }

            // Search in each page
            for (let pageIndex = 0; pageIndex < Math.min(pages.length, pageCount); pageIndex++) {
                const pageText = pages[pageIndex];
                const searchRegex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
                let match;
                
                while ((match = searchRegex.exec(pageText)) !== null) {
                    const contextStart = Math.max(0, match.index - 50);
                    const contextEnd = Math.min(pageText.length, match.index + searchTerm.length + 50);
                    const context = pageText.substring(contextStart, contextEnd);
                    
                    results.push({
                        page: pageIndex + 1,
                        context: context.trim(),
                        position: match.index
                    });
                }
            }

            return results;
        } catch (error) {
            console.error('Failed to search PDF text:', error);
            throw new Error(`Text search failed: ${error}`);
        }
    }

    /**
     * Analyze PDF structure and extract basic document information
     */
    public static async analyzeStructure(pdfUri: vscode.Uri): Promise<any> {
        try {
            const pdfBuffer = await fs.promises.readFile(pdfUri.fsPath);
            const data = await pdf(pdfBuffer);
            const text = data.text;
            
            // Basic structure analysis
            const lines = text.split('\n').filter((line: string) => line.trim().length > 0);
            const words = text.split(/\s+/).filter((word: string) => word.length > 0);
            const paragraphs = text.split('\n\n').filter((p: string) => p.trim().length > 0);
            
            // Estimate headings (lines that are short and may be titles)
            const potentialHeadings = lines.filter((line: string) => {
                const trimmed = line.trim();
                return trimmed.length > 5 && trimmed.length < 100 && 
                       (trimmed === trimmed.toUpperCase() || /^\d+\.?\s/.test(trimmed));
            });

            // Look for table-like structures (lines with multiple tabs or consistent spacing)
            const potentialTables = lines.filter((line: string) => {
                return (line.match(/\t/g) || []).length >= 3 || 
                       (line.match(/\s{3,}/g) || []).length >= 2;
            });

            return {
                pages: data.numpages,
                totalCharacters: text.length,
                totalWords: words.length,
                totalLines: lines.length,
                totalParagraphs: paragraphs.length,
                potentialHeadings: potentialHeadings.length,
                potentialTables: potentialTables.length,
                averageWordsPerPage: Math.round(words.length / data.numpages),
                documentType: this.detectDocumentType(text),
                hasNumbers: /\d/.test(text),
                hasSpecialCharacters: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(text)
            };
        } catch (error) {
            console.error('Failed to analyze PDF structure:', error);
            throw new Error(`Structure analysis failed: ${error}`);
        }
    }

    /**
     * Detect the likely document type based on content patterns
     */
    private static detectDocumentType(text: string): string {
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('abstract') && lowerText.includes('references')) {
            return 'academic_paper';
        } else if (lowerText.includes('invoice') || lowerText.includes('bill') || lowerText.includes('amount due')) {
            return 'invoice';
        } else if (lowerText.includes('resume') || lowerText.includes('curriculum vitae') || lowerText.includes('experience')) {
            return 'resume';
        } else if (lowerText.includes('contract') || lowerText.includes('agreement') || lowerText.includes('terms and conditions')) {
            return 'legal_document';
        } else if (lowerText.includes('chapter') && lowerText.includes('table of contents')) {
            return 'book';
        } else if ((lowerText.match(/\d+/g) || []).length > 50 && lowerText.includes('total')) {
            return 'financial_report';
        } else {
            return 'general_document';
        }
    }

    /**
     * Extract table-like structures from PDF text
     */
    public static async extractTables(pdfUri: vscode.Uri): Promise<Array<{page: number, table: string[][]}>> {
        try {
            const text = await this.extractText(pdfUri);
            const pageCount = await this.getPageCount(pdfUri);
            const tables: Array<{page: number, table: string[][]}> = [];
            
            // Split text into pages
            const pages = text.split('\f');
            if (pages.length < pageCount) {
                const charactersPerPage = Math.ceil(text.length / pageCount);
                for (let i = 0; i < pageCount; i++) {
                    const startIndex = i * charactersPerPage;
                    const endIndex = Math.min(startIndex + charactersPerPage, text.length);
                    pages[i] = text.substring(startIndex, endIndex);
                }
            }

            // Look for table patterns in each page
            for (let pageIndex = 0; pageIndex < Math.min(pages.length, pageCount); pageIndex++) {
                const pageText = pages[pageIndex];
                const lines = pageText.split('\n');
                
                // Find lines that look like table rows (multiple tab-separated values or consistent spacing)
                const tableLines: string[] = [];
                for (const line of lines) {
                    if ((line.match(/\t/g) || []).length >= 2 || 
                        (line.match(/\s{3,}/g) || []).length >= 2) {
                        tableLines.push(line);
                    }
                }

                // Group consecutive table lines
                if (tableLines.length >= 2) {
                    const table: string[][] = [];
                    for (const line of tableLines) {
                        // Split by tabs or multiple spaces
                        const cells = line.split(/\t|\s{3,}/).map(cell => cell.trim()).filter(cell => cell.length > 0);
                        if (cells.length >= 2) {
                            table.push(cells);
                        }
                    }
                    
                    if (table.length >= 2) {
                        tables.push({
                            page: pageIndex + 1,
                            table: table
                        });
                    }
                }
            }

            return tables;
        } catch (error) {
            console.error('Failed to extract tables:', error);
            throw new Error(`Table extraction failed: ${error}`);
        }
    }
}