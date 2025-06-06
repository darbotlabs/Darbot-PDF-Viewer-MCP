import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import { PdfProcessor } from '../../utils/pdf-processor';
import { McpProvider } from '../../providers/McpProvider';

suite('PDF Processing Test Suite', () => {
    let testContext: vscode.ExtensionContext;
    
    // Mock extension context for testing
    const mockContext = {
        globalStorageUri: vscode.Uri.file('/tmp/test-storage'),
        subscriptions: []
    } as any;

    suiteSetup(async () => {
        testContext = mockContext;
        
        // Ensure the test storage directory exists
        try {
            await fs.promises.mkdir(testContext.globalStorageUri.fsPath, { recursive: true });
        } catch (error) {
            // Directory might already exist
        }
    });

    test('McpProvider should initialize correctly', async () => {
        const mcpProvider = new McpProvider(testContext);
        
        // Test that MCP provider can be created
        assert.ok(mcpProvider, 'MCP provider should be created');
        
        // Test that tools are created
        mcpProvider.createMcpTools();
        const tools = mcpProvider.getMcpTools();
        
        assert.ok(tools.size > 0, 'MCP tools should be registered');
        assert.ok(tools.has('extract_pdf_text'), 'Text extraction tool should be registered');
        assert.ok(tools.has('extract_pdf_metadata'), 'Metadata extraction tool should be registered');
        assert.ok(tools.has('extract_pdf_images'), 'Image extraction tool should be registered');
        assert.ok(tools.has('convert_pdf_to_svg'), 'SVG conversion tool should be registered');
        assert.ok(tools.has('convert_pdf_to_jpeg'), 'JPEG conversion tool should be registered');
        assert.ok(tools.has('convert_pdf_to_png'), 'PNG conversion tool should be registered');
        assert.ok(tools.has('convert_pdf_to_markdown'), 'Markdown conversion tool should be registered');
        assert.ok(tools.has('get_pdf_summary'), 'PDF summary tool should be registered');
    });

    test('MCP tools should handle invalid PDF path gracefully', async () => {
        const mcpProvider = new McpProvider(testContext);
        mcpProvider.createMcpTools();
        
        const invalidPdfPath = '/nonexistent/file.pdf';
        
        try {
            await mcpProvider.executeMcpTool('extract_pdf_text', invalidPdfPath);
            assert.fail('Should have thrown an error for invalid PDF path');
        } catch (error) {
            assert.ok(error, 'Should throw error for invalid PDF path');
        }
    });

    test('PdfProcessor static methods should exist', () => {
        assert.ok(typeof PdfProcessor.extractText === 'function', 'extractText should be a function');
        assert.ok(typeof PdfProcessor.extractMetadata === 'function', 'extractMetadata should be a function');
        assert.ok(typeof PdfProcessor.extractImages === 'function', 'extractImages should be a function');
        assert.ok(typeof PdfProcessor.convertToSvg === 'function', 'convertToSvg should be a function');
        assert.ok(typeof PdfProcessor.convertToJpeg === 'function', 'convertToJpeg should be a function');
        assert.ok(typeof PdfProcessor.convertToPng === 'function', 'convertToPng should be a function');
        assert.ok(typeof PdfProcessor.convertToMarkdown === 'function', 'convertToMarkdown should be a function');
        assert.ok(typeof PdfProcessor.getPdfSummary === 'function', 'getPdfSummary should be a function');
    });

    test('Extension commands should be registered', async () => {
        // Get all available commands
        const commands = await vscode.commands.getCommands();
        
        // Check that our new commands are registered
        assert.ok(commands.includes('darbotlabs.pdf-viewer-mcp.extractText'), 'Extract text command should be registered');
        assert.ok(commands.includes('darbotlabs.pdf-viewer-mcp.extractImages'), 'Extract images command should be registered');
        assert.ok(commands.includes('darbotlabs.pdf-viewer-mcp.exportPdf'), 'Export PDF command should be registered');
        assert.ok(commands.includes('darbotlabs.pdf-viewer-mcp.getPdfSummary'), 'Get PDF summary command should be registered');
    });

    suiteTeardown(async () => {
        // Clean up test storage
        try {
            await fs.promises.rmdir(testContext.globalStorageUri.fsPath, { recursive: true });
        } catch (error) {
            // Ignore cleanup errors
        }
    });
});