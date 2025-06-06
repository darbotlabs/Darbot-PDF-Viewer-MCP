import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should activate', async () => {
        // Get the extension
        const extension = vscode.extensions.getExtension('darbotlabs.pdf-viewer-mcp');
        
        if (extension) {
            // Activate the extension
            await extension.activate();
            
            // Check that it's active
            assert.strictEqual(extension.isActive, true);
        } else {
            assert.fail('Extension not found');
        }
    });

    test('Commands should be registered', async () => {
        // Get all available commands
        const commands = await vscode.commands.getCommands();
        
        // Check that our commands are registered
        assert.ok(commands.includes('darbotlabs.pdf-viewer-mcp.openPdf'));
    });
});