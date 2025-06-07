# Darbot PDF Viewer MCP

[![Version](https://img.shields.io/vscode-marketplace/v/darbotlabs.pdf-viewer-mcp.svg)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)
[![Downloads](https://img.shields.io/vscode-marketplace/d/darbotlabs.pdf-viewer-mcp.svg)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)
[![CI](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/actions/workflows/ci.yml/badge.svg)](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Enterprise-grade PDF processing extension for VSCode** with comprehensive Edge WebView2 integration, advanced MCP (Model Context Protocol) support, and AI-powered document interaction capabilities.

> 🚀 **Production-Ready**: Complete with testing framework, CI/CD pipeline, automated releases, and comprehensive validation suite.

## ✨ Features

### 🎯 Core PDF Processing
- **Native PDF Viewing**: Leverages Edge WebView2 for superior PDF rendering with lazy loading and caching
- **Advanced Controls**: Zoom in/out, fit to page, page navigation with keyboard shortcuts
- **Theme Integration**: Seamlessly integrates with VSCode light and dark themes
- **Fast Performance**: Optimized rendering with intelligent memory management

### 📝 Text Processing & Analysis
- **Comprehensive Text Extraction**: Extract all content or specific pages with preserved formatting
- **Advanced Search**: Full-text search with page locations, context highlighting, and match statistics
- **Document Analysis**: Intelligent structure analysis, document type detection, and metadata extraction
- **Text Processing Tools**: Page-specific text operations with context preservation

### 🖼️ Image & Visual Processing
- **High-Quality Image Extraction**: Extract images from PDF pages as optimized PNG files
- **Page-to-Image Conversion**: Convert individual pages to high-resolution images
- **Visual Analysis**: Support for AI-powered image analysis and processing
- **Batch Processing**: Extract all images or specific pages efficiently

### 📊 Advanced Document Features
- **Table Recognition**: Automatically detect and extract table structures with formatting
- **Structure Analysis**: Analyze document layout, detect sections, and identify content types
- **Metadata Extraction**: Access comprehensive PDF properties and document information
- **Page Operations**: Individual page processing for targeted analysis

### 🔄 Format Conversion & Export
- **Multi-Format Export**: Convert PDFs to SVG, JPEG, PNG, or Markdown formats
- **Intelligent Conversion**: Context-aware conversion with formatting preservation
- **Batch Operations**: Process multiple documents or pages simultaneously
- **Quality Control**: Configurable output quality and optimization settings

### 🤖 AI Integration & Extensibility
- **14 Comprehensive MCP Tools**: Full suite of AI-powered document processing capabilities
- **Context-Aware Processing**: Provide optimized PDF content to AI models for analysis
- **Extensible Architecture**: Modular design supporting custom tool development
- **API Integration**: RESTful endpoints for external system integration

## 🚀 Quick Start

### Installation
1. **Install from VSCode Marketplace**: Search for "Darbot PDF Viewer MCP" in the Extensions view
2. **Command Line**: `code --install-extension darbotlabs.pdf-viewer-mcp`
3. **Manual Installation**: Download `.vsix` from [GitHub Releases](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/releases)

### Usage
1. **Automatic**: Open any PDF file in VSCode - it will automatically use the PDF viewer
2. **Manual**: Use `Ctrl+Shift+P` → "PDF Viewer: Open PDF" to select a file
3. **Command Palette**: Access all 13 commands via `Ctrl+Shift+P` → "PDF Viewer:"
4. **MCP Integration**: Tools automatically available to AI assistants supporting MCP

### First Steps
- **View PDFs**: Files open automatically with zoom, navigation, and theme integration
- **Extract Content**: Use "Extract Text" or "Extract Images" commands from command palette
- **AI Processing**: Enable MCP in your AI assistant for intelligent document analysis
- **Export Formats**: Convert PDFs to various formats using "Export PDF to Format"

## 📋 Commands

**13 comprehensive commands** accessible through the VSCode Command Palette (`Ctrl+Shift+P`):

### 🖥️ Viewer Controls
- **`PDF Viewer: Open PDF`** - Open PDF file dialog with file browser
- **`PDF Viewer: Zoom In`** - Increase zoom level (keyboard shortcut available)
- **`PDF Viewer: Zoom Out`** - Decrease zoom level (keyboard shortcut available)
- **`PDF Viewer: Fit to Page`** - Optimize PDF display to page width

### 📝 Text Operations
- **`PDF Viewer: Extract Text from PDF`** - Extract all text content with formatting preservation
- **`PDF Viewer: Extract Text from Specific Page`** - Extract text from single page with line numbers
- **`PDF Viewer: Search Text in PDF`** - Advanced search with context, highlighting, and statistics
- **`PDF Viewer: Generate PDF Summary`** - AI-ready summary with metadata and key insights

### 🖼️ Image & Visual Operations
- **`PDF Viewer: Extract Images from PDF`** - Extract all images as high-quality PNG files
- **`PDF Viewer: Extract Page as Image`** - Convert specific page to optimized image file

### 📊 Advanced Analysis
- **`PDF Viewer: Analyze PDF Structure`** - Document type detection, layout analysis, and characteristics
- **`PDF Viewer: Extract Tables from PDF`** - Intelligent table detection with structure preservation

### 🔄 Format Conversion
- **`PDF Viewer: Export PDF to Format`** - Convert to SVG, JPEG, PNG, or Markdown with quality options

> 💡 **Pro Tip**: All commands include progress indicators, comprehensive error handling, and automatic file opening after completion.

## ⚙️ Requirements

### Minimum Requirements
- **VSCode**: 1.85.0 or higher
- **Node.js**: 18+ (for development and some processing features)
- **Operating System**: Windows 10+, macOS 10.15+, or Linux (Ubuntu 18.04+)

### Platform-Specific
- **Windows**: Edge WebView2 runtime (usually pre-installed on Windows 10/11)
- **macOS**: No additional requirements
- **Linux**: ImageMagick and Cairo development libraries for image processing

### Optional Dependencies
- **PDF Processing**: Canvas and Sharp libraries (auto-installed)
- **MCP Integration**: Compatible AI assistant (Claude Desktop, etc.)
- **Development**: TypeScript 5.3+, ESLint 8.54+

### Performance Recommendations
- **RAM**: 4GB+ for large PDF processing
- **Storage**: 100MB+ free space for temporary files
- **CPU**: Multi-core processor for batch operations

## 🔧 Configuration

The extension is **production-ready** and works out of the box with intelligent defaults.

### User Settings
```json
{
  "pdf-viewer-mcp.defaultOutputDirectory": "~/Documents/PDF-Exports",
  "pdf-viewer-mcp.imageQuality": "high",
  "pdf-viewer-mcp.enableMcpTools": true,
  "pdf-viewer-mcp.maxFileSize": "100MB"
}
```

### Advanced Configuration
- **Output Directories**: Customize export locations for different file types
- **Quality Settings**: Configure image and conversion quality (low/medium/high)
- **Performance**: Adjust memory limits and batch processing sizes
- **MCP Integration**: Enable/disable specific MCP tools or categories

> 📝 **Note**: Configuration UI is planned for future releases. Current settings can be modified via VSCode settings.json.

## 🤖 MCP Integration

**Enterprise-grade MCP (Model Context Protocol) support** with 14 comprehensive tools for AI-powered PDF processing:

### 🎯 Core Capabilities
- **Complete PDF Processing**: Full-featured text, image, and metadata extraction
- **AI-Optimized Output**: Structured data formats perfect for AI model consumption  
- **Context-Aware Processing**: Intelligent document analysis with semantic understanding
- **Batch Operations**: Efficient processing of multiple documents and pages
- **Error Recovery**: Robust error handling with graceful degradation

### 🛠️ Available MCP Tools (14 Total)

#### 📝 Text Processing Tools (4 tools)
- **`extract_pdf_text(pdfPath)`** - Extract all text content with formatting preservation
- **`extract_pdf_page_text(pdfPath, pageNumber)`** - Extract text from specific page with context
- **`search_pdf_text(pdfPath, searchTerm)`** - Advanced search with page locations and surrounding context
- **`get_pdf_page_count(pdfPath)`** - Get total page count with document validation

#### 📊 Metadata & Analysis Tools (3 tools)
- **`extract_pdf_metadata(pdfPath)`** - Comprehensive PDF properties and document information
- **`analyze_pdf_structure(pdfPath)`** - Document type detection, layout analysis, and characteristics
- **`get_pdf_summary(pdfPath)`** - AI-ready summary with key insights and metadata

#### 🖼️ Image & Visual Tools (2 tools)
- **`extract_pdf_images(pdfPath, outputDir?)`** - Extract all images with quality optimization
- **`extract_pdf_page_image(pdfPath, pageNumber, outputPath?)`** - Convert specific page to high-quality image

#### 🔄 Format Conversion Tools (4 tools)
- **`convert_pdf_to_svg(pdfPath, outputPath?)`** - Vector conversion with scalability preservation
- **`convert_pdf_to_jpeg(pdfPath, outputPath?)`** - High-quality raster conversion with compression options
- **`convert_pdf_to_png(pdfPath, outputPath?)`** - Lossless raster conversion with transparency support
- **`convert_pdf_to_markdown(pdfPath, outputPath?)`** - Intelligent text conversion with structure preservation

#### 📋 Data Extraction Tools (1 tool)
- **`extract_pdf_tables(pdfPath)`** - Advanced table detection with structure and formatting preservation

### 🎛️ Advanced Features
- **Automatic Path Resolution**: Smart file path detection and validation
- **Configurable Output**: Customizable output directories and file naming
- **Progress Tracking**: Real-time operation progress for long-running tasks
- **Memory Optimization**: Efficient processing of large documents
- **Cross-Platform**: Full Windows, macOS, and Linux support

### 🤝 AI Assistant Integration
Works seamlessly with AI assistants supporting MCP including:
- **Claude Desktop** (Anthropic)
- **Custom MCP Clients** 
- **OpenAI Compatible** systems
- **Local AI Models** with MCP support

> 🔧 **Developer Note**: All MCP tools include comprehensive TypeScript definitions, JSDoc documentation, and error handling for robust integration.

## 🛠️ Development

### 🚀 Quick Setup

```bash
# Clone the repository
git clone https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP.git
cd Darbot-PDF-Viewer-MCP

# Install dependencies
npm install

# Build the extension
npm run compile

# Run tests
npm test
```

### 🔨 Development Commands

```bash
# Watch mode for development
npm run watch

# Lint code
npm run lint

# Run comprehensive validation
npm run test:validation

# Build for production
npm run vscode:prepublish
```

### 🧪 Testing & Quality Assurance

#### Comprehensive Testing Framework
- **Unit Tests**: Core functionality and utilities testing
- **Integration Tests**: Extension activation and command registration  
- **End-to-End Validation**: Complete workflow testing with ValidationFramework
- **MCP Tool Validation**: All 14 MCP tools functionality verification
- **Error Handling Tests**: Edge cases and error recovery testing

#### Quality Assurance Tools
```bash
# Run full validation suite
npm run test:validation

# Individual test categories
npm run test:unit          # Unit tests
npm run test:integration   # Integration tests  
npm run test:e2e          # End-to-end tests
npm run test:mcp          # MCP tools validation
```

#### Validation Coverage
- ✅ Extension activation and deactivation
- ✅ Command registration and execution
- ✅ MCP provider functionality (all 14 tools)
- ✅ PDF processor capabilities  
- ✅ Error handling and edge cases
- ✅ Documentation completeness
- ✅ TypeScript compilation and linting
- ✅ Cross-platform compatibility

### 🏗️ Build & Deployment

#### Local Development
```bash
# Install in development mode
npm run compile
# Install extension locally
code --install-extension darbot-pdf-viewer-mcp-0.1.0.vsix
```

#### Production Build
```bash
# Create production package
npm run vscode:prepublish
vsce package
```

### 🔄 CI/CD Pipeline

**GitHub Actions** workflow with comprehensive automation:

#### Continuous Integration (`ci.yml`)
- **Multi-Platform Testing**: Ubuntu, Windows, macOS
- **Multi-Version Testing**: Node.js 18, 20, LTS
- **Security Auditing**: Dependency vulnerability scanning
- **Quality Gates**: Linting, TypeScript compilation, test suite
- **Performance Testing**: Validation framework execution

#### Automated Releases (`release.yml`)
- **Semantic Versioning**: Automated version bumping
- **Release Notes**: Auto-generated from commit history  
- **Asset Creation**: VSCode extension packages
- **Marketplace Publishing**: Automated extension updates
- **GitHub Releases**: Tagged releases with artifacts

#### Dependency Management
**Dependabot** configuration for automated security updates:
- Daily security update checks
- Weekly dependency updates
- Automatic PR creation for updates
- Grouped updates by dependency type

### 📊 Code Quality Metrics
- **TypeScript**: Strict type checking enabled
- **ESLint**: Comprehensive linting rules
- **Test Coverage**: >90% code coverage target
- **Documentation**: JSDoc comments for all public APIs
- **Performance**: Memory and CPU usage optimization

## 📁 Project Architecture

### 🏗️ Directory Structure
```
darbot-pdf-viewer-mcp/
├── 📂 src/                           # Source code
│   ├── 📄 extension.ts               # Main extension entry point
│   ├── 📂 providers/                 # Core providers
│   │   ├── 📄 PdfProvider.ts         # PDF document provider & viewer
│   │   ├── 📄 WebviewProvider.ts     # WebView management & Edge integration
│   │   └── 📄 McpProvider.ts         # MCP integration (14 tools)
│   ├── 📂 commands/                  # Command handlers
│   │   └── 📄 index.ts               # All 13 command implementations
│   ├── 📂 utils/                     # Utilities
│   │   ├── 📄 edge-integration.ts    # Edge WebView2 utilities
│   │   └── 📄 pdf-processor.ts       # PDF processing engine
│   └── 📂 test/                      # Testing infrastructure
│       ├── 📄 runTest.ts             # Test runner configuration
│       ├── 📂 suite/                 # Unit & integration tests
│       └── 📂 validation/            # End-to-end validation framework
├── 📂 resources/                     # Extension resources
│   └── 📂 icons/                     # Extension icons & UI assets
├── 📂 .github/                       # GitHub automation
│   ├── 📄 dependabot.yml            # Dependency management
│   └── 📂 workflows/                 # CI/CD pipelines
│       ├── 📄 ci.yml                 # Continuous integration
│       └── 📄 release.yml            # Automated releases
├── 📄 CHANGELOG.md                   # Release notes & version history
├── 📄 CONTRIBUTING.md                # Contribution guidelines
├── 📄 DESIGN-FRAMEWORK.md            # UI/UX design system
├── 📄 UI-ASSETS.md                   # Visual assets requirements
└── 📄 VISUAL-ASSETS-INVENTORY.md     # Asset implementation roadmap
```

### 🔧 Technical Architecture

#### Core Components
- **Extension Host**: Main VSCode extension lifecycle management
- **PDF Provider**: Document loading, parsing, and viewer integration
- **WebView Provider**: Edge WebView2 integration and rendering
- **MCP Provider**: AI assistant tool integration and communication
- **Command System**: User-facing commands with progress tracking
- **PDF Processor**: Core PDF manipulation and conversion engine

#### Data Flow
```
PDF File → PDF Provider → WebView Renderer → User Interface
    ↓           ↓              ↓
PDF Processor → MCP Tools → AI Assistant Integration
```

#### Integration Points
- **VSCode API**: Custom editors, commands, webviews
- **Edge WebView2**: High-performance PDF rendering
- **MCP Protocol**: AI assistant communication
- **File System**: PDF processing and export operations

### 🎨 Extensibility Framework

#### Plugin Architecture
- **Provider System**: Extensible document providers
- **Command Registration**: Dynamic command addition
- **MCP Tool Framework**: Custom AI tool development
- **Theme Integration**: VSCode theme compatibility

#### Extension Points
- **Custom PDF Processors**: Add new processing capabilities
- **Additional MCP Tools**: Extend AI assistant functionality  
- **Export Formats**: Support for new output formats
- **UI Components**: Custom viewer controls and interfaces

#### Developer APIs
```typescript
// Example: Custom MCP Tool Registration
registerMcpTool('custom-analysis', {
  description: 'Custom PDF analysis tool',
  handler: async (pdfPath: string) => {
    // Custom implementation
  }
});

// Example: Custom Command Registration  
registerCommand('custom-operation', {
  title: 'Custom PDF Operation',
  handler: async () => {
    // Custom command logic
  }
});
```

### 🔐 Security & Performance

#### Security Features
- **Input Validation**: Comprehensive path and parameter validation
- **Error Isolation**: Sandboxed processing operations
- **Dependency Auditing**: Automated security vulnerability scanning
- **Safe Defaults**: Secure-by-default configuration options

#### Performance Optimizations
- **Lazy Loading**: On-demand resource loading
- **Memory Management**: Efficient large document handling
- **Caching**: Intelligent result caching for repeated operations
- **Batch Processing**: Optimized multi-document operations

## 🤝 Contributing

We welcome contributions from the community! This project follows enterprise-grade development practices.

### 📋 Quick Start for Contributors
1. **Read** our comprehensive [Contributing Guide](CONTRIBUTING.md)
2. **Review** the [Design Framework](DESIGN-FRAMEWORK.md) for UI/UX guidelines
3. **Check** the [Visual Assets Inventory](VISUAL-ASSETS-INVENTORY.md) for design tasks
4. **Fork** the repository and create a feature branch
5. **Follow** our development standards and testing requirements

### 🎯 Contribution Areas
- **📝 Code**: New features, bug fixes, performance improvements
- **🎨 Design**: UI assets, icons, visual design (see [UI-ASSETS.md](UI-ASSETS.md))
- **📚 Documentation**: README updates, code comments, user guides
- **🧪 Testing**: Test cases, validation scenarios, quality assurance
- **🌍 Localization**: Internationalization and translation support

### 💻 Development Standards
- **TypeScript**: Strict typing and comprehensive JSDoc comments
- **Testing**: >90% code coverage with unit, integration, and E2E tests
- **Linting**: ESLint compliance with project-specific rules
- **Performance**: Memory efficiency and processing optimization
- **Security**: Input validation and secure coding practices

### 🔄 Development Workflow
1. **Setup**: Follow the development setup instructions above
2. **Code**: Implement changes following our coding standards
3. **Test**: Run `npm run test:validation` to ensure all tests pass
4. **Lint**: Verify code quality with `npm run lint`
5. **PR**: Submit pull request with comprehensive description

> 📖 **Detailed Guidelines**: See [CONTRIBUTING.md](CONTRIBUTING.md) for complete contribution guidelines, coding standards, and PR requirements.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### 📜 License Summary
- ✅ **Commercial Use**: Use in commercial products and services
- ✅ **Modification**: Modify and adapt the code for your needs  
- ✅ **Distribution**: Distribute original or modified versions
- ✅ **Private Use**: Use privately without restrictions
- ⚠️ **Attribution Required**: Include original license and copyright notice

## 🐛 Issues & Support

### 🆘 Getting Help
- **📖 Documentation**: Start with this README and [CONTRIBUTING.md](CONTRIBUTING.md)
- **🐛 Bug Reports**: [Create an issue](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/issues) with detailed reproduction steps
- **💡 Feature Requests**: Use our issue template for feature suggestions
- **❓ Questions**: Check existing issues or start a new discussion

### 🔍 Before Reporting Issues
1. **Search** existing issues to avoid duplicates
2. **Update** to the latest version to verify the issue persists
3. **Test** with a minimal reproduction case
4. **Include** system information, error logs, and screenshots

### 📝 Issue Templates
- **🐛 Bug Report**: Standardized template for bug reporting
- **✨ Feature Request**: Template for new feature suggestions  
- **📚 Documentation**: Template for documentation improvements
- **🎨 Design**: Template for UI/UX related requests

## 🙏 Acknowledgments

### 🏆 Key Technologies
- **Microsoft VSCode Team** - Exceptional extension APIs and development platform
- **Microsoft Edge WebView2** - High-performance web runtime for PDF rendering
- **MCP Community** - Model Context Protocol specifications and standards
- **Open Source Libraries** - pdf-parse, pdf2pic, sharp, canvas, and other essential tools

### 🌟 Special Recognition
- **Contributors** - All developers who have contributed code, documentation, and ideas
- **Beta Testers** - Community members who provided early feedback and testing
- **Design Community** - UI/UX feedback and visual asset contributions
- **AI Assistants Community** - MCP integration testing and validation

### 🔧 Development Tools
- **TypeScript** - Type-safe development environment
- **Node.js Ecosystem** - Rich library ecosystem for PDF processing
- **GitHub Actions** - Automated CI/CD and quality assurance
- **ESLint & Prettier** - Code quality and formatting standards

---

<div align="center">

**🚀 Darbot Labs - Revolutionizing Document Processing in VSCode**

[![GitHub Stars](https://img.shields.io/github/stars/darbotlabs/Darbot-PDF-Viewer-MCP?style=social)](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/darbotlabs/Darbot-PDF-Viewer-MCP?style=social)](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/network/members)
[![Follow @darbotlabs](https://img.shields.io/github/followers/darbotlabs?style=social)](https://github.com/darbotlabs)

*Built with ❤️ for the developer community*

</div>