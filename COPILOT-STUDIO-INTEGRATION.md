# Microsoft Copilot Studio Integration Guide

## Overview

This guide provides step-by-step instructions for integrating Darbot PDF Viewer MCP with **Microsoft Copilot Studio** and **Power Platform** using the included Swagger 2.0 connector.

## 🎯 What You Can Build

With this integration, you can create:

### Copilot Studio Bots
- **Document Q&A Bot**: Answer questions about PDF content
- **Invoice Processing Bot**: Extract and analyze invoice data
- **Research Assistant**: Search and summarize research papers
- **Contract Analyzer**: Extract key terms and clauses from contracts

### Power Automate Flows
- **Automated Document Processing**: Extract text/images on file upload
- **PDF Report Generation**: Create reports from PDF data
- **Document Archive System**: Organize and index PDFs
- **Data Extraction Pipeline**: Extract tables and structured data

### Power Apps
- **PDF Viewer App**: Custom PDF viewing with annotations
- **Document Management**: Upload, process, and search PDFs
- **Invoice Scanner**: Extract invoice details automatically
- **Report Builder**: Generate insights from PDF documents

## 📋 Prerequisites

Before starting, ensure you have:

- ✅ Microsoft Copilot Studio subscription (or trial)
- ✅ Power Platform environment access
- ✅ Azure subscription (optional, for hosting API)
- ✅ Basic understanding of REST APIs
- ✅ PDF processing server (see [Server Setup](#server-setup))

## 🚀 Quick Start: Copilot Studio Integration

### Step 1: Import the Swagger Definition

1. **Open Copilot Studio**
   - Navigate to [Copilot Studio](https://copilotstudio.microsoft.com)
   - Sign in with your Microsoft account

2. **Create or Open a Copilot**
   - Select an existing copilot or create a new one
   - Go to **Settings** > **Advanced** > **Custom Actions**

3. **Import Custom Connector**
   - Click **Add an action**
   - Select **Custom connector**
   - Choose **Import from OpenAPI file**
   - Upload `/swagger/swagger.json` from this repository

4. **Configure Connection**
   - Set the **Base URL** to your API server (e.g., `https://your-api.com`)
   - Configure authentication if required:
     - **None**: For development/testing
     - **API Key**: For production with key-based auth
     - **OAuth 2.0**: For enterprise scenarios

5. **Test the Connection**
   - Use the built-in test feature
   - Provide a sample PDF path
   - Verify responses

### Step 2: Use Actions in Topics

Create a new topic or edit an existing one:

```yaml
Trigger phrases:
- "analyze this PDF"
- "extract text from document"
- "what's in this PDF"

Dialog flow:
1. User uploads/provides PDF path
2. Call action: "Extract PDF Text"
   - Input: pdfPath = {User.PdfPath}
   - Store result in: {Topic.PdfText}
3. Display: "Here's the content: {Topic.PdfText}"
```

### Example Dialog Flow

```
User: "Can you analyze this document?"
Bot: "Please provide the path to the PDF file."
User: "/documents/invoice.pdf"
[Bot calls extractPdfText action]
Bot: "I've extracted the text. Here's what I found:
     - Pages: 3
     - Word count: 850
     - Summary: [displays content preview]"
```

## 🔧 Power Platform Integration

### Create Custom Connector

1. **Access Power Platform**
   - Go to [make.powerapps.com](https://make.powerapps.com)
   - Select your environment

2. **Import Swagger**
   - Navigate to **Data** > **Custom Connectors**
   - Click **+ New custom connector** > **Import an OpenAPI file**
   - Name: "Darbot PDF Processor"
   - Upload `/swagger/swagger.json`

3. **Configure General Settings**
   - **Icon**: Upload a PDF icon
   - **Icon background color**: `#2D5BFF`
   - **Description**: "Process PDF documents with text extraction, image processing, and analysis"
   - **Host**: Your API server hostname
   - **Base URL**: `/api/v1`

4. **Set Security**
   - Choose authentication type:
     - **No authentication**: For development
     - **API Key**: Add header `x-api-key`
     - **OAuth 2.0**: Configure OAuth flow

5. **Review Definition**
   - Verify all 15 operations are imported
   - Check request/response schemas
   - Update descriptions if needed

6. **Test the Connector**
   - Go to the **Test** tab
   - Create a connection
   - Test each operation:
     ```json
     POST /pdf/text
     {
       "pdfPath": "/sample/document.pdf"
     }
     ```

7. **Create Connection**
   - Click **Create connector**
   - Test the connection
   - Verify it works

### Use in Power Automate

Create a flow that processes PDFs:

```
Trigger: When a file is created (OneDrive/SharePoint)
├─ Condition: File extension = .pdf
├─ Action: Get file content
├─ Action: Save to temp location
├─ Action: Darbot PDF - Extract Text
│   └─ pdfPath: {TempFilePath}
├─ Action: Darbot PDF - Extract Metadata
├─ Action: Darbot PDF - Analyze Structure
└─ Action: Send results to Teams/Email
```

### Use in Power Apps

Add the connector to your app:

1. **Add Data Source**
   - In Power Apps Studio, click **Data** > **Add data**
   - Search for "Darbot PDF Processor"
   - Add the connector

2. **Create UI Elements**
   ```
   - FileInput: Upload PDF
   - Button: "Process PDF"
   - Label: Display results
   ```

3. **Add Logic**
   ```
   OnSelect = DarbotPDFProcessor.extractPdfText({
       pdfPath: FileInput.SelectedFiles.Name
   });
   
   ResultLabel.Text = JSON(
       DarbotPDFProcessor.Response,
       JSONFormat.IndentFour
   )
   ```

## 🏗️ Server Setup

To use the Swagger connector, you need a server that implements the API. Here's a reference implementation:

### Option 1: Node.js/Express Server

```javascript
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { PdfProcessor } = require('./pdf-processor');

const app = express();
app.use(bodyParser.json());

// Health check
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Extract text endpoint
app.post('/api/v1/pdf/text', async (req, res) => {
  try {
    const { pdfPath } = req.body;
    
    if (!pdfPath) {
      return res.status(400).json({
        success: false,
        error: 'pdfPath is required'
      });
    }
    
    const text = await PdfProcessor.extractText({ fsPath: pdfPath });
    
    res.json({
      success: true,
      text
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Add other endpoints...
// /api/v1/pdf/metadata
// /api/v1/pdf/images
// etc.

app.listen(3000, () => {
  console.log('PDF API server running on http://localhost:3000');
});
```

### Option 2: Azure Function

Deploy as serverless Azure Functions for scalability:

```javascript
// ExtractText/index.js
const pdf = require('pdf-parse');
const fs = require('fs').promises;

module.exports = async function (context, req) {
  try {
    const { pdfPath } = req.body;
    
    const dataBuffer = await fs.readFile(pdfPath);
    const data = await pdf(dataBuffer);
    
    context.res = {
      status: 200,
      body: {
        success: true,
        text: data.text
      }
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        success: false,
        error: error.message
      }
    };
  }
};
```

### Option 3: Docker Container

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY server.js ./
COPY utils/ ./utils/

EXPOSE 3000

CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t darbot-pdf-api .
docker run -p 3000:3000 -v /pdfs:/pdfs darbot-pdf-api
```

## 🔐 Security Best Practices

### Authentication

1. **API Key Authentication**
   ```javascript
   app.use((req, res, next) => {
     const apiKey = req.headers['x-api-key'];
     if (apiKey !== process.env.API_KEY) {
       return res.status(401).json({ error: 'Unauthorized' });
     }
     next();
   });
   ```

2. **Azure AD Integration**
   - Use Microsoft Identity platform
   - Configure OAuth 2.0 in Power Platform
   - Secure with Azure AD app registration

### Network Security

- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Add CORS policies
- ✅ Deploy behind API Management
- ✅ Use Azure Key Vault for secrets

### File System Security

- ✅ Validate file paths
- ✅ Restrict to allowed directories
- ✅ Scan for malicious PDFs
- ✅ Implement file size limits
- ✅ Use temporary storage with cleanup

## 📊 Use Case Examples

### 1. Invoice Processing Bot

```yaml
Trigger: "Process invoice {InvoiceFile}"

Actions:
1. Extract text from invoice
2. Extract tables (line items)
3. Analyze structure (find totals)
4. Store in Dataverse
5. Send notification

Response: "Invoice processed. Total: $1,234.56"
```

### 2. Document Search System

```yaml
Trigger: "Search for {SearchTerm} in {DocumentFolder}"

Actions:
1. List PDFs in folder
2. For each PDF:
   - Search for term
   - Extract matching pages
3. Compile results
4. Return matches with context

Response: "Found 5 matches across 3 documents"
```

### 3. Contract Analyzer

```yaml
Trigger: "Analyze contract {ContractPath}"

Actions:
1. Extract full text
2. Analyze structure (clauses)
3. Extract tables (pricing)
4. Generate summary
5. Highlight key terms

Response: "Contract summary: [details]"
```

## 🧪 Testing

### Test Endpoints with Postman

1. Import Swagger definition into Postman
2. Create environment variables:
   - `baseUrl`: `http://localhost:3000/api/v1`
   - `apiKey`: Your API key
3. Test each endpoint with sample PDFs

### Sample Test Cases

```bash
# Test health check
curl http://localhost:3000/api/v1/health

# Test text extraction
curl -X POST http://localhost:3000/api/v1/pdf/text \
  -H "Content-Type: application/json" \
  -d '{"pdfPath": "/path/to/test.pdf"}'

# Test search
curl -X POST http://localhost:3000/api/v1/pdf/search \
  -H "Content-Type: application/json" \
  -d '{"pdfPath": "/path/to/test.pdf", "searchTerm": "invoice"}'
```

## 📚 Additional Resources

### Microsoft Documentation
- [Copilot Studio Custom Connectors](https://learn.microsoft.com/en-us/microsoft-copilot-studio/custom-connectors)
- [Power Platform Connectors](https://learn.microsoft.com/en-us/connectors/custom-connectors/)
- [Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/)

### Swagger Resources
- [Swagger Editor](https://editor.swagger.io/) - Validate your Swagger file
- [OpenAPI Specification](https://swagger.io/specification/v2/)

### Related Documentation
- [Main README](../README.md)
- [Swagger Connector README](../swagger/README.md)
- [API Reference](../swagger/swagger.json)

## 🤝 Support

For questions or issues:
- **GitHub Issues**: [Report a problem](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/issues)
- **Discussions**: [Ask a question](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/discussions)

---

**Made with ❤️ by [Darbot Labs](https://github.com/darbotlabs)**
