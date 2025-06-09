<div align="center">
  <img src="resources/icons/pdf-icon.png" alt="Darbot PDF Viewer MCP" width="128" height="128">
  
  # Darbot PDF Viewer MCP
  
  **Advanced PDF viewer for VSCode with Edge WebView2 and MCP integration**
  
  [![Version](https://img.shields.io/vscode-marketplace/v/darbotlabs.pdf-viewer-mcp.svg?style=flat-square&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)
  [![Downloads](https://img.shields.io/vscode-marketplace/d/darbotlabs.pdf-viewer-mcp.svg?style=flat-square&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)
  [![Rating](https://img.shields.io/vscode-marketplace/r/darbotlabs.pdf-viewer-mcp.svg?style=flat-square&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)
  [![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
  
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
  [![VSCode](https://img.shields.io/badge/VSCode-0078D4?style=flat-square&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
  [![Edge WebView2](https://img.shields.io/badge/Edge_WebView2-0078D7?style=flat-square&logo=microsoft-edge&logoColor=white)](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)
</div>

---

A powerful PDF viewer extension for VSCode with Edge WebView2 integration and MCP (Model Context Protocol) support for AI-powered document interaction.

## 🚀 Latest Enhancements

This release implements comprehensive PDF processing capabilities that significantly expand the app's functionality beyond basic viewing:

### 🔧 PDF Processing Core
- **Text Extraction**: Extract all text content from PDF documents using the pdf-parse library
- **Image Extraction**: Extract images from PDF pages as high-quality PNG files using pdf2pic
- **Metadata Extraction**: Access PDF properties like title, author, creation date, and page count
- **Format Conversion**: Convert PDFs to SVG, JPEG, PNG, and Markdown formats

### 💻 User Commands
Added 13 comprehensive VSCode commands accessible through the command palette:

- **Darbot PDF Viewer: Extract Text from PDF** - Extract all text content from a PDF file
- **Darbot PDF Viewer: Extract Images from PDF** - Extract images from PDF pages as PNG files
- **Darbot PDF Viewer: Export PDF to Format** - Convert PDF to SVG, JPEG, PNG, or Markdown
- **Darbot PDF Viewer: Generate PDF Summary** - Generate a summary of PDF content and metadata
- **Darbot PDF Viewer: Search Text in PDF** - Search for specific text with page locations and context
- **Darbot PDF Viewer: Extract Text from Specific Page** - Extract text from a single page
- **Darbot PDF Viewer: Extract Page as Image** - Convert a specific page to a high-quality image
- **Darbot PDF Viewer: Analyze PDF Structure** - Analyze document structure, type, and characteristics
- **Darbot PDF Viewer: Extract Tables from PDF** - Identify and extract table structures
- Plus basic navigation commands (Open, Zoom In/Out, Fit to Page)

### 🤖 MCP Integration
Implemented 14 specialized MCP tools for AI-powered PDF processing:

- `extract_pdf_text(pdfPath)` - Extract text content from PDF
- `extract_pdf_metadata(pdfPath)` - Get PDF metadata and properties
- `extract_pdf_images(pdfPath, outputDir?)` - Extract images from PDF pages
- `convert_pdf_to_svg(pdfPath, outputPath?)` - Convert PDF to SVG format
- `convert_pdf_to_jpeg(pdfPath, outputPath?)` - Convert PDF to JPEG format
- `convert_pdf_to_png(pdfPath, outputPath?)` - Convert PDF to PNG format
- `convert_pdf_to_markdown(pdfPath, outputPath?)` - Convert PDF to Markdown format
- `get_pdf_summary(pdfPath)` - Generate PDF summary for AI context
- Plus additional tools for page-specific operations, search, and analysis

### 🛠️ Technical Implementation
- **Dependencies Added**: pdf-parse, pdf2pic, canvas & sharp for comprehensive PDF processing
- **Code Structure**: Organized with dedicated PDF processing utilities and enhanced MCP provider
- **User Experience**: Progress indicators, comprehensive error handling, and automatic file opening after conversions
- **Configurable Output**: Customizable output directories for extracted content

## ✨ Features

<table>
<tr>
<td>

### 🖥️ **Native PDF Viewing**
- Leverages Edge WebView2 for superior PDF rendering
- Advanced controls: Zoom in/out, fit to page, page navigation
- Theme support: Seamlessly integrates with VSCode light and dark themes
- Fast performance with optimized rendering and caching

</td>
<td>

### 🔍 **Advanced Text Processing**
- Extract all text content or specific pages using pdf-parse library
- Advanced search with page locations and context
- Document analysis and PDF structure detection
- Table recognition and extraction

</td>
</tr>
<tr>
<td>

### 🖼️ **Image & Visual Processing**
- Extract images from PDF pages as high-quality PNG files using pdf2pic
- Page-specific operations: Extract individual pages as text or images
- Format conversion: SVG, JPEG, PNG, HTML, PowerPoint, Word, and Markdown
- Professional visual asset integration

</td>
<td>

### 🤖 **AI-Powered MCP Integration**
- 14 comprehensive PDF processing tools for AI interaction
- AI-powered document analysis and summarization
- Context-aware processing for intelligent document interaction
- Seamless integration with Model Context Protocol

</td>
</tr>
</table>

### 🚀 **Additional Capabilities**
- **Error Handling**: Robust error handling with user-friendly feedback
- **Progress Indicators**: Visual feedback for long-running operations
- **Configurable Output**: Customizable output directories for extracted content
- **Production Ready**: Comprehensive testing and validation framework

## 🚀 Quick Start

<div align="center">

### Get started in 3 easy steps!

</div>

| Step | Action | Description |
|------|--------|-------------|
| **1** | 📦 **Install** | Install the extension from the [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp) |
| **2** | 📄 **Open PDF** | Open any PDF file in VSCode - it will automatically open in the PDF viewer |
| **3** | 🎮 **Explore** | Use the toolbar controls for navigation, zoom, and access 13+ powerful commands via the Command Palette |

### 💡 Pro Tips
- **Quick Access**: Use `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and type "Darbot PDF" to see all available commands
- **MCP Integration**: Perfect for AI workflows - extract text, analyze structure, and convert formats
- **Batch Processing**: Use MCP tools for automated document processing in AI applications

## 📋 Commands

Access all commands via the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`) and search for "Darbot PDF":

<details>
<summary><strong>🎮 Basic Navigation Commands</strong></summary>

| Command | Description | Icon |
|---------|-------------|------|
| `Darbot PDF Viewer: Open PDF` | Open a PDF file dialog | 📄 |
| `Darbot PDF Viewer: Zoom In` | Increase zoom level | 🔍+ |
| `Darbot PDF Viewer: Zoom Out` | Decrease zoom level | 🔍- |
| `Darbot PDF Viewer: Fit to Page` | Fit PDF to page width | 📐 |

</details>

<details>
<summary><strong>📝 Text and Content Extraction</strong></summary>

| Command | Description | Icon |
|---------|-------------|------|
| `Darbot PDF Viewer: Extract Text from PDF` | Extract all text content from a PDF file | 📝 |
| `Darbot PDF Viewer: Extract Text from Specific Page` | Extract text from a single page | 📄📝 |
| `Darbot PDF Viewer: Search Text in PDF` | Search for specific text and get page locations with context | 🔍 |
| `Darbot PDF Viewer: Generate PDF Summary` | Generate a summary of PDF content and metadata | 📊 |

</details>

<details>
<summary><strong>🖼️ Image and Visual Processing</strong></summary>

| Command | Description | Icon |
|---------|-------------|------|
| `Darbot PDF Viewer: Extract Images from PDF` | Extract images from PDF pages as PNG files | 🖼️ |
| `Darbot PDF Viewer: Extract Page as Image` | Convert a specific page to a high-quality image | 📄🖼️ |

</details>

<details>
<summary><strong>🔍 Document Analysis</strong></summary>

| Command | Description | Icon |
|---------|-------------|------|
| `Darbot PDF Viewer: Analyze PDF Structure` | Analyze document structure, type, and characteristics | 🏗️ |
| `Darbot PDF Viewer: Extract Tables from PDF` | Identify and extract table structures from the document | 📊 |

</details>

<details>
<summary><strong>🔄 Format Conversion</strong></summary>

| Command | Description | Icon |
|---------|-------------|------|
| `Darbot PDF Viewer: Export PDF to Format` | Convert PDF to SVG, JPEG, PNG, HTML, PowerPoint, Word, or Markdown | 🔄 |

</details>

## ⚙️ Requirements

<div align="center">

| Component | Version | Status |
|-----------|---------|---------|
| ![VSCode](https://img.shields.io/badge/VSCode-1.85.0+-0078D4?style=flat-square&logo=visual-studio-code&logoColor=white) | 1.85.0+ | ✅ Required |
| ![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=flat-square&logo=node.js&logoColor=white) | 18+ | 🔧 Development Only |
| ![Edge WebView2](https://img.shields.io/badge/Edge_WebView2-Runtime-0078D7?style=flat-square&logo=microsoft-edge&logoColor=white) | Latest | 🪟 Windows (Auto-installed) |

</div>

> **Note**: Edge WebView2 runtime is typically pre-installed on Windows 10/11. For other platforms, the extension uses VSCode's built-in webview capabilities.

## 🔧 Configuration

The extension works out of the box with no configuration required. Advanced settings will be available in future releases.

## 🤖 MCP Integration

This extension includes comprehensive MCP (Model Context Protocol) support for AI-powered PDF processing:

### Core Capabilities
- **PDF Text Extraction**: Extract all text content or specific pages for AI analysis
- **Metadata Extraction**: Access PDF properties like title, author, creation date
- **Image Extraction**: Extract images from PDF pages for visual analysis
- **Format Conversion**: Convert PDFs to SVG, JPEG, PNG, HTML, PowerPoint, Word, or Markdown for different use cases
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
- Additional format support for HTML, PowerPoint, and Word conversion available

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
# Full production readiness validation
npm run validate:production

# Standard unit tests and validation
npm run test:validation
```

The production validation covers:
- ✅ Package.json configuration and required fields
- ✅ Extension icon and visual assets
- ✅ Command registration and implementation
- ✅ README documentation completeness
- ✅ Build output and compilation
- ✅ All critical production requirements

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

## 🎬 Demo & Screenshots

> 📸 *Screenshots and demo videos coming soon! Check back after marketplace publication.*

### 🎯 Use Cases
- **📚 Research**: Extract text and images from academic papers and documents
- **🤖 AI Workflows**: Integrate with AI tools using MCP for document analysis
- **📊 Data Extraction**: Extract tables and structured data from reports
- **🔄 Format Conversion**: Convert PDFs to various formats for different workflows
- **📝 Content Analysis**: Analyze document structure and generate summaries

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### 🛠️ Development Workflow
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

- **🐞 Bug Reports**: [Create an issue](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/issues/new?template=bug_report.md)
- **💡 Feature Requests**: [Request a feature](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/issues/new?template=feature_request.md)
- **❓ Questions**: [Discussions](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/discussions)

## 🙏 Acknowledgments

- **Microsoft VSCode Team** - For the excellent extension APIs and development environment
- **Microsoft Edge WebView2 Team** - For the powerful web runtime enabling superior PDF rendering
- **MCP Community** - For the Model Context Protocol specifications enabling AI integration
- **Open Source Contributors** - For the amazing libraries that make this extension possible

---

<div align="center">
  
  ### 🚀 **Made with ❤️ by [Darbot Labs](https://github.com/darbotlabs)**
  
  **Revolutionizing document viewing and AI interaction in VSCode**
  
  [![GitHub](https://img.shields.io/badge/GitHub-darbotlabs-181717?style=flat-square&logo=github)](https://github.com/darbotlabs)
  [![Website](https://img.shields.io/badge/Website-darbotlabs.com-0078D4?style=flat-square&logo=edge&logoColor=white)](https://darbotlabs.com)
  
  **⭐ If you find this extension useful, please consider starring the repository! ⭐**
  
</div>