import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { PdfProcessor } from '../utils/pdf-processor';

/**
 * MCP (Model Context Protocol) integration for PDF content
 */
export class McpProvider {
    private mcpTools: Map<string, Function> = new Map();
    
    constructor(private readonly context: vscode.ExtensionContext) { }

    /**
     * Initialize MCP server for PDF content extraction
     */
    public async initializeMcpServer(): Promise<void> {
        try {
            console.log('Initializing MCP Server with PDF processing capabilities');
            
            // Register MCP tools for PDF operations
            this.createMcpTools();
            
            vscode.window.showInformationMessage('MCP PDF processing tools initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize MCP server:', error);
            vscode.window.showErrorMessage('MCP initialization failed');
        }
    }

    /**
     * Extract text content from PDF for MCP tools
     */
    public async extractPdfContent(pdfUri: vscode.Uri): Promise<string> {
        try {
            console.log(`Extracting text content from: ${pdfUri.fsPath}`);
            
            const textContent = await PdfProcessor.extractText(pdfUri);
            console.log(`Successfully extracted ${textContent.length} characters from PDF`);
            
            return textContent;
            
        } catch (error) {
            console.error('Failed to extract PDF content:', error);
            throw error;
        }
    }

    /**
     * Extract metadata from PDF for MCP tools
     */
    public async extractPdfMetadata(pdfUri: vscode.Uri): Promise<any> {
        try {
            console.log(`Extracting metadata from: ${pdfUri.fsPath}`);
            
            const metadata = await PdfProcessor.extractMetadata(pdfUri);
            console.log('Successfully extracted PDF metadata:', metadata);
            
            return metadata;
            
        } catch (error) {
            console.error('Failed to extract PDF metadata:', error);
            throw error;
        }
    }

    /**
     * Extract images from PDF for MCP tools
     */
    public async extractPdfImages(pdfUri: vscode.Uri, outputDir?: string): Promise<string[]> {
        try {
            console.log(`Extracting images from: ${pdfUri.fsPath}`);
            
            // Use provided output directory or create a temp directory
            const targetDir = outputDir || path.join(this.context.globalStorageUri.fsPath, 'pdf-images', Date.now().toString());
            await fs.promises.mkdir(targetDir, { recursive: true });
            
            const imagePaths = await PdfProcessor.extractImages(pdfUri, targetDir);
            console.log(`Successfully extracted ${imagePaths.length} images from PDF`);
            
            return imagePaths;
            
        } catch (error) {
            console.error('Failed to extract PDF images:', error);
            throw error;
        }
    }

    /**
     * Convert PDF to various formats
     */
    public async convertPdf(pdfUri: vscode.Uri, format: 'svg' | 'jpeg' | 'png' | 'markdown', outputPath?: string): Promise<string> {
        try {
            console.log(`Converting PDF to ${format}: ${pdfUri.fsPath}`);
            
            let result: string;
            const defaultOutputDir = path.join(this.context.globalStorageUri.fsPath, 'pdf-exports');
            await fs.promises.mkdir(defaultOutputDir, { recursive: true });
            
            const fileName = path.basename(pdfUri.fsPath, '.pdf');
            
            switch (format) {
                case 'svg':
                    result = await PdfProcessor.convertToSvg(
                        pdfUri, 
                        outputPath || path.join(defaultOutputDir, `${fileName}.svg`)
                    );
                    break;
                case 'jpeg':
                    result = await PdfProcessor.convertToJpeg(
                        pdfUri, 
                        outputPath || path.join(defaultOutputDir, `${fileName}.jpg`)
                    );
                    break;
                case 'png':
                    result = await PdfProcessor.convertToPng(
                        pdfUri, 
                        outputPath || path.join(defaultOutputDir, `${fileName}.png`)
                    );
                    break;
                case 'markdown':
                    const markdownContent = await PdfProcessor.convertToMarkdown(pdfUri);
                    const markdownPath = outputPath || path.join(defaultOutputDir, `${fileName}.md`);
                    await fs.promises.writeFile(markdownPath, markdownContent, 'utf8');
                    result = markdownPath;
                    break;
                default:
                    throw new Error(`Unsupported format: ${format}`);
            }
            
            console.log(`Successfully converted PDF to ${format}: ${result}`);
            return result;
            
        } catch (error) {
            console.error(`Failed to convert PDF to ${format}:`, error);
            throw error;
        }
    }

