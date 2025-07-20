# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build the app
RUN npm run build

# Install serve for static file serving
RUN npm install -g serve

# Production stage - using the same Node image instead of nginx
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install serve for static file serving
RUN npm install -g serve

# Copy built files from build stage
COPY --from=build /app/build /app/build

# Create a simple proxy configuration for API requests
RUN echo '{"rewrites": [{"source": "/api/:path*", "destination": "http://backend:8082/:path*"}]}' > /app/serve.json

# Expose port 3000 (default for serve)
EXPOSE 3000

# Start serve with the proxy configuration
CMD ["serve", "-s", "build", "-l", "3000"]
