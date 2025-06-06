# Darbot PDF Viewer MCP

[![Version](https://img.shields.io/vscode-marketplace/v/darbotlabs.pdf-viewer-mcp.svg)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)
[![Downloads](https://img.shields.io/vscode-marketplace/d/darbotlabs.pdf-viewer-mcp.svg)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)

A powerful PDF viewer extension for VSCode with Edge WebView2 integration and MCP (Model Context Protocol) support for AI-powered document interaction.

## ✨ Features

- **Native PDF Viewing**: Leverages Edge WebView2 for superior PDF rendering
- **Advanced Controls**: Zoom in/out, fit to page, page navigation
- **Text Extraction**: Extract all text content from PDF documents
- **Image Extraction**: Extract images from PDF pages as PNG files
- **Format Conversion**: Convert PDFs to SVG, JPEG, PNG, or Markdown formats
- **MCP Integration**: AI-powered document analysis and interaction with comprehensive PDF processing tools
- **Theme Support**: Seamlessly integrates with VSCode light and dark themes
- **Fast Performance**: Optimized rendering with lazy loading and caching

## 🚀 Quick Start

1. Install the extension from the VSCode marketplace
2. Open any PDF file in VSCode
3. The file will automatically open in the PDF viewer
4. Use the toolbar controls for navigation and zoom

## 📋 Commands

- `PDF Viewer: Open PDF` - Open a PDF file dialog
- `PDF Viewer: Extract Text from PDF` - Extract all text content from a PDF file
- `PDF Viewer: Extract Images from PDF` - Extract images from PDF pages as PNG files
- `PDF Viewer: Export PDF to Format` - Convert PDF to SVG, JPEG, PNG, or Markdown
- `PDF Viewer: Generate PDF Summary` - Generate a summary of PDF content and metadata
- `PDF Viewer: Zoom In` - Increase zoom level
- `PDF Viewer: Zoom Out` - Decrease zoom level  
- `PDF Viewer: Fit to Page` - Fit PDF to page width

## ⚙️ Requirements

- VSCode 1.85.0 or higher
- Node.js 18+ (for development)
- Edge WebView2 runtime (Windows - usually pre-installed)

## 🔧 Configuration

The extension works out of the box with no configuration required. Advanced settings will be available in future releases.

## 🤖 MCP Integration

This extension includes comprehensive MCP (Model Context Protocol) support for:

- **PDF Text Extraction**: Extract all text content for AI analysis
- **Metadata Extraction**: Access PDF properties like title, author, creation date
- **Image Extraction**: Extract images from PDF pages for visual analysis
- **Format Conversion**: Convert PDFs to SVG, JPEG, PNG, or Markdown for different use cases
- **Document Summarization**: Generate intelligent summaries of PDF content
- **Context-Aware Processing**: Provide PDF content to AI models for analysis and interaction

### Available MCP Tools

- `extract_pdf_text(pdfPath)` - Extract text content from PDF
- `extract_pdf_metadata(pdfPath)` - Get PDF metadata and properties
- `extract_pdf_images(pdfPath, outputDir?)` - Extract images from PDF pages
- `convert_pdf_to_svg(pdfPath, outputPath?)` - Convert PDF to SVG format
- `convert_pdf_to_jpeg(pdfPath, outputPath?)` - Convert PDF to JPEG format
- `convert_pdf_to_png(pdfPath, outputPath?)` - Convert PDF to PNG format
- `convert_pdf_to_markdown(pdfPath, outputPath?)` - Convert PDF to Markdown format
- `get_pdf_summary(pdfPath)` - Generate PDF summary for AI context

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
│   │   └── McpProvider.ts    # MCP integration
│   ├── commands/
│   │   └── index.ts          # Command handlers
│   └── utils/
│       └── edge-integration.ts # Edge WebView2 utilities
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