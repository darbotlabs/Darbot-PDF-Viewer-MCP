# 🎨 Assets Requirements & Design Framework

This document outlines all visual assets, icons, logos, and design elements required for the Darbot PDF Viewer MCP extension across various platforms and marketplaces.

## 📋 Table of Contents
- [Extension Marketplace Assets](#extension-marketplace-assets)
- [Application Icons](#application-icons)
- [Command & UI Icons](#command--ui-icons)
- [Branding Assets](#branding-assets)
- [Marketing Materials](#marketing-materials)
- [Platform-Specific Requirements](#platform-specific-requirements)
- [Implementation Status](#implementation-status)

## 🛒 Extension Marketplace Assets

### VSCode Marketplace
- **Extension Icon** (`pdf-icon.png`) - ✅ **CREATED**
  - Size: 128x128px PNG
  - Current: Basic red gradient with "PDF VIEWER" text
  - Status: ✅ Production ready placeholder
  - Location: `resources/icons/pdf-icon.png`

- **Hero Screenshot** - ❌ **NEEDED**
  - Size: 1200x630px
  - Shows: Main PDF viewer interface in action
  - Priority: HIGH

- **Feature Screenshots** (3-5 images) - ❌ **NEEDED**
  - Command palette integration
  - Text extraction interface
  - Image extraction results
  - MCP tools in action
  - Size: Variable, typically 800-1200px wide

### Visual Studio Marketplace Requirements
- **Publisher Profile Icon** - ❌ **NEEDED**
  - Darbot Labs company logo
  - Square format, multiple sizes

## 🔧 Application Icons

### Core Extension Icon Variants
- **Current Implementation**: ✅ Basic version exists
  - 128x128 PNG with red gradient background
  - "PDF VIEWER" text overlay
  - Simple document icon element

- **Recommended Enhancements**: ❌ **NEEDED**
  - 16x16, 32x32, 48x48, 64x64, 256x256 PNG variants
  - SVG master file for scalability
  - High-DPI (@2x, @3x) variants
  - Theme-aware versions (light/dark)

### Windows 11 App Store (Future)
- **App Icon Package** - ❌ **FUTURE REQUIREMENT**
  - Square 44x44, 50x50, 150x150, 310x150, 310x310
  - Store logo 50x50, 90x90, 210x210
  - Wide tile 310x150
  - Large tile 310x310

## ⚙️ Command & UI Icons

### Priority 1: Core Commands (❌ **CRITICAL MISSING**)
All 13 commands need SVG icons:

1. **PDF Operations**
   - `openPdf` - Document open icon
   - `extractText` - Text extraction symbol
   - `extractImages` - Image extraction symbol
   - `exportPdf` - Export/download arrow

2. **Analysis Commands**
   - `getPdfSummary` - Summary/list icon
   - `searchText` - Search/magnifying glass
   - `analyzeStructure` - Structure/tree icon
   - `extractTables` - Table/grid icon

3. **Page Operations**
   - `extractPageText` - Single page text icon
   - `extractPageImage` - Single page image icon

4. **View Controls**
   - `zoomIn` - Plus/zoom in icon
   - `zoomOut` - Minus/zoom out icon
   - `fitToPage` - Fit to screen icon

### Priority 2: Toolbar & Navigation (❌ **HIGH PRIORITY**)
- **Navigation**: First, Previous, Next, Last page
- **Zoom Controls**: Zoom slider, percentage display
- **View Options**: Fit width, fit height, actual size
- **Actions**: Print, download, share, bookmark

### Priority 3: Status & Feedback (❌ **MEDIUM PRIORITY**)
- **Loading States**: Spinner animations, progress bars
- **Status Indicators**: Success check, error X, warning triangle
- **Progress**: Circular progress, linear progress bars

## 🏢 Branding Assets

### Darbot Labs Brand Elements
- **Primary Logo** - ❌ **NEEDED**
  - SVG format for scalability
  - Horizontal and vertical layouts
  - Light and dark theme variants

- **Brand Colors** - ❌ **NEEDED**
  - Primary color palette
  - Secondary accent colors
  - Theme-appropriate variants
  - Accessibility-compliant contrasts

- **Typography** - ❌ **NEEDED**
  - Primary font family specifications
  - Fallback fonts for cross-platform compatibility
  - Size and weight guidelines

### PDF Viewer Specific Branding
- **Product Logo** - ❌ **NEEDED**
  - "Darbot PDF Viewer" wordmark
  - Icon + text combination
  - Compact horizontal version

## 📸 Marketing Materials

### Documentation Assets
- **Feature Demonstration GIFs** - ❌ **NEEDED**
  - Text extraction in action
  - Command palette usage
  - MCP integration examples
  - Image extraction workflow

- **Tutorial Screenshots** - ❌ **NEEDED**
  - Step-by-step guides
  - Before/after comparisons
  - Interface walkthrough

### Promotional Materials
- **Social Media Graphics** - ❌ **FUTURE**
  - Twitter/X card images
  - LinkedIn post graphics
  - GitHub repository social preview

- **Website Assets** - ❌ **FUTURE**
  - Hero banners
  - Feature highlight graphics
  - Comparison charts

## 🎯 Platform-Specific Requirements

### VSCode Extension
- **Current Status**: Basic icon exists ✅
- **Needs**: Enhanced icon set, screenshots
- **Critical**: All command icons missing ❌

### Windows 11 Store (Future Consideration)
- **App Icons**: Full Windows 11 icon package
- **Store Assets**: Screenshots, promotional graphics
- **Compliance**: Microsoft Store guidelines

### macOS App Store (Future Consideration)
- **App Icons**: macOS icon bundle (.icns)
- **Store Assets**: macOS-specific screenshots
- **Guidelines**: Apple Human Interface Guidelines

## 📊 Implementation Status

### ✅ Completed
- [x] Basic extension icon (128x128 PNG)
- [x] Extension builds and packages successfully
- [x] Repository structure for assets

### ❌ Critical Missing (Cannot Ship Without)
- [ ] Command icon set (13 SVG icons)
- [ ] Hero screenshot for marketplace
- [ ] Basic CSS styling extracted from inline code

### ⚠️ High Priority (Launch Week)
- [ ] Enhanced icon variants (multiple sizes)
- [ ] Feature demonstration screenshots
- [ ] Toolbar and navigation icons
- [ ] Loading and status indicators

### 📈 Medium Priority (Post-Launch)
- [ ] Branding guidelines document
- [ ] Complete marketing asset suite
- [ ] Tutorial and onboarding graphics
- [ ] Platform-specific icon packages

### 🔮 Future Enhancements
- [ ] Animated demonstration content
- [ ] Video tutorials and walkthroughs
- [ ] Advanced branding materials
- [ ] Platform store optimization

## 🚀 Next Steps

### Immediate Actions (This Week)
1. **Create command icon set** - All 13 SVG icons
2. **Extract CSS architecture** - Remove inline styling
3. **Capture hero screenshot** - Main marketplace image
4. **Create basic asset guidelines** - Color and style specs

### Short Term (Next 2 Weeks)
1. **Enhanced icon variants** - Multiple sizes and formats
2. **Feature screenshots** - Complete marketplace gallery
3. **Status indicator system** - Loading, success, error states
4. **Documentation assets** - Tutorial screenshots

### Long Term (Next Month)
1. **Complete branding suite** - Logo, colors, typography
2. **Marketing materials** - Social media, promotional graphics
3. **Platform preparation** - Windows/macOS store assets
4. **Advanced UI components** - Animations, themes

---

## 📝 Notes

- **Design System**: All assets should follow a consistent design language
- **Accessibility**: Icons must meet WCAG 2.1 AA contrast requirements
- **Performance**: SVG preferred for scalability, PNG for compatibility
- **Theming**: Support for VSCode light, dark, and high contrast themes
- **Localization**: Consider text-free icons for international compatibility

## 🔗 Related Documentation

- [DESIGN-FRAMEWORK.md](./DESIGN-FRAMEWORK.md) - Complete design specifications
- [UI-ASSETS.md](./UI-ASSETS.md) - Detailed asset requirements
- [VISUAL-ASSETS-INVENTORY.md](./VISUAL-ASSETS-INVENTORY.md) - Implementation roadmap
- [UI-DESIGN-SUMMARY.md](./UI-DESIGN-SUMMARY.md) - Executive summary

---

**Status**: Comprehensive asset audit completed - Critical gaps identified  
**Risk Level**: HIGH - Cannot ship to marketplace without Priority 1 assets  
**Estimated Timeline**: 2-3 weeks for complete basic implementation  
**Resource Requirements**: Designer, asset creation tools, marketplace guidelines