import * as assert from 'assert';
import * as vscode from 'vscode';
import { McpProvider } from '../../providers/McpProvider';

suite('Integration Test Suite', () => {
    test('Extension should activate and register MCP tools', async () => {
        // Get the extension
        const extension = vscode.extensions.getExtension('darbotlabs.pdf-viewer-mcp');
        
        if (extension) {
            // Activate the extension
            await extension.activate();
            
            // Check that it's active
            assert.strictEqual(extension.isActive, true);
            
            // Test that MCP provider can be instantiated
            const mockContext = {
                globalStorageUri: vscode.Uri.file('/tmp/test'),
                subscriptions: []
            } as any;
            
            const mcpProvider = new McpProvider(mockContext);
            assert.ok(mcpProvider, 'MCP provider should be created');
            
            // Initialize and check tools
            mcpProvider.createMcpTools();
            const tools = mcpProvider.getMcpTools();
            
            assert.ok(tools.size >= 8, 'Should have at least 8 MCP tools registered');
            console.log(`Successfully registered ${tools.size} MCP tools`);
            
        } else {
            assert.fail('Extension not found');
        }
    });

    test('All new commands should be available', async () => {
        const commands = await vscode.commands.getCommands();
        
        const expectedCommands = [
            'darbotlabs.pdf-viewer-mcp.openPdf',
            'darbotlabs.pdf-viewer-mcp.extractText',
            'darbotlabs.pdf-viewer-mcp.extractImages',
            'darbotlabs.pdf-viewer-mcp.exportPdf',
            'darbotlabs.pdf-viewer-mcp.getPdfSummary',
            'darbotlabs.pdf-viewer-mcp.zoomIn',
            'darbotlabs.pdf-viewer-mcp.zoomOut',
            'darbotlabs.pdf-viewer-mcp.fitToPage'
        ];
        
        for (const command of expectedCommands) {
            assert.ok(commands.includes(command), `Command ${command} should be registered`);
        }
        
        console.log('All expected commands are registered');
    });
});