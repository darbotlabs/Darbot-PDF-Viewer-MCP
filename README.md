# Darbot PDF Viewer MCP

[![Version](https://img.shields.io/vscode-marketplace/v/darbotlabs.pdf-viewer-mcp.svg)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)
[![Downloads](https://img.shields.io/vscode-marketplace/d/darbotlabs.pdf-viewer-mcp.svg)](https://marketplace.visualstudio.com/items?itemName=darbotlabs.pdf-viewer-mcp)

A powerful PDF viewer extension for VSCode with Edge WebView2 integration and MCP (Model Context Protocol) support for AI-powered document interaction.

## ✨ Features

- **Native PDF Viewing**: Leverages Edge WebView2 for superior PDF rendering
- **Advanced Controls**: Zoom in/out, fit to page, page navigation
- **MCP Integration**: AI-powered document analysis and interaction
- **Theme Support**: Seamlessly integrates with VSCode light and dark themes
- **Fast Performance**: Optimized rendering with lazy loading and caching

## 🚀 Quick Start

1. Install the extension from the VSCode marketplace
2. Open any PDF file in VSCode
3. The file will automatically open in the PDF viewer
4. Use the toolbar controls for navigation and zoom

## 📋 Commands

- `PDF Viewer: Open PDF` - Open a PDF file dialog
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

This extension includes experimental MCP (Model Context Protocol) support for:

- PDF content extraction
- Document summarization
- AI-powered search within PDFs
- Context-aware document interaction

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