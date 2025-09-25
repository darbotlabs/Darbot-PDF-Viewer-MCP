# GitHub Copilot Instructions for Darbot PDF Viewer MCP

## Project Overview

This is a Visual Studio Code extension that provides advanced PDF viewing capabilities with Edge WebView2 integration and comprehensive Model Context Protocol (MCP) support for AI-powered document processing.

### Key Technologies
- **TypeScript** - Primary development language
- **VSCode Extension API** - Core extension functionality
- **Edge WebView2** - PDF rendering and UI
- **Model Context Protocol (MCP)** - AI integration
- **PDF Processing Libraries** - pdf-parse, pdf2pic, canvas, sharp

## Architecture

### Core Components
1. **Extension Entry Point** (`src/extension.ts`) - Main activation/deactivation logic
2. **PDF Provider** (`src/providers/PdfProvider.ts`) - Custom editor provider for PDF files
3. **MCP Provider** (`src/providers/McpProvider.ts`) - Handles 14 MCP tools for AI integration
4. **Command Handlers** (`src/commands/`) - 13 VSCode commands for user interaction
5. **Utilities** (`src/utils/`) - Edge integration and PDF processing utilities

### Design Patterns
- Use **provider pattern** for main components (PdfProvider, McpProvider)
- **Command pattern** for VSCode command handling
- **Dependency injection** for shared services (MCP provider passed to command handlers)
- **Clean separation** between UI (webview), business logic (providers), and utilities

## Development Guidelines

### Code Style & Standards
- **TypeScript**: Strict mode enabled, target ES2020
- **ESLint**: Follow the configured rules in `eslint.config.js`
- **Indentation**: 2 spaces (consistent with existing code)
- **Semicolons**: Always use semicolons
- **Naming**: Use camelCase, follow @typescript-eslint/naming-convention rules

### File Organization
```
src/
├── extension.ts           # Main entry point
├── providers/            # Core providers (PDF, MCP, WebView)
├── commands/             # VSCode command handlers
├── utils/                # Utilities (edge integration, PDF processing)
└── test/                 # Test files
```

### Testing Requirements
- **Build Validation**: Code must compile without errors (`npm run compile`)
- **Linting**: Must pass ESLint checks (`npm run lint`)
- **Unit Tests**: Use existing test structure in `src/test/`
- **Production Validation**: Run `npm run validate:production` for comprehensive checks

### VSCode Extension Best Practices
- **Activation Events**: Only activate when needed (PDF files or specific commands)
- **Resource Management**: Always dispose of subscriptions in extension context
- **WebView Context**: Use `retainContextWhenHidden: true` for PDF viewer
- **Error Handling**: Provide user-friendly error messages and logging

## MCP Integration Specifics

### MCP Tools (14 available)
- Text extraction and search
- Image and page processing
- Structure analysis and tables
- Format conversion
- Metadata handling

### Command Registration
The extension registers 13 VSCode commands:
- Basic operations: open, zoom, navigate
- Text processing: extract, search, page-specific operations
- Image operations: extract all, extract from specific pages
- Analysis: structure analysis, table extraction, summarization
- Conversion: multiple output formats

### Implementation Notes
- MCP provider must be initialized before command handlers
- Use `CommandHandlers.setMcpProvider(mcpProvider)` to inject MCP functionality
- All MCP operations should have proper error handling and user feedback

## Contributing Workflow

### Before Making Changes
1. Run `npm install` to install dependencies
2. Run `npm run compile` to ensure clean build
3. Run `npm run lint` to check code style
4. Review `CONTRIBUTING.md` for detailed guidelines

### Code Changes
- **Minimal Changes**: Make smallest possible modifications
- **Error Handling**: Add comprehensive try-catch blocks
- **User Experience**: Provide progress indicators for long operations
- **Documentation**: Update JSDoc comments for public methods

### Testing Changes
- Build: `npm run compile`
- Lint: `npm run lint`
- Unit Tests: `npm run test:unit`
- Production Validation: `npm run validate:production`

### Commit Messages
Follow conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Example: `feat(mcp): add table extraction functionality`

## Key Dependencies

### Production Dependencies
- `@vscode/webview-ui-toolkit` - WebView UI components
- `pdf-parse` - PDF text extraction
- `pdf2pic` - PDF to image conversion
- `canvas` - Graphics rendering
- `sharp` - Image processing

### Development Dependencies
- `@typescript-eslint/*` - TypeScript linting
- `@types/vscode` - VSCode API types
- `typescript` - TypeScript compiler

## Common Patterns

### Error Handling
```typescript
try {
    // PDF processing operation
    const result = await processPdf(filePath);
    return result;
} catch (error) {
    vscode.window.showErrorMessage(`PDF processing failed: ${error.message}`);
    console.error('PDF processing error:', error);
    throw error;
}
```

### Progress Indicators
```typescript
await vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    title: "Processing PDF...",
    cancellable: false
}, async (progress) => {
    // Long-running operation
});
```

### WebView Communication
```typescript
// Send message to webview
webviewPanel.webview.postMessage({
    command: 'updatePdf',
    data: pdfData
});

// Handle messages from webview
webviewPanel.webview.onDidReceiveMessage(message => {
    switch (message.command) {
        case 'ready':
            // Handle webview ready
            break;
    }
});
```

## Important Files to Reference

- **README.md** - Comprehensive feature documentation and usage examples
- **CONTRIBUTING.md** - Detailed contributing guidelines and development setup
- **package.json** - Extension metadata, commands, and dependencies
- **PRODUCTION-READINESS.md** - Production deployment requirements and validation

## Extension-Specific Considerations

### PDF Processing
- Support for large PDF files with progress indicators
- Extract text, images, tables, and metadata
- Convert to multiple formats (SVG, JPEG, PNG, HTML, etc.)
- Handle edge cases like corrupted or password-protected PDFs

### VSCode Integration
- Custom editor provider for `.pdf` files
- Command palette integration with "Darbot PDF" category
- WebView integration with proper theming support
- Resource management and cleanup on extension deactivation

### AI/MCP Features
- 14 MCP tools for comprehensive AI integration
- Context-aware document analysis
- Support for batch processing and automation
- Maintain compatibility with Model Context Protocol standards

Remember: This extension is production-ready and actively maintained. Prioritize stability, user experience, and maintaining the existing architecture when making contributions.