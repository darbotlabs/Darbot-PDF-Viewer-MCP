# Darbot PDF Viewer MCP

[![Version](https://img.shields.io/vscode-marketplace/v/darbotlabs.pdf-viewer-mcp.svg)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)
[![Downloads](https://img.shields.io/vscode-marketplace/d/darbotlabs.pdf-viewer-mcp.svg)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)

A powerful PDF viewer extension for VSCode with Edge WebView2 integration and MCP (Model Context Protocol) support for AI-powered document interaction.

## ✨ Features

- **Native PDF Viewing**: Leverages Edge WebView2 for superior PDF rendering
- **Advanced Controls**: Zoom in/out, fit to page, page navigation
- **Comprehensive Text Processing**: Extract all text content or specific pages from PDF documents
- **Advanced Search**: Search for text within PDFs with page locations and context
- **Image Extraction**: Extract images from PDF pages as high-quality PNG files
- **Page-Specific Operations**: Extract individual pages as text or images
- **Document Analysis**: Analyze PDF structure, detect document type, and extract metadata
- **Table Recognition**: Automatically detect and extract table structures
- **Format Conversion**: Convert PDFs to SVG, JPEG, PNG, or Markdown formats
- **MCP Integration**: AI-powered document analysis and interaction with 14 comprehensive PDF processing tools
- **Theme Support**: Seamlessly integrates with VSCode light and dark themes
- **Fast Performance**: Optimized rendering with lazy loading and caching
- **Error Handling**: Robust error handling with user-friendly feedback
- **Progress Indicators**: Visual feedback for long-running operations

## 🚀 Quick Start

1. Install the extension from the VSCode marketplace
2. Open any PDF file in VSCode
3. The file will automatically open in the PDF viewer
4. Use the toolbar controls for navigation and zoom

## 📋 Commands

### Basic Commands
- `PDF Viewer: Open PDF` - Open a PDF file dialog
- `PDF Viewer: Zoom In` - Increase zoom level
- `PDF Viewer: Zoom Out` - Decrease zoom level  
- `PDF Viewer: Fit to Page` - Fit PDF to page width

### Text and Content Extraction
- `PDF Viewer: Extract Text from PDF` - Extract all text content from a PDF file
- `PDF Viewer: Extract Text from Specific Page` - Extract text from a single page
- `PDF Viewer: Search Text in PDF` - Search for specific text and get page locations with context
- `PDF Viewer: Generate PDF Summary` - Generate a summary of PDF content and metadata

### Image and Visual Processing
- `PDF Viewer: Extract Images from PDF` - Extract images from PDF pages as PNG files
- `PDF Viewer: Extract Page as Image` - Convert a specific page to a high-quality image

### Document Analysis
- `PDF Viewer: Analyze PDF Structure` - Analyze document structure, type, and characteristics
- `PDF Viewer: Extract Tables from PDF` - Identify and extract table structures from the document

### Format Conversion
- `PDF Viewer: Export PDF to Format` - Convert PDF to SVG, JPEG, PNG, or Markdown

## ⚙️ Requirements

- VSCode 1.85.0 or higher
- Node.js 18+ (for development)
- Edge WebView2 runtime (Windows - usually pre-installed)

## 🔧 Configuration

The extension works out of the box with no configuration required. Advanced settings will be available in future releases.

## 🤖 MCP Integration

This extension includes comprehensive MCP (Model Context Protocol) support for AI-powered PDF processing:

### Core Capabilities
- **PDF Text Extraction**: Extract all text content or specific pages for AI analysis
- **Metadata Extraction**: Access PDF properties like title, author, creation date
- **Image Extraction**: Extract images from PDF pages for visual analysis
- **Format Conversion**: Convert PDFs to SVG, JPEG, PNG, or Markdown for different use cases
- **Document Summarization**: Generate intelligent summaries of PDF content

### Advanced Features
- **Text Search**: Search for specific text with page locations and context
- **Structure Analysis**: Analyze document type, layout, and characteristics
- **Table Extraction**: Identify and extract tabular data structures
- **Page-Specific Processing**: Work with individual pages for targeted analysis
- **Context-Aware Processing**: Provide PDF content to AI models for analysis and interaction

### Available MCP Tools

#### Text Processing Tools
- `extract_pdf_text(pdfPath)` - Extract all text content from PDF
- `extract_pdf_page_text(pdfPath, pageNumber)` - Extract text from specific page
- `search_pdf_text(pdfPath, searchTerm)` - Search for text and get page locations with context
- `get_pdf_page_count(pdfPath)` - Get total number of pages in PDF

#### Metadata and Analysis Tools
- `extract_pdf_metadata(pdfPath)` - Get PDF metadata and properties
- `analyze_pdf_structure(pdfPath)` - Analyze document structure and characteristics
- `get_pdf_summary(pdfPath)` - Generate PDF summary for AI context

#### Image and Visual Tools
- `extract_pdf_images(pdfPath, outputDir?)` - Extract images from PDF pages
- `extract_pdf_page_image(pdfPath, pageNumber, outputPath?)` - Extract specific page as image

#### Format Conversion Tools
- `convert_pdf_to_svg(pdfPath, outputPath?)` - Convert PDF to SVG format
- `convert_pdf_to_jpeg(pdfPath, outputPath?)` - Convert PDF to JPEG format
- `convert_pdf_to_png(pdfPath, outputPath?)` - Convert PDF to PNG format
- `convert_pdf_to_markdown(pdfPath, outputPath?)` - Convert PDF to Markdown format

#### Data Extraction Tools
- `extract_pdf_tables(pdfPath)` - Extract table structures from PDF

All tools include comprehensive error handling and support for AI-powered document processing workflows.

## 🛠️ Development

### Setup

```bash
git clone https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP.git
cd Darbot-PDF-Viewer-MCP
npm install
```

### Build

```bash
npm run compile
```

### Test

```bash
npm test
```

### Validation

Run comprehensive validation checks:

```bash
npm run test:validation
```

This runs end-to-end validation covering:
- Extension activation and command registration
- MCP provider functionality with all 14 tools
- PDF processor capabilities
- Error handling and edge cases
- Documentation completeness

### Package

```bash
npm run vscode:prepublish
```

## 📁 Project Structure

```
darbot-pdf-viewer-mcp/
├── src/
│   ├── extension.ts          # Main extension entry
│   ├── providers/
│   │   ├── PdfProvider.ts    # PDF document provider
│   │   ├── WebviewProvider.ts # WebView management
│   │   └── McpProvider.ts    # MCP integration with 14 tools
│   ├── commands/
│   │   └── index.ts          # Command handlers for all 13 commands
│   ├── utils/
│   │   ├── edge-integration.ts # Edge WebView2 utilities
│   │   └── pdf-processor.ts  # PDF processing utilities
│   └── test/
│       ├── suite/            # Test suites
│       └── validation/       # End-to-end validation framework
├── resources/
│   └── icons/                # Extension icons
└── test/                     # Test files
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues

Found a bug or have a feature request? Please [create an issue](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/issues).

## 🙏 Acknowledgments

- Microsoft VSCode team for the excellent extension APIs
- Edge WebView2 team for the powerful web runtime
- MCP community for the context protocol specifications

---

**Darbot Labs** - Revolutionizing document viewing in VSCode