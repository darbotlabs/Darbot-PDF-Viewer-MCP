import * as assert from 'assert';
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

/**
 * End-to-End Validation Framework for PDF Processing Extension
 */
export class ValidationFramework {
    private static testResults: Array<{test: string, status: 'pass' | 'fail' | 'warning', message: string}> = [];

    /**
     * Run comprehensive validation of the extension
     */
    public static async runFullValidation(): Promise<{passed: number, failed: number, warnings: number}> {
        this.testResults = [];

        console.log('Starting comprehensive validation...');

        await this.validateExtensionActivation();
        await this.validateCommandRegistration();
        await this.validateMcpProvider();
        await this.validatePdfProcessor();
        await this.validatePackageJson();
        await this.validateReadme();
        await this.validateErrorHandling();

        return this.generateReport();
    }

    /**
     * Validate extension activation
     */
    private static async validateExtensionActivation(): Promise<void> {
        try {
            const extension = vscode.extensions.getExtension('darbotlabs.pdf-viewer-mcp');
            
            if (!extension) {
                this.addResult('Extension Loading', 'fail', 'Extension not found');
                return;
            }

            await extension.activate();
            
            if (extension.isActive) {
                this.addResult('Extension Activation', 'pass', 'Extension activated successfully');
            } else {
                this.addResult('Extension Activation', 'fail', 'Extension failed to activate');
            }
        } catch (error) {
            this.addResult('Extension Activation', 'fail', `Activation error: ${error}`);
        }
    }

    /**
     * Validate all commands are properly registered
     */
    private static async validateCommandRegistration(): Promise<void> {
        try {
            const commands = await vscode.commands.getCommands();
            
            const expectedCommands = [
                'darbotlabs.pdf-viewer-mcp.openPdf',
                'darbotlabs.pdf-viewer-mcp.extractText',
                'darbotlabs.pdf-viewer-mcp.extractImages',
                'darbotlabs.pdf-viewer-mcp.exportPdf',
                'darbotlabs.pdf-viewer-mcp.getPdfSummary',
                'darbotlabs.pdf-viewer-mcp.searchText',
                'darbotlabs.pdf-viewer-mcp.extractPageText',
                'darbotlabs.pdf-viewer-mcp.extractPageImage',
                'darbotlabs.pdf-viewer-mcp.analyzeStructure',
                'darbotlabs.pdf-viewer-mcp.extractTables',
                'darbotlabs.pdf-viewer-mcp.zoomIn',
                'darbotlabs.pdf-viewer-mcp.zoomOut',
                'darbotlabs.pdf-viewer-mcp.fitToPage'
            ];

            let registeredCount = 0;
            for (const expectedCommand of expectedCommands) {
                if (commands.includes(expectedCommand)) {
                    registeredCount++;
                } else {
                    this.addResult('Command Registration', 'fail', `Command not registered: ${expectedCommand}`);
                }
            }

            if (registeredCount === expectedCommands.length) {
                this.addResult('Command Registration', 'pass', `All ${expectedCommands.length} commands registered`);
            } else {
                this.addResult('Command Registration', 'warning', `${registeredCount}/${expectedCommands.length} commands registered`);
            }
        } catch (error) {
            this.addResult('Command Registration', 'fail', `Command registration check failed: ${error}`);
        }
    }