    /**
     * Get PDF summary for MCP context
     */
    public async getPdfSummary(pdfUri: vscode.Uri): Promise<string> {
        try {
            console.log(`Generating summary for: ${pdfUri.fsPath}`);
            
            const summary = await PdfProcessor.getPdfSummary(pdfUri);
            console.log('Successfully generated PDF summary');
            
            return summary;
            
        } catch (error) {
            console.error('Failed to generate PDF summary:', error);
            throw error;
        }
    }

    /**
     * Create MCP tools for PDF manipulation
     */
    public createMcpTools(): void {
        console.log('Creating MCP tools for PDF manipulation');
        
        // Register PDF text extraction tool
        this.mcpTools.set('extract_pdf_text', async (pdfPath: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await this.extractPdfContent(pdfUri);
        });
        
        // Register PDF metadata extraction tool
        this.mcpTools.set('extract_pdf_metadata', async (pdfPath: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await this.extractPdfMetadata(pdfUri);
        });
        
        // Register PDF image extraction tool
        this.mcpTools.set('extract_pdf_images', async (pdfPath: string, outputDir?: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await this.extractPdfImages(pdfUri, outputDir);
        });
        
        // Register PDF conversion tools
        this.mcpTools.set('convert_pdf_to_svg', async (pdfPath: string, outputPath?: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await this.convertPdf(pdfUri, 'svg', outputPath);
        });
        
        this.mcpTools.set('convert_pdf_to_jpeg', async (pdfPath: string, outputPath?: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await this.convertPdf(pdfUri, 'jpeg', outputPath);
        });
        
        this.mcpTools.set('convert_pdf_to_png', async (pdfPath: string, outputPath?: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await this.convertPdf(pdfUri, 'png', outputPath);
        });
        
        this.mcpTools.set('convert_pdf_to_markdown', async (pdfPath: string, outputPath?: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await this.convertPdf(pdfUri, 'markdown', outputPath);
        });
        
        // Register PDF summary tool
        this.mcpTools.set('get_pdf_summary', async (pdfPath: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await this.getPdfSummary(pdfUri);
        });

        // Register page-specific tools
        this.mcpTools.set('get_pdf_page_count', async (pdfPath: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await PdfProcessor.getPageCount(pdfUri);
        });

        this.mcpTools.set('extract_pdf_page_text', async (pdfPath: string, pageNumber: number) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await PdfProcessor.extractPageText(pdfUri, pageNumber);
        });

        this.mcpTools.set('extract_pdf_page_image', async (pdfPath: string, pageNumber: number, outputPath?: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await PdfProcessor.extractPageImage(pdfUri, pageNumber, outputPath);
        });

        // Register search and analysis tools
        this.mcpTools.set('search_pdf_text', async (pdfPath: string, searchTerm: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await PdfProcessor.searchText(pdfUri, searchTerm);
        });

        this.mcpTools.set('analyze_pdf_structure', async (pdfPath: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await PdfProcessor.analyzeStructure(pdfUri);
        });

        this.mcpTools.set('extract_pdf_tables', async (pdfPath: string) => {
            const pdfUri = vscode.Uri.file(pdfPath);
            return await PdfProcessor.extractTables(pdfUri);
        });
        
        console.log(`Registered ${this.mcpTools.size} MCP tools for PDF processing`);
    }

    /**
     * Get available MCP tools
     */
    public getMcpTools(): Map<string, Function> {
        return this.mcpTools;
    }

    /**
     * Execute an MCP tool by name
     */
    public async executeMcpTool(toolName: string, ...args: any[]): Promise<any> {
        const tool = this.mcpTools.get(toolName);
        if (!tool) {
            throw new Error(`MCP tool '${toolName}' not found`);
        }
        
        try {
            return await tool(...args);
        } catch (error) {
            console.error(`Error executing MCP tool '${toolName}':`, error);
            throw error;
        }
    }

    /**
     * Dispose MCP resources
     */
    public dispose(): void {
        console.log('Disposing MCP provider resources');
        // Cleanup MCP server and tools
    }
}