# Docker Build Environment

This document provides instructions for using Docker to build and develop the Darbot PDF Viewer MCP extension in a containerized environment with all necessary native dependencies.

## Why Docker?

The extension requires native dependencies for `canvas` and `sharp` packages:
- **pkg-config**: Package configuration tool
- **pixman-1**: Low-level pixel manipulation library
- **libcairo2**: 2D graphics library
- **libpango**: Text layout and rendering
- **libjpeg, libgif, libpng**: Image codec libraries

Docker provides a consistent build environment across all platforms (Windows, macOS, Linux) without manual dependency installation.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

## Quick Start

### Development Environment

Run the development environment with live compilation:

```bash
docker-compose up dev
```

This will:
- Build the Docker image with all dependencies
- Mount your source code for live development
- Run TypeScript in watch mode
- Automatically recompile on file changes

### Building the Extension

Build and compile the extension:

```bash
docker-compose run build
```

This will:
- Install all dependencies
- Compile TypeScript
- Run linting
- Execute validation tests

### Creating VSIX Package

Create a production-ready VSIX package:

```bash
docker-compose run package
```

The `.vsix` file will be created in the project root directory.

## Docker Commands

### Building the Docker Image

Build the image manually:

```bash
docker build -t darbot-pdf-viewer-mcp:latest .
```

### Running Tests in Docker

```bash
docker-compose run build npm run test:validation
```

### Interactive Shell

Access the container with an interactive shell:

```bash
docker-compose run dev /bin/bash
```

Then you can run commands manually:

```bash
npm install
npm run compile
npm run lint
npm test
```

### Cleaning Up

Remove containers and images:

```bash
# Stop all containers
docker-compose down

# Remove all containers and volumes
docker-compose down -v

# Remove the image
docker rmi darbot-pdf-viewer-mcp:dev
docker rmi darbot-pdf-viewer-mcp:build
docker rmi darbot-pdf-viewer-mcp:package
```

## CI/CD Integration

### GitHub Actions

Example GitHub Actions workflow using Docker:

```yaml
name: Docker Build

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v4
    
    - name: Build Docker image
      run: docker build -t darbot-pdf-viewer-mcp:ci .
    
    - name: Run tests in Docker
      run: docker run darbot-pdf-viewer-mcp:ci npm run test:validation
    
    - name: Create VSIX package
      run: |
        docker run -v $PWD:/output darbot-pdf-viewer-mcp:ci \
          sh -c "npm install -g @vscode/vsce && vsce package && cp *.vsix /output/"
    
    - name: Upload VSIX artifact
      uses: actions/upload-artifact@v4
      with:
        name: vsix-package
        path: '*.vsix'
```

### GitLab CI

Example `.gitlab-ci.yml`:

```yaml
image: docker:latest

services:
  - docker:dind

stages:
  - build
  - test
  - package

build:
  stage: build
  script:
    - docker build -t darbot-pdf-viewer-mcp:$CI_COMMIT_SHA .

test:
  stage: test
  script:
    - docker run darbot-pdf-viewer-mcp:$CI_COMMIT_SHA npm run test:validation

package:
  stage: package
  script:
    - docker run -v $PWD:/output darbot-pdf-viewer-mcp:$CI_COMMIT_SHA 
        sh -c "npm install -g @vscode/vsce && vsce package && cp *.vsix /output/"
  artifacts:
    paths:
      - '*.vsix'
```

## Troubleshooting

### Permission Issues

If you encounter permission issues with mounted volumes:

```bash
# Run with your user ID
docker-compose run --user $(id -u):$(id -g) dev
```

### Node Modules

If you have issues with node_modules:

```bash
# Remove local node_modules
rm -rf node_modules

# Rebuild with Docker
docker-compose build --no-cache dev
```

### Canvas/Sharp Build Failures

The Docker image includes all necessary native dependencies. If you still encounter issues:

1. Rebuild the image without cache:
   ```bash
   docker-compose build --no-cache
   ```

2. Verify system dependencies are installed in the container:
   ```bash
   docker-compose run dev apt list --installed | grep -E '(pixman|cairo|pango|jpeg|png|gif)'
   ```

### Disk Space

Docker images and containers can consume disk space. Clean up regularly:

```bash
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove everything (careful!)
docker system prune -a
```

## Development Workflow

### Recommended Workflow

1. **Start development environment**:
   ```bash
   docker-compose up dev
   ```

2. **Make changes** to your code in `src/`

3. **Watch compilation** happen automatically in the Docker container

4. **Run tests** in a separate terminal:
   ```bash
   docker-compose run build npm test
   ```

5. **Create package** when ready:
   ```bash
   docker-compose run package
   ```

### IDE Integration

#### VS Code

You can use VS Code's Remote-Containers extension to develop inside the container:

1. Install the "Remote - Containers" extension
2. Open the project in VS Code
3. Press `F1` and select "Remote-Containers: Reopen in Container"
4. VS Code will use the Dockerfile to create a development container

#### JetBrains IDEs

Configure Docker as a remote interpreter:

1. Go to Settings → Project → Python Interpreter (or Node.js interpreter)
2. Add a new interpreter
3. Select Docker and choose your Dockerfile
4. Apply and reload the project

## Performance Tips

### Volume Performance

For better performance on macOS and Windows:

1. Use Docker Desktop with VirtioFS (default in recent versions)
2. Consider using `:cached` or `:delegated` volume options:
   ```yaml
   volumes:
     - ./src:/workspace/src:cached
   ```

### Build Cache

Use BuildKit for faster builds:

```bash
DOCKER_BUILDKIT=1 docker build -t darbot-pdf-viewer-mcp:latest .
```

Or enable it globally in Docker Desktop settings.

## Security Considerations

### Running as Non-Root

For production use, consider running as a non-root user:

```dockerfile
# Add to Dockerfile
RUN useradd -m -u 1000 vscode
USER vscode
```

### Scanning for Vulnerabilities

Scan the Docker image for vulnerabilities:

```bash
# Using Docker Scout (built into Docker Desktop)
docker scout cves darbot-pdf-viewer-mcp:latest

# Using Trivy
docker run aquasec/trivy image darbot-pdf-viewer-mcp:latest
```

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [VS Code Remote Containers](https://code.visualstudio.com/docs/remote/containers)
- [Node.js Docker Best Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)

## Support

For issues related to Docker setup:
- Check the [Troubleshooting](#troubleshooting) section
- Search existing [GitHub Issues](https://github.com/darbotlabs/Darbot-PDF-Viewer-MCP/issues)
- Create a new issue with the `docker` label
