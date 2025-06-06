import * as vscode from 'vscode';
import { PdfProvider } from './providers/PdfProvider';
import { McpProvider } from './providers/McpProvider';
import { CommandHandlers } from './commands';
import { EdgeIntegration } from './utils/edge-integration';

export function activate(context: vscode.ExtensionContext) {
    console.log('Darbot PDF Viewer MCP is now active!');

    // Log Edge WebView2 information
    EdgeIntegration.logWebViewInfo();

    // Initialize MCP provider
    const mcpProvider = new McpProvider(context);
    mcpProvider.initializeMcpServer().catch(err => {
        console.error('MCP initialization failed:', err);
    });

    // Register the PDF custom editor provider
    const pdfProvider = new PdfProvider(context);
    context.subscriptions.push(
        vscode.window.registerCustomEditorProvider(
            'darbotlabs.pdf-viewer-mcp',
            pdfProvider,
            {
                webviewOptions: {
                    retainContextWhenHidden: true,
                },
                supportsMultipleEditorsPerDocument: false,
            }
        )
    );

    // Register all commands
    CommandHandlers.registerCommands(context);

    // Register additional command for opening PDFs
    const openPdfCommand = vscode.commands.registerCommand(
        'darbotlabs.pdf-viewer-mcp.openPdf',
        async () => {
            const files = await vscode.window.showOpenDialog({
                canSelectFiles: true,
                canSelectFolders: false,
                canSelectMany: false,
                filters: {
                    pdfs: ['pdf']  // Fixed naming convention warning
                }
            });

            if (files && files.length > 0) {
                await vscode.commands.executeCommand('vscode.openWith', files[0], 'darbotlabs.pdf-viewer-mcp');
            }
        }
    );

    context.subscriptions.push(openPdfCommand);

    // Clean up MCP provider on deactivation
    context.subscriptions.push({
        dispose: () => mcpProvider.dispose()
    });
}

export function deactivate() {
    console.log('Darbot PDF Viewer MCP is now deactivated!');
}