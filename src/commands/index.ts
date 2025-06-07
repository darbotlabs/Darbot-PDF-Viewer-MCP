import * as vscode from 'vscode';
import * as path from 'path';
import { McpProvider } from '../providers/McpProvider';

/**
 * Command handlers for the PDF viewer extension
 */
export class CommandHandlers {
    private static mcpProvider: McpProvider | undefined;
    
    /**
     * Set the MCP provider instance
     */
    public static setMcpProvider(mcpProvider: McpProvider): void {
        CommandHandlers.mcpProvider = mcpProvider;
    }
    
    /**
     * Register all command handlers
     */
    public static registerCommands(context: vscode.ExtensionContext): void {
        
        // Open PDF command
        const openPdfCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.openPdf',
            CommandHandlers.openPdfFile
        );

        // Zoom commands
        const zoomInCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.zoomIn',
            CommandHandlers.zoomIn
        );

        const zoomOutCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.zoomOut',
            CommandHandlers.zoomOut
        );

        const fitToPageCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.fitToPage',
            CommandHandlers.fitToPage
        );

        // New PDF processing commands
        const extractTextCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.extractText',
            CommandHandlers.extractText
        );

        const extractImagesCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.extractImages',
            CommandHandlers.extractImages
        );

        const exportPdfCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.exportPdf',
            CommandHandlers.exportPdf
        );

        const getPdfSummaryCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.getPdfSummary',
            CommandHandlers.getPdfSummary
        );

        // New advanced commands
        const searchPdfTextCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.searchText',
            CommandHandlers.searchPdfText
        );

        const extractPageTextCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.extractPageText',
            CommandHandlers.extractPageText
        );

        const extractPageImageCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.extractPageImage',
            CommandHandlers.extractPageImage
        );

        const analyzePdfStructureCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.analyzeStructure',
            CommandHandlers.analyzePdfStructure
        );

        const extractTablesCommand = vscode.commands.registerCommand(
            'darbotlabs.pdf-viewer-mcp.extractTables',
            CommandHandlers.extractTables
        );

        context.subscriptions.push(
            openPdfCommand,
            zoomInCommand,
            zoomOutCommand,
            fitToPageCommand,
            extractTextCommand,
            extractImagesCommand,
            exportPdfCommand,
            getPdfSummaryCommand,
            searchPdfTextCommand,
            extractPageTextCommand,
            extractPageImageCommand,
            analyzePdfStructureCommand,
            extractTablesCommand
        );
    }

    /**
     * Open a PDF file dialog
     */
    private static async openPdfFile(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']  // Fixed naming convention
                },
                title: 'Select PDF file to open'
            });

            if (files && files.length > 0) {
                await vscode.commands.executeCommand(
                    'vscode.openWith',
                    files[0],
                    'darbotlabs.pdf-viewer-mcp'
                );
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to open PDF: ${error}`);
        }
    }

    /**
     * Extract text from a PDF file
     */
    private static async extractText(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']
                },
                title: 'Select PDF file to extract text from'
            });

            if (files && files.length > 0 && CommandHandlers.mcpProvider) {
                await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: "Extracting text from PDF",
                    cancellable: false
                }, async (progress) => {
                    try {
                        progress.report({ increment: 0 });
                        
                        const textContent = await CommandHandlers.mcpProvider!.extractPdfContent(files[0]);
                        
                        progress.report({ increment: 50 });
                        
                        // Create a new document with the extracted text
                        const doc = await vscode.workspace.openTextDocument({
                            content: textContent,
                            language: 'plaintext'
                        });
                        
                        progress.report({ increment: 100 });
                        
                        await vscode.window.showTextDocument(doc);
                        vscode.window.showInformationMessage(`Successfully extracted ${textContent.length} characters from PDF`);
                    } catch (error) {
                        vscode.window.showErrorMessage(`Failed to extract text: ${error}`);
                    }
                });
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to extract text: ${error}`);
        }
    }

    /**
     * Extract images from a PDF file
     */
    private static async extractImages(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']
                },
                title: 'Select PDF file to extract images from'
            });

            if (files && files.length > 0 && CommandHandlers.mcpProvider) {
                // Ask user for output directory
                const outputFolder = await vscode.window.showOpenDialog({
                    canSelectFiles: false,
                    canSelectFolders: true,
                    canSelectMany: false,
                    title: 'Select output folder for extracted images'
                });

                const outputDir = outputFolder ? outputFolder[0].fsPath : undefined;

                await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: "Extracting images from PDF",
                    cancellable: false
                }, async (progress) => {
                    try {
                        progress.report({ increment: 0 });
                        
                        const imagePaths = await CommandHandlers.mcpProvider!.extractPdfImages(files[0], outputDir);
                        
                        progress.report({ increment: 100 });
                        
                        if (imagePaths.length > 0) {
                            vscode.window.showInformationMessage(
                                `Successfully extracted ${imagePaths.length} images from PDF`,
                                'Show Folder'
                            ).then(selection => {
                                if (selection === 'Show Folder') {
                                    vscode.commands.executeCommand('revealFileInOS', vscode.Uri.file(path.dirname(imagePaths[0])));
                                }
                            });
                        } else {
                            vscode.window.showWarningMessage('No images were extracted from the PDF');
                        }
                    } catch (error) {
                        vscode.window.showErrorMessage(`Failed to extract images: ${error}`);
                    }
                });
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to extract images: ${error}`);
        }
    }

    /**
     * Export PDF to various formats
     */
    private static async exportPdf(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']
                },
                title: 'Select PDF file to export'
            });

            if (files && files.length > 0 && CommandHandlers.mcpProvider) {
                // Ask user for export format
                const format = await vscode.window.showQuickPick([
                    { label: 'SVG', description: 'Scalable Vector Graphics', value: 'svg' },
                    { label: 'JPEG', description: 'JPEG Image', value: 'jpeg' },
                    { label: 'PNG', description: 'PNG Image', value: 'png' },
                    { label: 'Markdown', description: 'Markdown Document', value: 'markdown' }
                ], {
                    placeHolder: 'Select export format'
                });

                if (!format) {
                    return;
                }

                // Ask for output location
                const outputFile = await vscode.window.showSaveDialog({
                    defaultUri: vscode.Uri.file(path.join(
                        path.dirname(files[0].fsPath),
                        path.basename(files[0].fsPath, '.pdf') + '.' + (format.value === 'jpeg' ? 'jpg' : format.value)
                    )),
                    filters: {
                        [format.label]: [format.value === 'jpeg' ? 'jpg' : format.value]
                    },
                    title: `Save ${format.label} file`
                });

                if (!outputFile) {
                    return;
                }

                await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: `Exporting PDF to ${format.label}`,
                    cancellable: false
                }, async (progress) => {
                    try {
                        progress.report({ increment: 0 });
                        
                        const result = await CommandHandlers.mcpProvider!.convertPdf(
                            files[0], 
                            format.value as 'svg' | 'jpeg' | 'png' | 'markdown',
                            outputFile.fsPath
                        );
                        
                        progress.report({ increment: 100 });
                        
                        vscode.window.showInformationMessage(
                            `Successfully exported PDF to ${format.label}`,
                            'Open File'
                        ).then(selection => {
                            if (selection === 'Open File') {
                                vscode.commands.executeCommand('vscode.open', vscode.Uri.file(result));
                            }
                        });
                    } catch (error) {
                        vscode.window.showErrorMessage(`Failed to export PDF: ${error}`);
                    }
                });
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to export PDF: ${error}`);
        }
    }

    /**
     * Get PDF summary
     */
    private static async getPdfSummary(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']
                },
                title: 'Select PDF file to summarize'
            });

            if (files && files.length > 0 && CommandHandlers.mcpProvider) {
                await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: "Generating PDF summary",
                    cancellable: false
                }, async (progress) => {
                    try {
                        progress.report({ increment: 0 });
                        
                        const summary = await CommandHandlers.mcpProvider!.getPdfSummary(files[0]);
                        
                        progress.report({ increment: 100 });
                        
                        // Create a new document with the summary
                        const doc = await vscode.workspace.openTextDocument({
                            content: summary,
                            language: 'plaintext'
                        });
                        
                        await vscode.window.showTextDocument(doc);
                        vscode.window.showInformationMessage('PDF summary generated successfully');
                    } catch (error) {
                        vscode.window.showErrorMessage(`Failed to generate summary: ${error}`);
                    }
                });
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to generate summary: ${error}`);
        }
    }

    /**
     * Zoom in on the current PDF
     */
    private static async zoomIn(): Promise<void> {
        // This would send a message to the active webview
        // For now, just show a message
        vscode.window.showInformationMessage('Zoom In functionality will be implemented');
    }

    /**
     * Zoom out on the current PDF
     */
    private static async zoomOut(): Promise<void> {
        // This would send a message to the active webview
        vscode.window.showInformationMessage('Zoom Out functionality will be implemented');
    }

    /**
     * Fit PDF to page
     */
    private static async fitToPage(): Promise<void> {
        // This would send a message to the active webview
        vscode.window.showInformationMessage('Fit to Page functionality will be implemented');
    }

    /**
     * Search for text within a PDF
     */
    private static async searchPdfText(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']
                },
                title: 'Select PDF file to search in'
            });

            if (files && files.length > 0) {
                const searchTerm = await vscode.window.showInputBox({
                    prompt: 'Enter text to search for',
                    placeHolder: 'Search term...'
                });

                if (searchTerm && CommandHandlers.mcpProvider) {
                    await vscode.window.withProgress({
                        location: vscode.ProgressLocation.Notification,
                        title: "Searching PDF",
                        cancellable: false
                    }, async (progress) => {
                        try {
                            progress.report({ increment: 0 });
                            
                            const results = await CommandHandlers.mcpProvider!.executeMcpTool('search_pdf_text', files[0].fsPath, searchTerm);
                            
                            progress.report({ increment: 100 });
                            
                            let resultsText = `Search Results for "${searchTerm}":\n\n`;
                            if (results.length === 0) {
                                resultsText += 'No matches found.';
                            } else {
                                results.forEach((result: any, index: number) => {
                                    resultsText += `Result ${index + 1} (Page ${result.page}):\n`;
                                    resultsText += `${result.context}\n\n`;
                                });
                            }
                            
                            const doc = await vscode.workspace.openTextDocument({
                                content: resultsText,
                                language: 'plaintext'
                            });
                            
                            await vscode.window.showTextDocument(doc);
                            vscode.window.showInformationMessage(`Found ${results.length} matches for "${searchTerm}"`);
                        } catch (error) {
                            vscode.window.showErrorMessage(`Search failed: ${error}`);
                        }
                    });
                }
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Search failed: ${error}`);
        }
    }

    /**
     * Extract text from a specific page
     */
    private static async extractPageText(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']
                },
                title: 'Select PDF file to extract page text from'
            });

            if (files && files.length > 0 && CommandHandlers.mcpProvider) {
                // First get page count
                const pageCount = await CommandHandlers.mcpProvider.executeMcpTool('get_pdf_page_count', files[0].fsPath);
                
                const pageNumberInput = await vscode.window.showInputBox({
                    prompt: `Enter page number (1-${pageCount})`,
                    placeHolder: '1',
                    validateInput: (value: string) => {
                        const num = parseInt(value);
                        if (isNaN(num) || num < 1 || num > pageCount) {
                            return `Please enter a number between 1 and ${pageCount}`;
                        }
                        return null;
                    }
                });

                if (pageNumberInput) {
                    const pageNumber = parseInt(pageNumberInput);
                    
                    await vscode.window.withProgress({
                        location: vscode.ProgressLocation.Notification,
                        title: `Extracting text from page ${pageNumber}`,
                        cancellable: false
                    }, async (progress) => {
                        try {
                            progress.report({ increment: 0 });
                            
                            const pageText = await CommandHandlers.mcpProvider!.executeMcpTool('extract_pdf_page_text', files[0].fsPath, pageNumber);
                            
                            progress.report({ increment: 100 });
                            
                            const doc = await vscode.workspace.openTextDocument({
                                content: `Page ${pageNumber} Text:\n\n${pageText}`,
                                language: 'plaintext'
                            });
                            
                            await vscode.window.showTextDocument(doc);
                            vscode.window.showInformationMessage(`Successfully extracted text from page ${pageNumber}`);
                        } catch (error) {
                            vscode.window.showErrorMessage(`Failed to extract page text: ${error}`);
                        }
                    });
                }
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to extract page text: ${error}`);
        }
    }

    /**
     * Extract a specific page as an image
     */
    private static async extractPageImage(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']
                },
                title: 'Select PDF file to extract page image from'
            });

            if (files && files.length > 0 && CommandHandlers.mcpProvider) {
                // First get page count
                const pageCount = await CommandHandlers.mcpProvider.executeMcpTool('get_pdf_page_count', files[0].fsPath);
                
                const pageNumberInput = await vscode.window.showInputBox({
                    prompt: `Enter page number (1-${pageCount})`,
                    placeHolder: '1',
                    validateInput: (value: string) => {
                        const num = parseInt(value);
                        if (isNaN(num) || num < 1 || num > pageCount) {
                            return `Please enter a number between 1 and ${pageCount}`;
                        }
                        return null;
                    }
                });

                if (pageNumberInput) {
                    const pageNumber = parseInt(pageNumberInput);
                    
                    await vscode.window.withProgress({
                        location: vscode.ProgressLocation.Notification,
                        title: `Extracting page ${pageNumber} as image`,
                        cancellable: false
                    }, async (progress) => {
                        try {
                            progress.report({ increment: 0 });
                            
                            const imagePath = await CommandHandlers.mcpProvider!.executeMcpTool('extract_pdf_page_image', files[0].fsPath, pageNumber);
                            
                            progress.report({ increment: 100 });
                            
                            // Open the image file
                            const imageUri = vscode.Uri.file(imagePath);
                            await vscode.commands.executeCommand('vscode.open', imageUri);
                            
                            vscode.window.showInformationMessage(`Page ${pageNumber} extracted as image: ${imagePath}`);
                        } catch (error) {
                            vscode.window.showErrorMessage(`Failed to extract page image: ${error}`);
                        }
                    });
                }
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to extract page image: ${error}`);
        }
    }

    /**
     * Analyze PDF structure
     */
    private static async analyzePdfStructure(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']
                },
                title: 'Select PDF file to analyze'
            });

            if (files && files.length > 0 && CommandHandlers.mcpProvider) {
                await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: "Analyzing PDF structure",
                    cancellable: false
                }, async (progress) => {
                    try {
                        progress.report({ increment: 0 });
                        
                        const analysis = await CommandHandlers.mcpProvider!.executeMcpTool('analyze_pdf_structure', files[0].fsPath);
                        
                        progress.report({ increment: 100 });
                        
                        const analysisText = `PDF Structure Analysis:\n\n` +
                            `Document Type: ${analysis.documentType}\n` +
                            `Pages: ${analysis.pages}\n` +
                            `Total Characters: ${analysis.totalCharacters}\n` +
                            `Total Words: ${analysis.totalWords}\n` +
                            `Total Lines: ${analysis.totalLines}\n` +
                            `Total Paragraphs: ${analysis.totalParagraphs}\n` +
                            `Average Words per Page: ${analysis.averageWordsPerPage}\n` +
                            `Potential Headings: ${analysis.potentialHeadings}\n` +
                            `Potential Tables: ${analysis.potentialTables}\n` +
                            `Contains Numbers: ${analysis.hasNumbers ? 'Yes' : 'No'}\n` +
                            `Contains Special Characters: ${analysis.hasSpecialCharacters ? 'Yes' : 'No'}`;
                        
                        const doc = await vscode.workspace.openTextDocument({
                            content: analysisText,
                            language: 'plaintext'
                        });
                        
                        await vscode.window.showTextDocument(doc);
                        vscode.window.showInformationMessage('PDF structure analysis completed');
                    } catch (error) {
                        vscode.window.showErrorMessage(`Analysis failed: ${error}`);
                    }
                });
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Analysis failed: ${error}`);
        }
    }

    /**
     * Extract tables from PDF
     */
    private static async extractTables(): Promise<void> {
        try {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']
                },
                title: 'Select PDF file to extract tables from'
            });

            if (files && files.length > 0 && CommandHandlers.mcpProvider) {
                await vscode.window.withProgress({
                    location: vscode.ProgressLocation.Notification,
                    title: "Extracting tables from PDF",
                    cancellable: false
                }, async (progress) => {
                    try {
                        progress.report({ increment: 0 });
                        
                        const tables = await CommandHandlers.mcpProvider!.executeMcpTool('extract_pdf_tables', files[0].fsPath);
                        
                        progress.report({ increment: 100 });
                        
                        let tablesText = 'Extracted Tables:\n\n';
                        if (tables.length === 0) {
                            tablesText += 'No tables found in the PDF.';
                        } else {
                            tables.forEach((tableData: any, index: number) => {
                                tablesText += `Table ${index + 1} (Page ${tableData.page}):\n`;
                                tablesText += '┌' + '─'.repeat(80) + '┐\n';
                                
                                tableData.table.forEach((row: string[]) => {
                                    const rowText = '│ ' + row.join(' │ ') + ' │';
                                    tablesText += rowText + '\n';
                                });
                                
                                tablesText += '└' + '─'.repeat(80) + '┘\n\n';
                            });
                        }
                        
                        const doc = await vscode.workspace.openTextDocument({
                            content: tablesText,
                            language: 'plaintext'
                        });
                        
                        await vscode.window.showTextDocument(doc);
                        vscode.window.showInformationMessage(`Found ${tables.length} tables in the PDF`);
                    } catch (error) {
                        vscode.window.showErrorMessage(`Table extraction failed: ${error}`);
                    }
                });
            }
        } catch (error) {
            vscode.window.showErrorMessage(`Table extraction failed: ${error}`);
        }
    }
}