    /**
     * Validate MCP Provider functionality
     */
    private static async validateMcpProvider(): Promise<void> {
        try {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { McpProvider } = await import('../../providers/McpProvider');
            const mockContext = {
                globalStorageUri: vscode.Uri.file(path.join(__dirname, 'test-temp')),
                subscriptions: []
            } as any;

            const mcpProvider = new McpProvider(mockContext);
            await mcpProvider.initializeMcpServer();

            const tools = mcpProvider.getMcpTools();
            
            const expectedTools = [
                'extract_pdf_text',
                'extract_pdf_metadata',
                'extract_pdf_images',
                'convert_pdf_to_svg',
                'convert_pdf_to_jpeg',
                'convert_pdf_to_png',
                'convert_pdf_to_markdown',
                'get_pdf_summary',
                'get_pdf_page_count',
                'extract_pdf_page_text',
                'extract_pdf_page_image',
                'search_pdf_text',
                'analyze_pdf_structure',
                'extract_pdf_tables'
            ];

            let toolsRegistered = 0;
            for (const expectedTool of expectedTools) {
                if (tools.has(expectedTool)) {
                    toolsRegistered++;
                } else {
                    this.addResult('MCP Tools', 'fail', `MCP tool not registered: ${expectedTool}`);
                }
            }

            if (toolsRegistered === expectedTools.length) {
                this.addResult('MCP Provider', 'pass', `All ${expectedTools.length} MCP tools registered`);
            } else {
                this.addResult('MCP Provider', 'warning', `${toolsRegistered}/${expectedTools.length} MCP tools registered`);
            }

        } catch (error) {
            this.addResult('MCP Provider', 'fail', `MCP provider validation failed: ${error}`);
        }
    }

    /**
     * Validate PDF Processor static methods
     */
    private static async validatePdfProcessor(): Promise<void> {
        try {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { PdfProcessor } = await import('../../utils/pdf-processor');
            
            const expectedMethods = [
                'extractText',
                'extractMetadata',
                'extractImages',
                'convertToSvg',
                'convertToJpeg',
                'convertToPng',
                'convertToMarkdown',
                'getPdfSummary',
                'getPageCount',
                'extractPageText',
                'extractPageImage',
                'searchText',
                'analyzeStructure',
                'extractTables'
            ];

            let methodsFound = 0;
            for (const methodName of expectedMethods) {
                if (typeof (PdfProcessor as any)[methodName] === 'function') {
                    methodsFound++;
                } else {
                    this.addResult('PDF Processor', 'fail', `Method not found: ${methodName}`);
                }
            }

            if (methodsFound === expectedMethods.length) {
                this.addResult('PDF Processor', 'pass', `All ${expectedMethods.length} methods available`);
            } else {
                this.addResult('PDF Processor', 'warning', `${methodsFound}/${expectedMethods.length} methods found`);
            }

        } catch (error) {
            this.addResult('PDF Processor', 'fail', `PDF processor validation failed: ${error}`);
        }
    }

    /**
     * Validate package.json configuration
     */
    private static async validatePackageJson(): Promise<void> {
        try {
            const packagePath = path.join(__dirname, '../../../package.json');
            const packageJson = JSON.parse(await fs.promises.readFile(packagePath, 'utf8'));

            // Validate required fields
            const requiredFields = ['name', 'version', 'main', 'contributes'];
            for (const field of requiredFields) {
                if (!packageJson[field]) {
                    this.addResult('Package.json', 'fail', `Missing required field: ${field}`);
                    return;
                }
            }

            // Validate commands in contributes
            if (packageJson.contributes?.commands) {
                const commandCount = packageJson.contributes.commands.length;
                if (commandCount >= 13) {
                    this.addResult('Package.json', 'pass', `${commandCount} commands defined`);
                } else {
                    this.addResult('Package.json', 'warning', `Only ${commandCount} commands defined, expected at least 13`);
                }
            } else {
                this.addResult('Package.json', 'fail', 'No commands defined in contributes');
            }

            // Validate dependencies
            const requiredDeps = ['pdf-parse', 'pdf-to-img', 'sharp', 'canvas'];
            for (const dep of requiredDeps) {
                if (!packageJson.dependencies?.[dep]) {
                    this.addResult('Package.json', 'fail', `Missing dependency: ${dep}`);
                }
            }

            if (!this.testResults.some(result => result.status === 'fail')) {
                this.addResult('Package.json', 'pass', 'Package.json structure is valid');
            }

        } catch (error) {
            this.addResult('Package.json', 'fail', `Package.json validation failed: ${error}`);
        }
    }

