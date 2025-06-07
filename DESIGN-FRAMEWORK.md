# 🎨 Darbot PDF Viewer MCP - Comprehensive Design Framework

This document establishes the complete design framework, visual identity, and UI asset requirements for the Darbot PDF Viewer MCP extension to achieve professional, production-ready quality.

## 📋 Directory Structure Audit

### Current State Analysis
```
Darbot-PDF-Viewer-MCP/
├── src/                     # Source code - contains inline styling
├── package.json            # References missing icon: resources/icons/pdf-icon.png
├── UI-ASSETS.md           # Basic asset list - needs enhancement
└── [NO VISUAL ASSETS]     # ❌ Zero visual assets currently exist
```

### Required Directory Structure
```
Darbot-PDF-Viewer-MCP/
├── resources/
│   ├── icons/              # Extension and command icons
│   │   ├── extension/      # Marketplace icons
│   │   ├── commands/       # Command palette icons
│   │   ├── toolbar/        # PDF viewer toolbar icons
│   │   └── status/         # Progress and state indicators
│   ├── webview/            # PDF viewer interface assets
│   │   ├── css/            # Stylesheets
│   │   ├── js/             # Client-side scripts
│   │   ├── html/           # Template files
│   │   └── fonts/          # Custom fonts (if needed)
│   ├── themes/             # Color schemes and theme definitions
│   ├── branding/           # Brand assets and guidelines
│   └── screenshots/        # Marketplace screenshots
├── docs/
│   ├── design/             # Design specifications
│   └── style-guide/        # Visual style guide
└── tests/
    └── ui/                 # UI/UX testing assets
```

## 🏢 Brand Identity & Design System

### Brand Colors
```css
/* Primary Brand Palette */
--darbot-primary: #2D5BFF;          /* Darbot Blue */
--darbot-primary-dark: #1E3DB8;     /* Darker blue for accents */
--darbot-primary-light: #5A7AFF;    /* Lighter blue for highlights */

/* Secondary Palette */
--darbot-secondary: #FF6B35;        /* Accent orange */
--darbot-neutral-900: #1A1A1A;      /* Dark text */
--darbot-neutral-700: #4A4A4A;      /* Medium text */
--darbot-neutral-300: #B0B0B0;      /* Light text */
--darbot-neutral-100: #F5F5F5;      /* Background */

/* Status Colors */
--darbot-success: #00C851;          /* Green for success */
--darbot-warning: #FF8800;          /* Orange for warnings */
--darbot-error: #FF4444;            /* Red for errors */
--darbot-info: #33B5E5;             /* Blue for information */

/* VSCode Theme Integration */
--darbot-bg-primary: var(--vscode-editor-background);
--darbot-bg-secondary: var(--vscode-sidebar-background);
--darbot-fg-primary: var(--vscode-editor-foreground);
--darbot-border: var(--vscode-panel-border);
```

### Typography Scale
```css
/* Font Families */
--darbot-font-primary: var(--vscode-font-family), 'Segoe UI', system-ui;
--darbot-font-mono: var(--vscode-editor-font-family), 'Consolas', monospace;
--darbot-font-brand: 'Inter', var(--vscode-font-family), sans-serif;

/* Font Sizes */
--darbot-text-xs: 11px;     /* Small labels */
--darbot-text-sm: 12px;     /* Body text small */
--darbot-text-md: 13px;     /* Body text default */
--darbot-text-lg: 14px;     /* Headings small */
--darbot-text-xl: 16px;     /* Headings medium */
--darbot-text-2xl: 18px;    /* Headings large */
--darbot-text-3xl: 24px;    /* Display text */

/* Font Weights */
--darbot-weight-normal: 400;
--darbot-weight-medium: 500;
--darbot-weight-semibold: 600;
--darbot-weight-bold: 700;
```

### Spacing & Layout System
```css
/* Spacing Scale (4px base unit) */
--darbot-space-1: 4px;      /* xs */
--darbot-space-2: 8px;      /* sm */
--darbot-space-3: 12px;     /* md */
--darbot-space-4: 16px;     /* lg */
--darbot-space-5: 20px;     /* xl */
--darbot-space-6: 24px;     /* 2xl */
--darbot-space-8: 32px;     /* 3xl */
--darbot-space-10: 40px;    /* 4xl */

/* Border Radius */
--darbot-radius-sm: 2px;    /* VSCode standard */
--darbot-radius-md: 4px;    /* Buttons, inputs */
--darbot-radius-lg: 6px;    /* Panels, cards */
--darbot-radius-xl: 8px;    /* Modals, overlays */

/* Shadows */
--darbot-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.1);
--darbot-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--darbot-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
```

## 🎯 Icon Design System

