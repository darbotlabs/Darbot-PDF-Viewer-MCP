# Contributing Guide

Thank you for your interest in contributing to the Darbot PDF Viewer MCP extension! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- VSCode 1.85.0+
- Git
- TypeScript knowledge

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP.git
   cd Darbot-PDF-Viewer-MCP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Compile the project**
   ```bash
   npm run compile
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Run validation**
   ```bash
   npm run test:validation
   ```

## 📋 Development Guidelines

### Code Style
- Follow TypeScript best practices
- Use ESLint configuration provided
- Maintain consistent indentation (2 spaces)
- Add JSDoc comments for public methods
- Follow VSCode extension development patterns

### Testing Requirements
- Write tests for new functionality
- Ensure all existing tests pass
- Add integration tests for MCP tools
- Use the ValidationFramework for comprehensive testing
- Aim for >80% code coverage

### Commit Messages
Follow conventional commit format:
```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks

Example:
```
feat(mcp): add table extraction functionality

Add new MCP tool for extracting table structures from PDF documents.
Includes support for tab-separated and space-separated table formats.

Closes #123
```

## 🔧 Architecture Overview

### Project Structure
```
src/
├── extension.ts          # Extension entry point
├── providers/            # Core service providers
│   ├── McpProvider.ts   # MCP integration (14 tools)
│   ├── PdfProvider.ts   # PDF document handling
│   └── WebviewProvider.ts # UI management
├── commands/            # Command implementations
│   └── index.ts        # All 13 command handlers
├── utils/              # Utility functions
│   ├── pdf-processor.ts # PDF processing logic
│   └── edge-integration.ts # WebView integration
└── test/               # Test suites
    ├── suite/          # Unit and integration tests
    └── validation/     # Validation framework
```

### Key Components

#### MCP Provider
Manages 14 MCP tools for AI integration:
- Text extraction and search
- Image and page processing  
- Structure analysis and tables
- Format conversion
- Metadata handling

#### PDF Processor
Core PDF processing utilities:
- Text and image extraction
- Page-specific operations
- Document analysis
- Format conversion
- Error handling

#### Command Handlers
13 VSCode commands for user interaction:
- Basic operations (open, zoom, navigate)
- Text processing (extract, search, page-specific)
- Image operations (extract all, extract page)
- Analysis (structure, tables, summary)
- Conversion (multiple formats)

## 🎯 Contributing Areas

### High Priority
- **UI Assets**: Design and implement professional icons and graphics
- **Error Handling**: Improve error messages and recovery
- **Performance**: Optimize for large PDF documents
- **Documentation**: Enhance inline documentation and examples

### Medium Priority
- **New MCP Tools**: Additional PDF processing capabilities
- **Accessibility**: Improve screen reader and keyboard support
- **Internationalization**: Multi-language support
- **Testing**: Expand test coverage and edge cases

### Future Enhancements
- **OCR Integration**: Text recognition for scanned PDFs
- **Advanced Analysis**: Machine learning-powered insights
- **Collaboration**: Real-time shared document features
- **Cloud Integration**: Support for cloud storage services

## 🐛 Bug Reports

### Before Reporting
1. Check existing issues
2. Reproduce the bug consistently
3. Test with latest version
4. Run validation framework

### Bug Report Template
```markdown
**Bug Description**
Clear description of the issue

**Steps to Reproduce**
1. Step one
2. Step two
3. Step three

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [Windows/macOS/Linux]
- VSCode Version: [version]
- Extension Version: [version]
- Node.js Version: [version]

**Additional Context**
- Error messages
- Console output
- Screenshots (if applicable)
```

## ✨ Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**Use Case**
Why is this feature needed?

**Proposed Solution**
How should this be implemented?

**Alternative Solutions**
Other approaches considered

**Additional Context**
Any other relevant information
```

## 🔍 Code Review Process

### Pull Request Guidelines
1. **Fork the repository** and create a feature branch
2. **Make changes** following coding standards
3. **Add tests** for new functionality
4. **Update documentation** if needed
5. **Run validation** to ensure quality
6. **Submit pull request** with clear description

### Review Criteria
- Code quality and consistency
- Test coverage and validation
- Documentation completeness
- Performance impact
- Security considerations
- Backwards compatibility

### CI/CD Pipeline
All PRs must pass:
- ESLint checks
- TypeScript compilation
- Unit and integration tests
- Validation framework
- Security audit

## 📚 Resources

### Documentation
- [VSCode Extension API](https://code.visualstudio.com/api)
- [Model Context Protocol](https://github.com/modelcontextprotocol)
- [PDF Processing Libraries](docs/pdf-libraries.md)
- [Extension Development Guide](docs/development.md)

### Tools and Libraries
- **pdf-parse**: Text extraction
- **pdf2pic**: Image conversion
- **sharp**: Image processing
- **canvas**: Graphics rendering
- **TypeScript**: Language
- **ESLint**: Code linting
- **Mocha**: Testing framework

## 🤝 Community

### Communication
- **Issues**: GitHub issues for bugs and features
- **Discussions**: GitHub discussions for questions
- **Code Review**: GitHub pull requests
- **Documentation**: GitHub wiki

### Support
- Check documentation first
- Search existing issues
- Provide detailed information
- Be respectful and constructive

## 📄 License

By contributing to this project, you agree that your contributions will be licensed under the MIT License. See [LICENSE](LICENSE) file for details.

---

**Thank you for contributing to Darbot PDF Viewer MCP!** 🎉