    /**
     * Validate README completeness
     */
    private static async validateReadme(): Promise<void> {
        try {
            const readmePath = path.join(__dirname, '../../../README.md');
            const readmeContent = await fs.promises.readFile(readmePath, 'utf8');

            const requiredSections = [
                '# Darbot PDF Viewer MCP',
                'Features',
                'Quick Start',
                'Commands',
                'MCP Integration',
                'Development'
            ];

            let sectionsFound = 0;
            for (const section of requiredSections) {
                if (readmeContent.includes(section)) {
                    sectionsFound++;
                } else {
                    this.addResult('README', 'warning', `Section missing or incomplete: ${section}`);
                }
            }

            if (sectionsFound === requiredSections.length) {
                this.addResult('README', 'pass', 'All required sections present');
            } else {
                this.addResult('README', 'warning', `${sectionsFound}/${requiredSections.length} sections found`);
            }

            // Check for new features documentation
            const newFeatures = ['search', 'page-specific', 'structure analysis', 'table extraction'];
            let featuresDocumented = 0;
            for (const feature of newFeatures) {
                if (readmeContent.toLowerCase().includes(feature)) {
                    featuresDocumented++;
                }
            }

            if (featuresDocumented >= newFeatures.length - 1) {
                this.addResult('README Features', 'pass', 'New features documented');
            } else {
                this.addResult('README Features', 'warning', 'Some new features not documented');
            }

        } catch (error) {
            this.addResult('README', 'fail', `README validation failed: ${error}`);
        }
    }

    /**
     * Validate error handling
     */
    private static async validateErrorHandling(): Promise<void> {
        try {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            const { McpProvider } = await import('../../providers/McpProvider');
            const mockContext = {
                globalStorageUri: vscode.Uri.file(path.join(__dirname, 'test-temp')),
                subscriptions: []
            } as any;

            const mcpProvider = new McpProvider(mockContext);
            
            // Test error handling with invalid tool
            try {
                await mcpProvider.executeMcpTool('nonexistent_tool');
                this.addResult('Error Handling', 'fail', 'Should throw error for nonexistent tool');
            } catch (error) {
                this.addResult('Error Handling', 'pass', 'Properly handles nonexistent tool');
            }

            // Test error handling with invalid parameters
            try {
                await mcpProvider.executeMcpTool('extract_pdf_text', '/invalid/path.pdf');
                this.addResult('Error Handling', 'warning', 'Should handle invalid file paths gracefully');
            } catch (error) {
                this.addResult('Error Handling', 'pass', 'Properly handles invalid file paths');
            }

        } catch (error) {
            this.addResult('Error Handling', 'fail', `Error handling validation failed: ${error}`);
        }
    }

    /**
     * Add a test result
     */
    private static addResult(test: string, status: 'pass' | 'fail' | 'warning', message: string): void {
        this.testResults.push({ test, status, message });
        
        const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
        console.log(`${icon} ${test}: ${message}`);
    }

    /**
     * Generate validation report
     */
    private static generateReport(): {passed: number, failed: number, warnings: number} {
        const passed = this.testResults.filter(r => r.status === 'pass').length;
        const failed = this.testResults.filter(r => r.status === 'fail').length;
        const warnings = this.testResults.filter(r => r.status === 'warning').length;

        console.log('\n=== VALIDATION REPORT ===');
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`⚠️  Warnings: ${warnings}`);
        console.log(`📊 Total: ${this.testResults.length}`);

        if (failed > 0) {
            console.log('\n🔥 FAILED TESTS:');
            this.testResults.filter(r => r.status === 'fail').forEach(r => {
                console.log(`   ${r.test}: ${r.message}`);
            });
        }

        if (warnings > 0) {
            console.log('\n⚠️  WARNINGS:');
            this.testResults.filter(r => r.status === 'warning').forEach(r => {
                console.log(`   ${r.test}: ${r.message}`);
            });
        }

        return { passed, failed, warnings };
    }

    /**
     * Get detailed results
     */
    public static getResults(): Array<{test: string, status: 'pass' | 'fail' | 'warning', message: string}> {
        return [...this.testResults];
    }
}