### Extension Marketplace Icon
**File:** `resources/icons/extension/pdf-icon.png`
- **Sizes Required:** 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
- **Format:** PNG with transparency
- **Design Requirements:**
  - Darbot brand colors (#2D5BFF primary)
  - PDF document representation with modern styling
  - Clear visibility at all sizes
  - High contrast for marketplace visibility
  - Consistent with VSCode design language

### Command Icons (16x16, 24x24 SVG)
**Location:** `resources/icons/commands/`

| Command | Icon File | Design Description |
|---------|-----------|-------------------|
| Extract Text | `extract-text.svg` | Document with text lines, blue accent |
| Extract Images | `extract-images.svg` | Document with image placeholder, green accent |
| Export PDF | `export-pdf.svg` | Document with arrow, orange accent |
| Generate Summary | `summary.svg` | Document with bullet points, purple accent |
| Search Text | `search.svg` | Magnifying glass over text, blue accent |
| Extract Page Text | `page-text.svg` | Single page with text, blue accent |
| Extract Page Image | `page-image.svg` | Single page with image, green accent |
| Analyze Structure | `analyze.svg` | Document with hierarchy lines, purple accent |
| Extract Tables | `tables.svg` | Grid/table icon, orange accent |
| Zoom In | `zoom-in.svg` | Plus in magnifying glass |
| Zoom Out | `zoom-out.svg` | Minus in magnifying glass |
| Fit to Page | `fit-page.svg` | Expand arrows in rectangle |
| Open PDF | `open-pdf.svg` | Folder with PDF document |

### Toolbar Icons (20x20 SVG)
**Location:** `resources/icons/toolbar/`
- `navigation-first.svg` - First page
- `navigation-prev.svg` - Previous page  
- `navigation-next.svg` - Next page
- `navigation-last.svg` - Last page
- `zoom-controls.svg` - Zoom slider
- `rotation-left.svg` - Rotate counter-clockwise
- `rotation-right.svg` - Rotate clockwise
- `fullscreen.svg` - Enter fullscreen
- `download.svg` - Download PDF
- `print.svg` - Print document
- `bookmark.svg` - Add bookmark
- `share.svg` - Share options

### Status & Feedback Icons (16x16 SVG)
**Location:** `resources/icons/status/`
- `loading-spinner.svg` - Animated loading indicator
- `success-check.svg` - Success checkmark (green)
- `warning-triangle.svg` - Warning indicator (orange)
- `error-circle.svg` - Error indicator (red)
- `info-circle.svg` - Information indicator (blue)
- `progress-bar.svg` - Progress indicator components

## 🖼️ PDF Viewer Interface Assets

### CSS Architecture
**Location:** `resources/webview/css/`

#### Core Stylesheets
1. **`pdf-viewer-base.css`** - Foundation styles and CSS variables
2. **`pdf-viewer-components.css`** - UI component styles
3. **`pdf-viewer-themes.css`** - Light/dark theme implementations
4. **`pdf-viewer-responsive.css`** - Responsive design rules
5. **`pdf-viewer-animations.css`** - Transitions and animations

#### Component-Specific Styles
- `toolbar.css` - PDF viewer toolbar styling
- `sidebar.css` - Document outline and thumbnails
- `context-menu.css` - Right-click context menus
- `modal.css` - Dialog and popup styles
- `progress.css` - Loading and progress indicators

### HTML Templates
**Location:** `resources/webview/html/`

1. **`pdf-viewer.html`** - Main PDF viewer template
2. **`loading-state.html`** - Loading screen template
3. **`error-state.html`** - Error display template
4. **`empty-state.html`** - No document loaded template
5. **`context-menu.html`** - Right-click menu template

### JavaScript Components
**Location:** `resources/webview/js/`

1. **`pdf-viewer-core.js`** - Main viewer functionality
2. **`toolbar-controls.js`** - Toolbar interaction handlers
3. **`keyboard-shortcuts.js`** - Keyboard navigation
4. **`context-menu.js`** - Right-click menu logic
5. **`progress-handler.js`** - Progress indication
6. **`theme-manager.js`** - Theme switching logic

## 🎨 Theme System

### Theme Configuration Files
**Location:** `resources/themes/`

#### VSCode Theme Integration
```json
// darbot-light-theme.json
{
  "name": "Darbot PDF Viewer Light",
  "type": "light",
  "colors": {
    "darbot.primary": "#2D5BFF",
    "darbot.background": "#FFFFFF",
    "darbot.foreground": "#1A1A1A",
    "darbot.border": "#E0E0E0",
    "darbot.toolbar": "#F8F9FA",
    "darbot.accent": "#FF6B35"
  }
}

// darbot-dark-theme.json
{
  "name": "Darbot PDF Viewer Dark",
  "type": "dark",
  "colors": {
    "darbot.primary": "#5A7AFF",
    "darbot.background": "#1E1E1E",
    "darbot.foreground": "#CCCCCC",
    "darbot.border": "#404040",
    "darbot.toolbar": "#2D2D30",
    "darbot.accent": "#FF8A65"
  }
}
```

### High Contrast Support
- `darbot-high-contrast.json` - High contrast theme definitions
- Accessibility compliance with WCAG 2.1 AA standards
- Enhanced focus indicators and state changes

## 📸 Marketing & Documentation Assets

### Marketplace Screenshots
**Location:** `resources/screenshots/`

Required screenshots (1920x1080, PNG):
1. **`hero-screenshot.png`** - Main PDF viewer interface
2. **`command-palette.png`** - Command palette with PDF commands
3. **`text-extraction.png`** - Text extraction in action
4. **`image-extraction.png`** - Image extraction results
5. **`format-conversion.png`** - PDF conversion options
6. **`mcp-integration.png`** - MCP tools demonstration

### Feature Demonstrations
1. **`toolbar-demo.gif`** - Animated toolbar usage
2. **`zoom-demo.gif`** - Zoom controls demonstration
3. **`search-demo.gif`** - Text search functionality
4. **`extraction-workflow.gif`** - Complete extraction workflow

### Brand Assets
**Location:** `resources/branding/`

1. **`darbot-logo.svg`** - Primary Darbot logo
2. **`darbot-logo-dark.svg`** - Dark theme variant
3. **`darbot-wordmark.svg`** - Text-only logo
4. **`pdf-viewer-logo.svg`** - Product-specific logo
5. **`brand-colors.css`** - Brand color definitions

## 🔧 Implementation Specifications

### File Format Requirements

#### Icons
- **Primary Format:** SVG (scalable, theme-aware)
- **Fallback Format:** PNG (multiple sizes)
- **Optimization:** Minified SVG, optimized PNG
- **Naming Convention:** `kebab-case-descriptive.svg`

#### Images
- **Screenshots:** PNG (lossless quality)
- **Promotional:** WebP (modern browsers), PNG (fallback)
- **Animations:** GIF (compatibility), WebM (modern)

#### Stylesheets
- **Development:** Separate CSS files for maintainability
- **Production:** Concatenated and minified
- **CSS Variables:** Extensive use for theming
- **Preprocessor:** Consider SCSS for complex styling

### Accessibility Requirements

#### Visual Accessibility
- **Color Contrast:** Minimum 4.5:1 ratio for normal text
- **Focus Indicators:** Clear, visible focus states
- **Icon Alt Text:** Descriptive alternative text
- **Font Scaling:** Support for system font scaling

#### Interaction Accessibility
- **Keyboard Navigation:** Full keyboard support
- **Screen Readers:** ARIA labels and descriptions
- **Reduced Motion:** Respect prefers-reduced-motion
- **High Contrast:** Windows high contrast mode support

### Performance Optimization

#### Asset Loading
- **Lazy Loading:** Load assets as needed
- **Caching:** Browser caching for static assets
- **Compression:** Gzip/Brotli compression
- **CDN:** Consider CDN for external assets

#### Bundle Size
- **Icon Sprites:** Combine frequently used icons
- **CSS Optimization:** Remove unused styles
- **JavaScript:** Minification and tree shaking
- **Images:** Optimal compression without quality loss

## 📋 Asset Creation Priority Matrix

### Critical Priority (Pre-Launch)
- [ ] Extension marketplace icon (pdf-icon.png)
- [ ] Core command icons (13 commands)
- [ ] Basic PDF viewer CSS
- [ ] Loading and error state templates
- [ ] Primary marketplace screenshot

### High Priority (Launch Week)
- [ ] Complete toolbar icon set
- [ ] Enhanced PDF viewer styling
- [ ] Status indicator icons
- [ ] Responsive design CSS
- [ ] Additional marketplace screenshots

### Medium Priority (Post-Launch)
- [ ] Advanced animation assets
- [ ] Context menu icons
- [ ] Custom theme variants
- [ ] Feature demonstration GIFs
- [ ] Accessibility enhancements

### Low Priority (Future Releases)
- [ ] Custom illustration assets
- [ ] Video tutorial content
- [ ] Advanced branding materials
- [ ] Seasonal theme variants
- [ ] Promotional graphics

## 🎯 Quality Assurance Checklist

### Visual Quality
- [ ] Icons render clearly at all sizes
- [ ] Consistent visual style across components
- [ ] Proper theme integration (light/dark)
- [ ] High-DPI display optimization
- [ ] Cross-platform rendering consistency

### Functional Quality
- [ ] All assets load without errors
- [ ] CSS doesn't break VSCode theming
- [ ] JavaScript components work reliably
- [ ] Performance impact is minimal
- [ ] Accessibility standards met

### Brand Consistency
- [ ] Colors match brand guidelines
- [ ] Typography follows design system
- [ ] Icon style is consistent
- [ ] Marketing materials align with brand
- [ ] Professional appearance maintained

## 🚀 Implementation Timeline

### Week 1: Foundation
- Create directory structure
- Design and implement extension icon
- Develop core CSS framework
- Create basic command icons

### Week 2: Core Interface
- Complete PDF viewer styling
- Implement toolbar components
- Create status and feedback systems
- Develop responsive design

### Week 3: Enhancement
- Advanced icon set completion
- Animation and transition implementation
- Accessibility improvements
- Performance optimization

### Week 4: Polish & Launch
- Marketing asset creation
- Documentation finalization
- Quality assurance testing
- Marketplace preparation

---

**Document Status:** Comprehensive design framework established  
**Priority Level:** Critical for production readiness  
**Estimated Effort:** 3-4 weeks full implementation  
**Dependencies:** Design team, asset creation tools, brand guidelines