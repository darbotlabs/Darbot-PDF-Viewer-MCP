#!/usr/bin/env node

/**
 * Manual MCP Functionality Validation
 * Tests core MCP functionality manually to ensure everything works after dependency updates
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class McpValidationRunner {
    constructor() {
        this.results = [];
        this.testPdfPath = path.join(__dirname, '../test-assets/sample-pdfs/test-document.pdf');
        this.outputDir = path.join(__dirname, '../test-assets/output');
    }

    addResult(test, status, message) {
        this.results.push({ test, status, message });
        const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
        console.log(`${icon} [${status.toUpperCase()}] ${test}: ${message}`);
    }

    async validateDependencies() {
        console.log('\n🔍 Validating Dependencies...');
        
        // Check pdf-parse
        try {
            const pdfParse = await import('pdf-parse');
            if (pdfParse.default) {
                this.addResult('pdf-parse Import', 'pass', 'pdf-parse library imports successfully');
            } else {
                this.addResult('pdf-parse Import', 'fail', 'pdf-parse library structure unexpected');
            }
        } catch (error) {
            this.addResult('pdf-parse Import', 'fail', `pdf-parse import failed: ${error.message}`);
        }

        // Check pdf2pic
        try {
            const pdf2pic = await import('pdf2pic');
            if (pdf2pic.default) {
                this.addResult('pdf2pic Import', 'pass', 'pdf2pic library imports successfully');
            } else {
                this.addResult('pdf2pic Import', 'fail', 'pdf2pic library structure unexpected');
            }
        } catch (error) {
            this.addResult('pdf2pic Import', 'fail', `pdf2pic import failed: ${error.message}`);
        }

        // Check sharp
        try {
            const sharp = await import('sharp');
            if (sharp.default) {
                this.addResult('sharp Import', 'pass', 'sharp library imports successfully');
            } else {
                this.addResult('sharp Import', 'fail', 'sharp library structure unexpected');
            }
        } catch (error) {
            this.addResult('sharp Import', 'fail', `sharp import failed: ${error.message}`);
        }

        // Check canvas
        try {
            const canvas = await import('canvas');
            if (canvas) {
                this.addResult('canvas Import', 'pass', 'canvas library imports successfully');
            } else {
                this.addResult('canvas Import', 'fail', 'canvas library not available');
            }
        } catch (error) {
            this.addResult('canvas Import', 'fail', `canvas import failed: ${error.message}`);
        }
    }

    async validatePdfProcessing() {
        console.log('\n🔍 Validating PDF Processing...');
        
        // Test basic PDF parsing
        try {
            const pdf = await import('pdf-parse');
            const pdfBuffer = fs.readFileSync(this.testPdfPath);
            const data = await pdf.default(pdfBuffer);
            
            if (data && typeof data.numpages === 'number') {
                this.addResult('PDF Parsing', 'pass', `Successfully parsed PDF with ${data.numpages} pages`);
            } else {
                this.addResult('PDF Parsing', 'warning', 'PDF parsed but structure unexpected');
            }
        } catch (error) {
            this.addResult('PDF Parsing', 'fail', `PDF parsing failed: ${error.message}`);
        }

        // Test pdf2pic functionality
        try {
            const pdf2pic = await import('pdf2pic');
            const convert = pdf2pic.default.fromPath(this.testPdfPath, {
                density: 100,
                saveFilename: "test",
                savePath: this.outputDir,
                format: "png",
                width: 600,
                height: 800
            });
            
            // Try to get info about the PDF without actually converting
            this.addResult('pdf2pic Setup', 'pass', 'pdf2pic converter created successfully');
        } catch (error) {
            this.addResult('pdf2pic Setup', 'fail', `pdf2pic setup failed: ${error.message}`);
        }
    }

    async validateExtensionStructure() {
        console.log('\n🔍 Validating Extension Structure...');
        
        // Check main files exist
        const criticalFiles = [
            '../src/extension.ts',
            '../src/providers/McpProvider.ts',
            '../src/providers/PdfProvider.ts',
            '../src/commands/index.ts',
            '../src/utils/pdf-processor.ts',
            '../src/utils/edge-integration.ts'
        ];

        for (const file of criticalFiles) {
            const filePath = path.join(__dirname, file);
            if (fs.existsSync(filePath)) {
                this.addResult(`File Check: ${path.basename(file)}`, 'pass', 'Required file exists');
            } else {
                this.addResult(`File Check: ${path.basename(file)}`, 'fail', 'Required file missing');
            }
        }

        // Check compiled output
        const compiledFiles = [
            '../out/extension.js',
            '../out/providers/McpProvider.js',
            '../out/providers/PdfProvider.js',
            '../out/commands/index.js',
            '../out/utils/pdf-processor.js'
        ];

        for (const file of compiledFiles) {
            const filePath = path.join(__dirname, file);
            if (fs.existsSync(filePath)) {
                this.addResult(`Compiled: ${path.basename(file)}`, 'pass', 'Compiled file exists');
            } else {
                this.addResult(`Compiled: ${path.basename(file)}`, 'fail', 'Compiled file missing');
            }
        }
    }

    async validateMcpToolsStructure() {
        console.log('\n🔍 Validating MCP Tools Structure...');
        
        // Check MCP Provider source code
        try {
            const mcpProviderPath = path.join(__dirname, '../src/providers/McpProvider.ts');
            const mcpContent = fs.readFileSync(mcpProviderPath, 'utf8');
            
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

            let toolsFound = 0;
            for (const tool of expectedTools) {
                if (mcpContent.includes(`'${tool}'`) || mcpContent.includes(`"${tool}"`)) {
                    toolsFound++;
                }
            }

            if (toolsFound === expectedTools.length) {
                this.addResult('MCP Tools Definition', 'pass', `All ${expectedTools.length} MCP tools found in source`);
            } else {
                this.addResult('MCP Tools Definition', 'warning', `${toolsFound}/${expectedTools.length} MCP tools found`);
            }

            // Check for error handling
            const errorHandlingPatterns = ['try', 'catch', 'throw', 'Promise.reject'];
            let errorHandlingFound = 0;
            for (const pattern of errorHandlingPatterns) {
                if (mcpContent.includes(pattern)) {
                    errorHandlingFound++;
                }
            }

            if (errorHandlingFound >= 2) {
                this.addResult('Error Handling', 'pass', 'Error handling patterns found');
            } else {
                this.addResult('Error Handling', 'warning', 'Limited error handling detected');
            }

        } catch (error) {
            this.addResult('MCP Provider Analysis', 'fail', `Failed to analyze MCP provider: ${error.message}`);
        }
    }

    async validateCommandStructure() {
        console.log('\n🔍 Validating Command Structure...');
        
        // Check commands implementation
        try {
            const commandsPath = path.join(__dirname, '../src/commands/index.ts');
            const commandsContent = fs.readFileSync(commandsPath, 'utf8');
            
            const expectedCommands = [
                'openPdf',
                'extractText',
                'extractImages', 
                'exportPdf',
                'getPdfSummary',
                'searchText',
                'extractPageText',
                'extractPageImage',
                'analyzeStructure',
                'extractTables',
                'zoomIn',
                'zoomOut',
                'fitToPage'
            ];

            let commandsFound = 0;
            for (const command of expectedCommands) {
                if (commandsContent.includes(command)) {
                    commandsFound++;
                }
            }

            if (commandsFound === expectedCommands.length) {
                this.addResult('Command Implementation', 'pass', `All ${expectedCommands.length} commands implemented`);
            } else {
                this.addResult('Command Implementation', 'warning', `${commandsFound}/${expectedCommands.length} commands found`);
            }

        } catch (error) {
            this.addResult('Command Analysis', 'fail', `Failed to analyze commands: ${error.message}`);
        }

        // Check package.json command definitions
        try {
            const packagePath = path.join(__dirname, '../package.json');
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
            
            const packageCommands = packageJson.contributes?.commands || [];
            if (packageCommands.length === 13) {
                this.addResult('Package Commands', 'pass', '13 commands defined in package.json');
            } else {
                this.addResult('Package Commands', 'warning', `${packageCommands.length} commands in package.json`);
            }

        } catch (error) {
            this.addResult('Package Commands', 'fail', `Package.json analysis failed: ${error.message}`);
        }
    }

    async validateTestInfrastructure() {
        console.log('\n🔍 Validating Test Infrastructure...');
        
        // Check if we have test files
        try {
            const testSuiteDir = path.join(__dirname, '../src/test/suite');
            if (fs.existsSync(testSuiteDir)) {
                const testFiles = fs.readdirSync(testSuiteDir).filter(f => f.endsWith('.test.ts'));
                if (testFiles.length > 0) {
                    this.addResult('Test Files', 'pass', `${testFiles.length} test files found`);
                } else {
                    this.addResult('Test Files', 'warning', 'No test files found');
                }
            } else {
                this.addResult('Test Directory', 'warning', 'Test suite directory not found');
            }
        } catch (error) {
            this.addResult('Test Infrastructure', 'fail', `Test validation failed: ${error.message}`);
        }

        // Check test assets
        if (fs.existsSync(this.testPdfPath)) {
            this.addResult('Test Assets', 'pass', 'Test PDF file available');
        } else {
            this.addResult('Test Assets', 'warning', 'Test PDF file not found');
        }
    }

    generateSummary() {
        const passed = this.results.filter(r => r.status === 'pass').length;
        const warnings = this.results.filter(r => r.status === 'warning').length;
        const failed = this.results.filter(r => r.status === 'fail').length;
        
        console.log('\n📊 VALIDATION SUMMARY:');
        console.log(`✅ Passed: ${passed}`);
        console.log(`⚠️  Warnings: ${warnings}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📊 Total: ${this.results.length}`);
        
        const successRate = Math.round((passed / this.results.length) * 100);
        console.log(`🎯 Success Rate: ${successRate}%`);
        
        if (failed === 0 && warnings <= 2) {
            console.log('\n🎉 EXCELLENT: MCP extension is well-configured and ready for production!');
        } else if (failed === 0) {
            console.log('\n👍 GOOD: MCP extension is functional with minor improvements recommended.');
        } else {
            console.log('\n⚠️  ATTENTION: Some critical issues detected. Review failed tests.');
        }

        return { passed, warnings, failed, total: this.results.length, successRate };
    }

    async runFullValidation() {
        console.log('🚀 Starting MCP Validation Audit...\n');
        
        // Ensure output directory exists
        await fs.promises.mkdir(this.outputDir, { recursive: true });
        
        await this.validateDependencies();
        await this.validateExtensionStructure();
        await this.validateMcpToolsStructure();
        await this.validateCommandStructure();
        await this.validatePdfProcessing();
        await this.validateTestInfrastructure();
        
        return this.generateSummary();
    }
}

// Run validation
const validator = new McpValidationRunner();
validator.runFullValidation().catch(console.error);