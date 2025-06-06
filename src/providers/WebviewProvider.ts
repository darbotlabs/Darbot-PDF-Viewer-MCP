import * as vscode from 'vscode';
import { EdgeIntegration } from '../utils/edge-integration';

/**
 * Manages PDF webview panels
 */
export class WebviewProvider {
    
    private static currentPanel: vscode.WebviewPanel | undefined;

    constructor(private readonly context: vscode.ExtensionContext) { }

    /**
     * Create or show a PDF webview panel
     */
    public static createOrShow(context: vscode.ExtensionContext, pdfUri: vscode.Uri): void {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        // If we already have a panel, show it
        if (WebviewProvider.currentPanel) {
            WebviewProvider.currentPanel.reveal(column);
            return;
        }

        // Otherwise, create a new panel
        const panel = vscode.window.createWebviewPanel(
            'pdfViewer',
            'PDF Viewer',
            column || vscode.ViewColumn.One,
            EdgeIntegration.getOptimalWebviewOptions(context.extensionUri)
        );

        WebviewProvider.currentPanel = panel;

        // Set the webview's initial html content
        panel.webview.html = WebviewProvider.getWebviewContent(panel.webview, pdfUri);

        // Listen for when the panel is disposed
        panel.onDidDispose(
            () => {
                WebviewProvider.currentPanel = undefined;
            },
            null,
            context.subscriptions
        );

        // Handle messages from the webview
        panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'alert':
                        vscode.window.showErrorMessage(message.text);
                        return;
                    case 'info':
                        vscode.window.showInformationMessage(message.text);
                        return;
                }
            },
            undefined,
            context.subscriptions
        );
    }

    /**
     * Get the HTML content for the webview
     */
    private static getWebviewContent(webview: vscode.Webview, pdfUri: vscode.Uri): string {
        const pdfSrc = webview.asWebviewUri(pdfUri);
        const csp = EdgeIntegration.getEnhancedCSP(webview);

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="${csp}">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>PDF Viewer</title>
        </head>
        <body>
            <h1>PDF Viewer</h1>
            <iframe src="${pdfSrc}" width="100%" height="600px"></iframe>
        </body>
        </html>`;
    }
}