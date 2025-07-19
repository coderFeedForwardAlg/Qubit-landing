# Qubit Landing Page - Docker Setup

This project has been containerized using Docker and Docker Compose for easy deployment and development.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

### Production Build

To run the application in production mode:

```bash
docker-compose up --build
```

This will:
- Build the production Docker image
- Start the application on http://localhost:3000
- Enable health checks
- Restart automatically unless stopped

### Development Mode

To run the application in development mode with hot reload:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

This will:
- Build the development Docker image
- Start the development server with hot reload
- Mount the current directory for live code changes
- Run on http://localhost:3000

## Available Commands

### Production
```bash
# Build and start the production container
docker-compose up --build

# Start in detached mode (background)
docker-compose up -d

# Stop the application
docker-compose down

# View logs
docker-compose logs -f
```

### Development
```bash
# Build and start the development container
docker-compose -f docker-compose.dev.yml up --build

# Start in detached mode
docker-compose -f docker-compose.dev.yml up -d

# Stop the development environment
docker-compose -f docker-compose.dev.yml down
```

## Docker Images

### Production Image
- Multi-stage build for optimized size
- Uses Next.js standalone output
- Runs as non-root user for security
- Includes health checks

### Development Image
- Single-stage build for faster rebuilds
- Includes all dev dependencies
- Supports hot reload
- Volume mounts for live code changes

## Environment Configuration

You can customize the application by creating a `.env` file in the project root:

```env
NODE_ENV=production
PORT=3000
NEXT_TELEMETRY_DISABLED=1
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the port mapping in docker-compose.yml
2. **Build failures**: Make sure Docker has enough memory allocated
3. **Permission issues**: Ensure Docker daemon is running with proper permissions

### Rebuilding

To force a complete rebuild:

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up
```

## Architecture

- **Base Image**: node:18-alpine
- **Package Manager**: pnpm
- **Build Tool**: Next.js
- **Port**: 3000
- **Health Check**: HTTP GET to /

## Security Features

- Runs as non-root user (nextjs:nodejs)
- Minimal Alpine Linux base
- Production dependencies only in final image
- Security headers enabled in Next.js config
