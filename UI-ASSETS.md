# UI Assets and Requirements

This document provides a focused list of UI assets and resources needed for the Darbot PDF Viewer MCP extension. For comprehensive design guidelines, see [DESIGN-FRAMEWORK.md](./DESIGN-FRAMEWORK.md).

## ✅ Current Status: UI Assets Integrated

**Major Progress:** All critical UI assets have been uploaded, organized, and integrated into the extension codebase. The extension now uses custom icons instead of VSCode codicons.

## 📐 Required UI Assets

### Icons and Graphics

#### Extension Icon (`resources/icons/extension/`)
- **pdf-icon.png** (16x16, 32x32, 48x48, 64x64, 128x128, 256x256) - Main extension icon for marketplace
  - Current status: ✅ **COMPLETE: All required sizes available and properly referenced**
  - Requirements: High-quality, scalable PDF icon with Darbot branding
  - Brand colors: Primary #2D5BFF, Secondary #FF6B35
  - Design guidelines: Modern, clean, recognizable PDF symbol
  - File format: PNG with transparency + SVG master file

#### Command Icons (`resources/icons/commands/`)
**Format:** 16x16 and 24x24 SVG with PNG fallbacks  
**Status:** ✅ All complete - 13 command icons integrated into package.json

| Priority | Command | Icon File | Design Description | Status |
|----------|---------|-----------|-------------------|---------|
| **CRITICAL** | Extract Text | `extract-text.svg` | Document with text lines, blue accent | ✅ Complete |
| **CRITICAL** | Extract Images | `extract-images.svg` | Document with image placeholder, green accent | ✅ Complete |
| **HIGH** | Export PDF | `export-pdf.svg` | Document with arrow, orange accent | ✅ Complete |
| **HIGH** | Generate Summary | `summary.svg` | Document with bullet points, purple accent | ✅ Complete |
| **HIGH** | Search Text | `search.svg` | Magnifying glass over text, blue accent | ✅ Complete |
| **MEDIUM** | Extract Page Text | `extract-page-text.svg` | Single page with text, blue accent | ✅ Complete |
| **MEDIUM** | Extract Page Image | `extract-page-image.svg` | Single page with image, green accent | ✅ Complete |
| **MEDIUM** | Analyze Structure | `analyze-structure.svg` | Document with hierarchy, purple accent | ✅ Complete |
| **MEDIUM** | Extract Tables | `extract-tables.svg` | Grid/table icon, orange accent | ✅ Complete |
| **LOW** | Zoom In | `zoom-in.svg` | Plus in magnifying glass | ✅ Complete |
| **LOW** | Zoom Out | `zoom-out.svg` | Minus in magnifying glass | ✅ Complete |
| **LOW** | Fit to Page | `fit-to-page.svg` | Expand arrows in rectangle | ✅ Complete |
| **LOW** | Open PDF | `open-pdf.svg` | Folder with PDF document | ✅ Complete |

#### Toolbar Icons (`resources/icons/toolbar/`)
**Format:** 20x20 PNG (SVG planned for future)  
**Status:** ✅ Available - PDF viewer toolbar icons organized (PNG format)

- **navigation-first-20.png** - First page (⏮️ style) ✅ Available
- **navigation-prev-20.png** - Previous page (◀️ style) ✅ Available  
- **navigation-next-20.png** - Next page (▶️ style) ✅ Available
- **navigation-last-20.png** - Last page (⏭️ style) ✅ Available
- **rotation-left-20.png** - Rotate counter-clockwise ✅ Available
- **rotation-right-20.png** - Rotate clockwise ✅ Available
- **fullscreen-20.png** - Enter fullscreen mode ✅ Available
- **download-20.png** - Download PDF ✅ Available
- **print-20.png** - Print document ✅ Available
- **bookmark-20.png** - Add bookmark ✅ Available
- **share-20.png** - Share options ✅ Available

