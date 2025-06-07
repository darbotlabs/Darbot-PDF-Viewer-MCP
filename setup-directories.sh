#!/bin/bash

# Darbot PDF Viewer MCP - Directory Structure Setup
# Creates the complete directory structure for visual assets

echo "🎨 Setting up Darbot PDF Viewer MCP directory structure..."

# Create main resources directory
mkdir -p resources

# Create icon directories
mkdir -p resources/icons/extension
mkdir -p resources/icons/commands  
mkdir -p resources/icons/toolbar
mkdir -p resources/icons/status

# Create webview asset directories
mkdir -p resources/webview/css
mkdir -p resources/webview/js
mkdir -p resources/webview/html
mkdir -p resources/webview/fonts

# Create theme directories
mkdir -p resources/themes

# Create marketing asset directories
mkdir -p resources/screenshots
mkdir -p resources/branding

# Create documentation directories for design
mkdir -p docs/design
mkdir -p docs/style-guide

# Create testing directories
mkdir -p tests/ui

echo "📁 Directory structure created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Create extension icon: resources/icons/extension/pdf-icon.png"
echo "2. Design command icons in: resources/icons/commands/"
echo "3. Extract CSS from PdfProvider.ts to: resources/webview/css/"
echo "4. Create HTML templates in: resources/webview/html/"
echo "5. Take marketplace screenshots: resources/screenshots/"
echo ""
echo "🎯 Priority 1 (Critical): Extension icon - referenced in package.json"
echo "🎯 Priority 2 (High): Command icons for 13 commands" 
echo "🎯 Priority 3 (Medium): CSS extraction and webview enhancement"
echo ""
echo "For complete asset requirements, see:"
echo "- DESIGN-FRAMEWORK.md (comprehensive design guide)"
echo "- UI-ASSETS.md (focused asset list)"
echo "- VISUAL-ASSETS-INVENTORY.md (detailed audit and roadmap)"