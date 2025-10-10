# Changelog

All notable changes to the Darbot PDF Viewer MCP extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

# Changelog

All notable changes to the Darbot PDF Viewer MCP extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Swagger 2.0 API Connector** - Full OpenAPI specification for Microsoft Copilot Studio and Power Platform integration
  - 15 REST API endpoints exposing all MCP tools
  - Complete request/response schemas and examples
  - Ready for custom connector import in Copilot Studio
  - Power Platform compatibility (Power Apps, Power Automate, Azure Logic Apps)
  - Comprehensive integration documentation in `swagger/README.md`
  - Detailed Copilot Studio integration guide in `COPILOT-STUDIO-INTEGRATION.md`

### Changed
- **Updated Dependencies** - All npm packages updated to latest compatible versions
  - @types/mocha: 10.0.6 → 10.0.10
  - @types/node: 24.5.2 → 24.6.2
  - @types/vscode: 1.103.0 → 1.104.0
  - @typescript-eslint/eslint-plugin: 8.37.0 → 8.45.0 (fixed TypeScript compatibility)
  - @typescript-eslint/parser: 8.33.1 → 8.45.0
  - @vscode/test-electron: 2.3.8 → 2.4.4
  - eslint: 9.31.0 → 9.37.0
  - mocha: 11.7.1 → 11.7.4
  - typescript: 5.9.2 → 5.9.3
- **Removed** deprecated @types/glob package (using built-in glob types)
- **Disabled Dependabot** - Removed automated dependency updates configuration

### Fixed
- TypeScript type annotations in pdf-processor.ts filter callbacks
- Security vulnerabilities: 0 vulnerabilities (was 1 low severity)
- TypeScript/ESLint version compatibility issues

## [1.0.0] - 2024-12-19

### 🚀 **Marketplace Release** - Major Milestone!

**BREAKING**: First official marketplace release with comprehensive PDF processing capabilities.

### ✨ **Marketplace Readiness**
- **Published to VS Code Marketplace** - One-click installation now available
- **Optimized Package Size** - Reduced from 36.2MB to 83.87KB through .vscodeignore optimization
- **Version Compatibility** - Updated engines.vscode to ^1.101.0 for marketplace compatibility
- **Enhanced Metadata** - Added marketplace-required fields: bugs, homepage, qna
- **Installation Documentation** - Updated README with marketplace installation instructions

### 🔧 **PDF Processing Core**
- Enhanced PDF processing with 14 comprehensive MCP tools
- Page-specific text and image extraction capabilities
- Advanced text search functionality with context and page locations
- PDF structure analysis and document type detection
- Table extraction from PDF documents
- Comprehensive validation framework for quality assurance
- End-to-end testing suite with ValidationFramework
- GitHub Actions CI/CD pipeline
- Dependabot configuration for automated dependency updates
- Production-ready documentation and README
- UI assets requirements documentation

### Enhanced
- Extended MCP provider with 6 additional tools beyond the original 8
- Command palette with 13 total commands (8 new advanced commands)
- Error handling and user feedback across all operations
- Progress indicators for long-running operations
- TypeScript configuration for proper compilation
- Package.json with comprehensive command definitions

### Technical Improvements
- Fixed TypeScript compilation issues
- Added proper type definitions and configurations
- Comprehensive test coverage including integration tests
- Validation framework for extension quality assurance
- Professional CI/CD pipeline with multiple Node.js versions
- Security auditing and dependency management

## [0.1.0] - 2024-01-XX (Previous Implementation)

### Added
- Basic PDF viewing with Edge WebView2 integration
- Core MCP integration with 8 fundamental tools
- Text extraction from PDF documents
- Image extraction from PDF pages
- PDF format conversion (SVG, JPEG, PNG, Markdown)
- PDF metadata extraction
- PDF summary generation
- Basic command structure with 5 primary commands
- VSCode extension framework setup

### Core Features
- Native PDF rendering using Edge WebView2
- MCP (Model Context Protocol) support for AI interaction
- Basic zoom and navigation controls
- Theme integration with VSCode
- Extension marketplace compatibility

---

## Planned for Future Releases

### v0.2.0 (Next Release)
- [ ] Complete UI asset implementation
- [ ] Enhanced PDF viewer interface
- [ ] Bookmark and annotation extraction
- [ ] PDF merging and splitting capabilities
- [ ] Advanced image processing options

### v0.3.0 (Future)
- [ ] OCR integration for scanned PDFs
- [ ] Form field extraction and processing
- [ ] Advanced security and encryption handling
- [ ] Collaborative features for team workflows
- [ ] Performance optimizations for large documents

### Long-term Vision
- [ ] Real-time collaborative PDF editing
- [ ] Integration with cloud storage services
- [ ] Advanced AI-powered document analysis
- [ ] Custom PDF creation and editing tools
- [ ] Enterprise-grade security features