#### Status and Feedback Icons (`resources/icons/status/`)
**Format:** 16x16 SVG with animation support  
**Status:** ✅ Complete - All progress indicators created with brand colors

- **loading-spinner.svg** - Animated loading indicator (CSS animation) ✅ Complete
- **success-check.svg** - Success checkmark (green #00C851) ✅ Complete
- **warning-triangle.svg** - Warning indicator (orange #FF8800) ✅ Complete
- **error-circle.svg** - Error indicator (red #FF4444) ✅ Complete
- **info-circle.svg** - Information indicator (blue #33B5E5) ✅ Complete
- **progress-bar.svg** - Progress bar components ✅ Complete

### Webview Assets (`resources/webview/`)

#### CSS Stylesheets (`resources/webview/css/`)
**Status:** ❌ All missing - Currently using inline CSS in PdfProvider.ts

**Required Stylesheets:**
- **pdf-viewer-base.css** - Foundation styles and CSS variables
  - VSCode theme integration variables
  - Darbot brand color definitions
  - Typography scale and spacing system
- **pdf-viewer-components.css** - UI component styles  
  - Toolbar styling with hover states
  - Button and control styling
  - Layout grid and flex systems
- **pdf-viewer-themes.css** - Light/dark theme implementations
  - Automatic theme switching
  - High contrast support
  - Custom Darbot theme variants
- **pdf-viewer-responsive.css** - Responsive design rules
  - Panel width adaptations
  - Mobile-friendly controls
  - Zoom level optimizations

#### JavaScript Resources (`resources/webview/js/`)
**Status:** ❌ All missing - Currently using inline JavaScript in PdfProvider.ts

**Required Scripts:**
- **pdf-viewer-core.js** - Main PDF viewer functionality
  - Enhanced zoom controls (currently basic)
  - Keyboard navigation support
  - Document state management
- **toolbar-controls.js** - Interactive toolbar components
  - Page navigation controls
  - Zoom slider implementation
  - Action button handlers
- **edge-integration.js** - Enhanced Edge WebView2 integration
  - Edge-specific PDF rendering
  - Performance optimizations
  - Browser feature detection

#### HTML Templates (`resources/webview/html/`)
**Status:** ❌ All missing - Currently using inline HTML in PdfProvider.ts

**Required Templates:**
- **pdf-viewer.html** - Main PDF viewer template
  - Enhanced toolbar with all controls
  - Sidebar for thumbnails/outline
  - Status bar with document info
- **loading-state.html** - Loading screen template
  - Branded loading animation
  - Progress indicators
  - Operation status messages
- **error-state.html** - Error display template
  - User-friendly error messages
  - Recovery action buttons
  - Diagnostic information
- **empty-state.html** - No document loaded template
  - Welcome message
  - Quick action buttons
  - Getting started guidance

## 🎨 Design System Requirements

### Brand Color Palette
```css
/* Primary Darbot Colors */
--darbot-primary: #2D5BFF;          /* Darbot Blue */
--darbot-primary-dark: #1E3DB8;     /* Darker variant */
--darbot-primary-light: #5A7AFF;    /* Lighter variant */
--darbot-secondary: #FF6B35;        /* Accent Orange */

/* Status Colors */
--darbot-success: #00C851;          /* Success Green */
--darbot-warning: #FF8800;          /* Warning Orange */
--darbot-error: #FF4444;            /* Error Red */
--darbot-info: #33B5E5;             /* Info Blue */
```

### Typography System
- **Primary Font:** VSCode font family integration
- **Monospace Font:** For code/path displays  
- **Icon Font:** Codicons (VSCode icon set) + custom icons

### Layout and Spacing
- **Base Unit:** 4px spacing system
- **Border Radius:** 2px (VSCode standard), 4px (buttons), 6px (panels)
- **Shadows:** Subtle elevation with VSCode color integration
- **Grid System:** Flexible layout for different panel sizes

## 📱 Missing UI Components

### PDF Viewer Interface
❌ **Current Status:** Basic inline implementation needs enhancement

**Required Components:**
- **Enhanced Toolbar:** Professional design with all 12+ controls
- **Sidebar Panel:** Document thumbnails and outline navigation  
- **Status Bar:** Page count, zoom level, document metadata
- **Progress System:** Loading states for all long-running operations
- **Context Menus:** Right-click actions for PDF content
- **Keyboard Shortcuts:** Full accessibility support

### Marketplace Assets (`resources/screenshots/`)
❌ **Current Status:** No marketing assets exist

**Required Screenshots (1920x1080 PNG):**
1. **hero-screenshot.png** - Main PDF viewer interface showcase
2. **command-palette.png** - PDF commands in action
3. **text-extraction.png** - Text extraction results
4. **image-extraction.png** - Image extraction workflow
5. **format-conversion.png** - PDF conversion options
6. **mcp-integration.png** - MCP tools demonstration

## 🚨 Critical Production Blockers

### Immediate Requirements (Cannot ship without)
- [x] **Extension icon** - ✅ Properly referenced and available in all required sizes
- [x] **Command icons** - ✅ All 13 commands now have custom SVG icons integrated
- [ ] **Basic CSS extraction** - Remove inline styles from PdfProvider.ts
- [x] **Loading states** - ✅ Status icons created (loading spinner, success, error, etc.)
- [ ] **Error handling UI** - Needs integration with status icons

### Directory Structure Setup Required
```bash
mkdir -p resources/{icons/{extension,commands,toolbar,status},webview/{css,js,html},screenshots,themes}
```

## 🔧 Implementation Specifications

### Asset Requirements
- **Icons:** SVG primary (theme-aware), PNG fallback (multiple sizes)
- **Images:** PNG for screenshots, WebP for web assets
- **Styles:** CSS3 with VSCode theme variables, modular architecture
- **Scripts:** ES6+ with VSCode API integration, TypeScript preferred

### Performance Standards
- **Bundle Size:** Optimize for VSCode extension loading
- **Loading Time:** Lazy load non-critical assets
- **Memory Usage:** Efficient asset caching and cleanup
- **Accessibility:** WCAG 2.1 AA compliance minimum

## 📋 Asset Creation Checklist

### 🚨 CRITICAL (Pre-Launch Blockers)
- [x] Extension marketplace icon (pdf-icon.png) - ✅ **Referenced in package.json and available**
- [x] 5 core command icons (extract-text, extract-images, export-pdf, summary, search) - ✅ **Complete**
- [ ] Basic PDF viewer CSS (extract from inline styles)
- [x] Loading spinner and success/error icons - ✅ **Complete with brand colors**
- [ ] Primary marketplace screenshot

### ⚡ HIGH PRIORITY (Launch Week)  
- [x] Complete command icon set (13 total icons) - ✅ **All integrated in package.json**
- [x] Enhanced toolbar icon set (12 navigation/control icons) - ✅ **Available in PNG format**
- [ ] Responsive CSS architecture
- [ ] HTML template extraction from inline code
- [x] Status indicator system - ✅ **6 status icons with animations**

### 📈 MEDIUM PRIORITY (Post-Launch)
- [ ] Advanced animation assets
- [ ] Context menu icon set
- [ ] Custom theme variants
- [ ] Feature demonstration assets
- [ ] Accessibility enhancements

### 🎯 Future Enhancements
- [ ] Interactive tutorial assets
- [ ] Video demonstration content
- [ ] Advanced branding materials
- [ ] Custom PDF annotation tools
- [ ] Promotional graphics

---

**For complete design specifications, implementation guidelines, and brand standards, see [DESIGN-FRAMEWORK.md](./DESIGN-FRAMEWORK.md)**

**Status:** Comprehensive asset audit completed - Zero visual assets currently exist  
**Priority:** CRITICAL - Cannot ship to marketplace without basic icon assets  
**Estimated Effort:** 2-3 weeks for complete implementation