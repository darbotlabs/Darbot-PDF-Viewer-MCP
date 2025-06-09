#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ProductionValidator {
    constructor() {
        this.results = [];
    }

    addResult(test, status, message) {
        this.results.push({ test, status, message });
        const icon = status === 'pass' ? '✅' : status === 'fail' ? '❌' : '⚠️';
        console.log(`${icon} [${status.toUpperCase()}] ${test}: ${message}`);
    }

    async validatePackageJson() {
        try {
            const packagePath = path.join(__dirname, 'package.json');
            const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

            // Check required fields
            const requiredFields = ['name', 'displayName', 'description', 'version', 'publisher', 'engines', 'main'];
            let fieldsFound = 0;
            for (const field of requiredFields) {
                if (packageJson[field]) {
                    fieldsFound++;
                } else {
                    this.addResult('Package.json', 'fail', `Missing required field: ${field}`);
                }
            }

            if (fieldsFound === requiredFields.length) {
                this.addResult('Package.json', 'pass', 'All required fields present');
            }

            // Check icon exists
            if (packageJson.icon) {
                const iconPath = path.join(__dirname, packageJson.icon);
                if (fs.existsSync(iconPath)) {
                    this.addResult('Extension Icon', 'pass', 'Icon file exists');
                } else {
                    this.addResult('Extension Icon', 'fail', 'Icon file not found');
                }
            }

            // Check commands
            if (packageJson.contributes && packageJson.contributes.commands) {
                const commandCount = packageJson.contributes.commands.length;
                this.addResult('Commands', 'pass', `${commandCount} commands defined`);
            } else {
                this.addResult('Commands', 'fail', 'No commands defined');
            }

        } catch (error) {
            this.addResult('Package.json', 'fail', `Package validation failed: ${error.message}`);
        }
    }

    async validateReadme() {
        try {
            const readmePath = path.join(__dirname, 'README.md');
            const readmeContent = fs.readFileSync(readmePath, 'utf8');

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
                this.addResult('README Features', 'warning', 'Some features not documented');
            }

            // Check README length
            if (readmeContent.length > 5000) {
                this.addResult('README Completeness', 'pass', 'Comprehensive documentation');
            } else {
                this.addResult('README Completeness', 'warning', 'Documentation could be more comprehensive');
            }

        } catch (error) {
            this.addResult('README', 'fail', `README validation failed: ${error.message}`);
        }
    }

    async validateAssets() {
        try {
            const resourcesPath = path.join(__dirname, 'resources');
            if (!fs.existsSync(resourcesPath)) {
                this.addResult('Resources', 'fail', 'Resources directory not found');
                return;
            }

            const iconsPath = path.join(resourcesPath, 'icons');
            if (fs.existsSync(iconsPath)) {
                this.addResult('Icons Directory', 'pass', 'Icons directory exists');
                
                // Check main icon
                const mainIcon = path.join(iconsPath, 'pdf-icon.png');
                if (fs.existsSync(mainIcon)) {
                    this.addResult('Main Icon', 'pass', 'Main extension icon exists');
                } else {
                    this.addResult('Main Icon', 'fail', 'Main extension icon missing');
                }

                // Check commands directory
                const commandsPath = path.join(iconsPath, 'commands');
                if (fs.existsSync(commandsPath)) {
                    const commandIcons = fs.readdirSync(commandsPath).filter(f => f.endsWith('.svg'));
                    this.addResult('Command Icons', 'pass', `${commandIcons.length} command icons found`);
                } else {
                    this.addResult('Command Icons', 'warning', 'Command icons directory not found');
                }
            } else {
                this.addResult('Icons Directory', 'fail', 'Icons directory not found');
            }

        } catch (error) {
            this.addResult('Assets', 'fail', `Asset validation failed: ${error.message}`);
        }
    }

    async validateBuild() {
        try {
            const outPath = path.join(__dirname, 'out');
            if (fs.existsSync(outPath)) {
                this.addResult('Build Output', 'pass', 'Build output directory exists');
                
                const extensionJs = path.join(outPath, 'extension.js');
                if (fs.existsSync(extensionJs)) {
                    this.addResult('Main Build', 'pass', 'Main extension file compiled');
                } else {
                    this.addResult('Main Build', 'fail', 'Main extension file not found');
                }
            } else {
                this.addResult('Build Output', 'fail', 'Build output directory not found');
            }

        } catch (error) {
            this.addResult('Build', 'fail', `Build validation failed: ${error.message}`);
        }
    }

    async runFullValidation() {
        console.log('🚀 Running Production Validation...\n');
        
        await this.validatePackageJson();
        await this.validateReadme();
        await this.validateAssets();
        await this.validateBuild();

        const summary = this.generateSummary();
        console.log('\n📊 Validation Summary:');
        console.log(`✅ Passed: ${summary.passed}`);
        console.log(`⚠️  Warnings: ${summary.warnings}`);
        console.log(`❌ Failed: ${summary.failed}`);
        
        if (summary.failed === 0) {
            console.log('\n🎉 Production Ready! All critical checks passed.');
        } else {
            console.log('\n⚠️  Production readiness issues detected. Please address failed checks.');
        }

        return summary;
    }

    generateSummary() {
        const passed = this.results.filter(r => r.status === 'pass').length;
        const warnings = this.results.filter(r => r.status === 'warning').length;
        const failed = this.results.filter(r => r.status === 'fail').length;
        return { passed, warnings, failed };
    }
}

// Run validation if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const validator = new ProductionValidator();
    validator.runFullValidation().catch(console.error);
}

export { ProductionValidator };