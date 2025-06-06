import * as vscode from 'vscode';

/**
 * Utilities for Edge WebView2 integration
 */
export class EdgeIntegration {
    
    /**
     * Check if Edge WebView2 is available on the system
     */
    public static isEdgeWebView2Available(): boolean {
        // For now, assume it's available on Windows
        // In a real implementation, this would check for the WebView2 runtime
        return process.platform === 'win32';
    }

    /**
     * Get enhanced CSP for Edge WebView2
     */
    public static getEnhancedCSP(webview: vscode.Webview): string {
        return `
            default-src 'none';
            script-src ${webview.cspSource} 'unsafe-inline' 'unsafe-eval';
            style-src ${webview.cspSource} 'unsafe-inline';
            object-src ${webview.cspSource} data: blob:;
            frame-src ${webview.cspSource} data: blob:;
            connect-src ${webview.cspSource} https: data:;
            img-src ${webview.cspSource} data: blob:;
        `;
    }

    /**
     * Configure webview options for optimal PDF rendering
     */
    public static getOptimalWebviewOptions(extensionUri: vscode.Uri): vscode.WebviewOptions {
        return {
            enableScripts: true,
            enableForms: true,
            enableCommandUris: true,
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, 'resources'),
                vscode.Uri.joinPath(extensionUri, 'webview')
            ],
            portMapping: []
        };
    }

    /**
     * Log Edge WebView2 specific information
     */
    public static logWebViewInfo(): void {
        const isAvailable = this.isEdgeWebView2Available();
        console.log(`Edge WebView2 Available: ${isAvailable}`);
        console.log(`Platform: ${process.platform}`);
        console.log(`Node Version: ${process.version}`);
    }
}