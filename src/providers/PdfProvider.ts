import * as vscode from 'vscode';
import * as path from 'path';

/**
 * Provider for PDF custom editor
 */
export class PdfProvider implements vscode.CustomReadonlyEditorProvider {

    constructor(private readonly context: vscode.ExtensionContext) { }

    /**
     * Called when our custom editor is opened.
     */
    public async openCustomDocument(
        uri: vscode.Uri,
        openContext: { backupId?: string },
        _token: vscode.CancellationToken
    ): Promise<vscode.CustomDocument> {
        return {
            uri,
            dispose: () => { }
        };
    }

    /**
     * Called to resolve a custom editor and fill in its initial html.
     */
    public async resolveCustomEditor(
        document: vscode.CustomDocument,
        webviewPanel: vscode.WebviewPanel,
        _token: vscode.CancellationToken
    ): Promise<void> {
        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
            localResourceRoots: [
                vscode.Uri.joinPath(this.context.extensionUri, 'resources'),
                vscode.Uri.file(path.dirname(document.uri.fsPath))
            ]
        };

        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, document.uri);

        // Handle messages from the webview
        webviewPanel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'alert':
                        vscode.window.showErrorMessage(message.text);
                        return;
                    case 'log':
                        console.log(message.text);
                        return;
                }
            }
        );
    }

    /**
     * Get the static html used for the editor webview.
     */
    private getHtmlForWebview(webview: vscode.Webview, pdfUri: vscode.Uri): string {
        // Get the resource URI for the PDF file
        const pdfSrc = webview.asWebviewUri(pdfUri);
        
        // Get resource URIs for CSS and JS files
        const cssUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this.context.extensionUri, 'resources', 'webview', 'css', 'pdf-viewer.css')
        );
        const jsUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this.context.extensionUri, 'resources', 'webview', 'js', 'pdf-viewer.js')
        );

        // Use a content security policy that allows embedding PDFs
        const csp = `
            default-src 'none';
            script-src ${webview.cspSource} 'unsafe-inline';
            style-src ${webview.cspSource} 'unsafe-inline';
            object-src ${webview.cspSource};
            frame-src ${webview.cspSource} data:;
        `;

        // Read the HTML template and replace placeholders
        const htmlTemplate = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="${csp}">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>PDF Viewer</title>
                <link rel="stylesheet" href="${cssUri}">
            </head>
            <body>
                <div class="toolbar">
                    <div class="zoom-controls">
                        <button onclick="zoomOut()">−</button>
                        <span class="zoom-level" id="zoomLevel">100%</span>
                        <button onclick="zoomIn()">+</button>
                        <button onclick="fitToPage()">Fit</button>
                    </div>
                    <button onclick="downloadPdf()">Download</button>
                </div>
                
                <div class="pdf-container">
                    <object 
                        class="pdf-embed" 
                        data="${pdfSrc}" 
                        type="application/pdf"
                        id="pdfObject">
                        <div class="error-message">
                            <p>Your browser doesn't support PDF viewing.</p>
                            <p>Please download the PDF to view it: <a href="${pdfSrc}">Download PDF</a></p>
                        </div>
                    </object>
                </div>

                <script src="${jsUri}"></script>
            </body>
            </html>`;

        return htmlTemplate;
    }
}