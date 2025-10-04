# Darbot PDF Viewer MCP - Swagger 2.0 API Connector

This directory contains the Swagger 2.0 (OpenAPI 2.0) specification for the Darbot PDF Viewer MCP API, designed for seamless integration with **Microsoft Copilot Studio** and **Power Platform**.

## 📋 Overview

The `swagger.json` file defines a REST API that exposes all 14 MCP (Model Context Protocol) tools as HTTP endpoints, enabling:
- Integration with Microsoft Copilot Studio custom connectors
- Power Platform workflow automation
- Power Automate flow integration
- Azure Logic Apps connectivity
- Third-party API consumption

## 🚀 Quick Start

### For Microsoft Copilot Studio

1. **Import the Swagger Definition**:
   - Open Copilot Studio
   - Navigate to **Topics** > **Custom Actions**
   - Select **Add an action** > **Custom connector**
   - Choose **Import from OpenAPI file**
   - Upload `swagger.json` from this directory

2. **Configure Authentication** (if required):
   - Set up API key authentication or OAuth 2.0
   - Configure base URL to point to your API server

3. **Use in Topics**:
   - Reference the imported actions in your conversation topics
   - Map PDF file paths and parameters
   - Handle responses in your conversation flow

### For Power Platform

1. **Create Custom Connector**:
   - Go to [Power Platform](https://make.powerapps.com)
   - Navigate to **Data** > **Custom Connectors**
   - Click **+ New custom connector** > **Import an OpenAPI file**
   - Upload `swagger.json`

2. **Configure Connector**:
   - Set **Host**: Your API server address (default: `localhost:3000`)
   - Update **Base URL**: `/api/v1`
   - Configure security settings as needed

3. **Test Connection**:
   - Use the **Test** tab to verify endpoints
   - Provide sample PDF paths for testing

4. **Use in Power Apps/Automate**:
   - Add the connector to your Power Apps
   - Create flows in Power Automate using the connector actions
   - Reference in Azure Logic Apps

## 🔧 API Endpoints

### Text Extraction
- `POST /api/v1/pdf/text` - Extract all text from PDF
- `POST /api/v1/pdf/page/text` - Extract text from specific page
- `POST /api/v1/pdf/search` - Search for text in PDF

### Metadata & Information
- `POST /api/v1/pdf/metadata` - Get PDF metadata (title, author, etc.)
- `POST /api/v1/pdf/summary` - Generate document summary
- `POST /api/v1/pdf/page-count` - Get total page count

### Image Operations
- `POST /api/v1/pdf/images` - Extract all images from PDF
- `POST /api/v1/pdf/page/image` - Extract specific page as image

### Conversion
- `POST /api/v1/pdf/convert/svg` - Convert PDF to SVG
- `POST /api/v1/pdf/convert/jpeg` - Convert PDF to JPEG
- `POST /api/v1/pdf/convert/png` - Convert PDF to PNG
- `POST /api/v1/pdf/convert/markdown` - Convert PDF to Markdown

### Analysis
- `POST /api/v1/pdf/analyze/structure` - Analyze document structure
- `POST /api/v1/pdf/tables` - Extract tables from PDF

### System
- `GET /api/v1/health` - Health check endpoint

## 📝 Request Examples

### Extract Text
```json
POST /api/v1/pdf/text
{
  "pdfPath": "/path/to/document.pdf"
}
```

### Search in PDF
```json
POST /api/v1/pdf/search
{
  "pdfPath": "/path/to/document.pdf",
  "searchTerm": "invoice"
}
```

### Extract Page as Image
```json
POST /api/v1/pdf/page/image
{
  "pdfPath": "/path/to/document.pdf",
  "pageNumber": 1,
  "outputPath": "/path/to/output/page1.png"
}
```

## 🔐 Security Considerations

### Authentication Options
The API can be secured using:
- **API Keys**: Add `x-api-key` header authentication
- **OAuth 2.0**: Implement OAuth flow for enterprise scenarios
- **Azure AD**: Integrate with Microsoft identity platform

### Network Security
- Deploy behind Azure API Management for production
- Use HTTPS in production environments
- Implement rate limiting and throttling
- Add CORS policies for web clients

## 🏗️ Implementation Notes

### Running the API Server

To implement this API specification, you'll need to create a server that:

1. **Hosts the API endpoints** defined in `swagger.json`
2. **Integrates with the MCP Provider** from the VSCode extension
3. **Handles file system operations** for PDF processing

Example server structure (Node.js/Express):
```javascript
const express = require('express');
const app = express();

// Import PDF processor utilities
const { PdfProcessor } = require('../src/utils/pdf-processor');

app.post('/api/v1/pdf/text', async (req, res) => {
  try {
    const { pdfPath } = req.body;
    const text = await PdfProcessor.extractText({ fsPath: pdfPath });
    res.json({ success: true, text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ... implement other endpoints

app.listen(3000, () => {
  console.log('PDF API server running on port 3000');
});
```

## 📚 Additional Resources

### Microsoft Documentation
- [Copilot Studio Custom Connectors](https://learn.microsoft.com/en-us/microsoft-copilot-studio/custom-connectors)
- [Power Platform Custom Connectors](https://learn.microsoft.com/en-us/connectors/custom-connectors/)
- [OpenAPI Specification](https://swagger.io/specification/v2/)

### Power Platform Integration
- [Create custom connector from OpenAPI](https://learn.microsoft.com/en-us/connectors/custom-connectors/define-openapi-definition)
- [Use custom connectors in Power Automate](https://learn.microsoft.com/en-us/power-automate/get-started-logic-flow)

## 🤝 Contributing

To extend or modify the API:
1. Update `swagger.json` with new endpoints
2. Ensure compliance with Swagger 2.0 specification
3. Test with Swagger Editor: https://editor.swagger.io/
4. Validate with Power Platform connector import

## 📄 License

MIT License - Same as parent project

## 🐛 Support

For issues or questions:
- GitHub Issues: [Report an issue](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/issues)
- Documentation: [Main README](../README.md)

---

**Made with ❤️ by [Darbot Labs](https://github.com/darbotlabs)**
