# Darbot PDF Viewer MCP - Docker Build Environment
# This Dockerfile provides a consistent build environment across platforms
# with all necessary native dependencies for canvas and sharp packages

FROM node:20-bullseye

# Set working directory
WORKDIR /workspace

# Install system dependencies for canvas and sharp
# pkg-config: Package config tool for native libraries
# libpixman-1-dev: Low-level pixel manipulation library
# libcairo2-dev: 2D graphics library
# libpango1.0-dev: Layout and rendering of text
# libjpeg-dev: JPEG image codec library
# libgif-dev: GIF image format library
# librsvg2-dev: SVG rendering library
# libpng-dev: PNG reference library
RUN apt-get update && apt-get install -y \
    pkg-config \
    libpixman-1-dev \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libpng-dev \
    build-essential \
    python3 \
    python3-pip \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install global tools for build (these are available globally)
RUN npm install -g typescript eslint @vscode/vsce

# Copy project files
COPY . .

# Install dependencies
# Note: npm may show an "Exit handler never called" error, but this is a known npm timing issue
# that doesn't prevent successful installation. We verify installation with subsequent check.
RUN npm install

# Verify critical dependencies are installed
RUN test -d node_modules && \
    test -f node_modules/typescript/package.json && \
    test -f node_modules/sharp/package.json && \
    test -f node_modules/canvas/package.json && \
    echo "All dependencies installed successfully"

# Expose any ports if needed (for future dev server)
EXPOSE 3000

# Default command runs compile, lint, and test
CMD ["sh", "-c", "npm run compile && npm run lint && npm run test:validation"]
