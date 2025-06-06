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

// Removed redundant registration of the 'openPdf' command to avoid duplication.
    // Clean up MCP provider on deactivation
    context.subscriptions.push({
        dispose: () => mcpProvider.dispose()
    });
}

export function deactivate() {
    console.log('Darbot PDF Viewer MCP is now deactivated!');
}