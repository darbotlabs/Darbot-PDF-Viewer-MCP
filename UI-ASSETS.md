# UI Assets and Requirements

This document provides a focused list of UI assets and resources needed for the Darbot PDF Viewer MCP extension. For comprehensive design guidelines, see [DESIGN-FRAMEWORK.md](./DESIGN-FRAMEWORK.md).

## 🚨 Current Status: Zero Visual Assets Exist

**Critical Issue:** The extension references `resources/icons/pdf-icon.png` in package.json but no visual assets exist in the repository.

## 📐 Required UI Assets

### Icons and Graphics

#### Extension Icon (`resources/icons/extension/`)
- **pdf-icon.png** (16x16, 32x32, 48x48, 64x64, 128x128, 256x256) - Main extension icon for marketplace
  - Current status: ❌ **CRITICAL: Referenced in package.json but missing**
  - Requirements: High-quality, scalable PDF icon with Darbot branding
  - Brand colors: Primary #2D5BFF, Secondary #FF6B35
  - Design guidelines: Modern, clean, recognizable PDF symbol
  - File format: PNG with transparency + SVG master file

#### Command Icons (`resources/icons/commands/`)
**Format:** 16x16 and 24x24 SVG with PNG fallbacks  
**Status:** ❌ All missing - 13 command icons required

| Priority | Command | Icon File | Design Description |
|----------|---------|-----------|-------------------|
| **CRITICAL** | Extract Text | `extract-text.svg` | Document with text lines, blue accent |
| **CRITICAL** | Extract Images | `extract-images.svg` | Document with image placeholder, green accent |
| **HIGH** | Export PDF | `export-pdf.svg` | Document with arrow, orange accent |
| **HIGH** | Generate Summary | `summary.svg` | Document with bullet points, purple accent |
| **HIGH** | Search Text | `search.svg` | Magnifying glass over text, blue accent |
| **MEDIUM** | Extract Page Text | `page-text.svg` | Single page with text, blue accent |
| **MEDIUM** | Extract Page Image | `page-image.svg` | Single page with image, green accent |
| **MEDIUM** | Analyze Structure | `analyze.svg` | Document with hierarchy, purple accent |
| **MEDIUM** | Extract Tables | `tables.svg` | Grid/table icon, orange accent |
| **LOW** | Zoom In | `zoom-in.svg` | Plus in magnifying glass |
| **LOW** | Zoom Out | `zoom-out.svg` | Minus in magnifying glass |
| **LOW** | Fit to Page | `fit-page.svg` | Expand arrows in rectangle |
| **LOW** | Open PDF | `open-pdf.svg` | Folder with PDF document |

#### Toolbar Icons (`resources/icons/toolbar/`)
**Format:** 20x20 SVG with hover states  
**Status:** ❌ All missing - PDF viewer toolbar needs 12+ icons

- **navigation-first.svg** - First page (⏮️ style)
- **navigation-prev.svg** - Previous page (◀️ style)  
- **navigation-next.svg** - Next page (▶️ style)
- **navigation-last.svg** - Last page (⏭️ style)
- **zoom-controls.svg** - Zoom slider control
- **rotation-left.svg** - Rotate counter-clockwise
- **rotation-right.svg** - Rotate clockwise
- **fullscreen.svg** - Enter fullscreen mode
- **download.svg** - Download PDF
- **print.svg** - Print document
- **bookmark.svg** - Add bookmark
- **share.svg** - Share options

#### Status and Feedback Icons (`resources/icons/status/`)
**Format:** 16x16 SVG with animation support  
**Status:** ❌ All missing - Progress indicators needed

- **loading-spinner.svg** - Animated loading indicator (CSS animation)
- **success-check.svg** - Success checkmark (green #00C851)
- **warning-triangle.svg** - Warning indicator (orange #FF8800)
- **error-circle.svg** - Error indicator (red #FF4444)
- **info-circle.svg** - Information indicator (blue #33B5E5)
- **progress-bar.svg** - Progress bar components

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
- [ ] **Extension icon** - Referenced in package.json but missing
- [ ] **Command icons** - 13 commands have no visual identity
- [ ] **Basic CSS extraction** - Remove inline styles from PdfProvider.ts
- [ ] **Loading states** - No user feedback during operations
- [ ] **Error handling UI** - Poor error experience

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
- [ ] Extension marketplace icon (pdf-icon.png) - **Referenced in package.json**
- [ ] 5 core command icons (extract-text, extract-images, export-pdf, summary, search)
- [ ] Basic PDF viewer CSS (extract from inline styles)
- [ ] Loading spinner and success/error icons
- [ ] Primary marketplace screenshot

### ⚡ HIGH PRIORITY (Launch Week)  
- [ ] Complete command icon set (13 total icons)
- [ ] Enhanced toolbar icon set (12 navigation/control icons)
- [ ] Responsive CSS architecture
- [ ] HTML template extraction from inline code
- [ ] Status indicator system

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