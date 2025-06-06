import * as vscode from 'vscode';

/**
 * Command handlers for the PDF viewer extension
 */
export class CommandHandlers {
    
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

        context.subscriptions.push(
            openPdfCommand,
            zoomInCommand,
            zoomOutCommand,
            fitToPageCommand
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
}