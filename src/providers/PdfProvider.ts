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

        // Use a content security policy that allows embedding PDFs
        const csp = `
            default-src 'none';
            script-src ${webview.cspSource} 'unsafe-inline';
            style-src ${webview.cspSource} 'unsafe-inline';
            object-src ${webview.cspSource};
            frame-src ${webview.cspSource} data:;
        `;

        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="${csp}">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>PDF Viewer</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: var(--vscode-editor-background);
                        color: var(--vscode-editor-foreground);
                        font-family: var(--vscode-font-family);
                        display: flex;
                        flex-direction: column;
                        height: 100vh;
                    }
                    
                    .toolbar {
                        background-color: var(--vscode-toolbar-hoverBackground);
                        padding: 8px;
                        border-bottom: 1px solid var(--vscode-panel-border);
                        display: flex;
                        align-items: center;
                        gap: 8px;
                    }
                    
                    .toolbar button {
                        background-color: var(--vscode-button-background);
                        color: var(--vscode-button-foreground);
                        border: none;
                        padding: 4px 8px;
                        border-radius: 2px;
                        cursor: pointer;
                        font-size: 12px;
                    }
                    
                    .toolbar button:hover {
                        background-color: var(--vscode-button-hoverBackground);
                    }
                    
                    .pdf-container {
                        flex: 1;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        overflow: auto;
                        background-color: var(--vscode-editor-background);
                    }
                    
                    .pdf-embed {
                        width: 100%;
                        height: 100%;
                        border: none;
                    }
                    
                    .error-message {
                        color: var(--vscode-errorForeground);
                        text-align: center;
                        padding: 20px;
                    }
                    
                    .zoom-controls {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                    
                    .zoom-level {
                        font-size: 12px;
                        min-width: 50px;
                        text-align: center;
                    }
                </style>
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

                <script>
                    const vscode = acquireVsCodeApi();
                    let currentZoom = 100;
                    
                    function zoomIn() {
                        currentZoom = Math.min(currentZoom + 25, 500);
                        updateZoom();
                    }
                    
                    function zoomOut() {
                        currentZoom = Math.max(currentZoom - 25, 25);
                        updateZoom();
                    }
                    
                    function fitToPage() {
                        currentZoom = 100;
                        updateZoom();
                    }
                    
                    function updateZoom() {
                        document.getElementById('zoomLevel').textContent = currentZoom + '%';
                        const pdfObject = document.getElementById('pdfObject');
                        pdfObject.style.transform = 'scale(' + (currentZoom / 100) + ')';
                        pdfObject.style.transformOrigin = 'center top';
                    }
                    
                    function downloadPdf() {
                        const link = document.createElement('a');
                        link.href = '${pdfSrc}';
                        link.download = '';
                        link.click();
                    }
                    
                    // Initialize
                    document.addEventListener('DOMContentLoaded', function() {
                        vscode.postMessage({
                            command: 'log',
                            text: 'PDF viewer initialized'
                        });
                    });
                </script>
            </body>
            </html>`;
    }
}