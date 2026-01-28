# Docker Deployment Guide

Docker allows you to run your entire stack (app + database) in isolated containers. Perfect for development and production.

## Prerequisites

Install Docker Desktop:
- **Windows**: https://www.docker.com/products/docker-desktop
- **Mac**: https://www.docker.com/products/docker-desktop
- **Linux**: `sudo apt-get install docker.io docker-compose`

Verify installation:
```bash
docker --version
docker-compose --version
```

---

## Option A: Docker Compose (Development - Easiest)

### Quick Start

1. **Start Everything**
   ```bash
   docker-compose up --build
   ```

2. **That's it!** Your app is running at `http://localhost:3000`

The first time, it will:
- ✅ Build your app image
- ✅ Start MySQL container
- ✅ Start Node.js app container
- ✅ Connect them together
- ✅ Run your app

### Useful Commands

```bash
# Start in background
docker-compose up -d

# Stop everything
docker-compose down

# View logs
docker-compose logs -f app

# Run database migrations
docker-compose exec app npm run db:push

# Access MySQL shell
docker-compose exec mysql mysql -u kklogistics_user -p kklogistics_dev

# Rebuild everything
docker-compose down && docker-compose up --build
```

### File Structure

The `docker-compose.yml` creates:
- **mysql service**: MySQL 8.0 database
- **app service**: Your Node.js application
- **mysql_data volume**: Persists database between restarts

### Access

- **App**: http://localhost:3000
- **MySQL**: localhost:3306
  - User: `kklogistics_user`
  - Password: `userpassword`
  - Database: `kklogistics_dev`

### Database Persistence

Even if you stop/restart containers, your database data persists in the `mysql_data` volume.

To reset database:
```bash
docker-compose down -v
```

---

## Option B: Docker for Production

### Build Image

```bash
docker build -t kklogistics:latest .
```

This creates a production-ready image that:
- Installs dependencies
- Builds the app
- Sets up health checks
- Optimizes size (~500MB)

### Run with External Database

For production, you should use a managed database (Railway, AWS RDS, etc.), not a Docker container.

```bash
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="mysql://user:pass@db.example.com:3306/dbname" \
  -e NODE_ENV=production \
  --name kklogistics-prod \
  kklogistics:latest
```

Then visit: `http://localhost:3000`

---

## Option C: Docker Compose for Production

Use a separate `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    container_name: kklogistics-app
    environment:
      NODE_ENV: production
      DATABASE_URL: ${DATABASE_URL}
      PORT: 3000
    ports:
      - "3000:3000"
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

Run with:
```bash
DATABASE_URL="mysql://..." docker-compose -f docker-compose.prod.yml up -d
```

---

## Option D: Deploy Docker to Cloud

### Deploy to DigitalOcean App Platform

1. Push to GitHub with Dockerfile
2. Create DigitalOcean App Platform app
3. Select "Docker"
4. DigitalOcean auto-deploys
5. Cost: ~$12/month

### Deploy to AWS ECR + ECS

1. Push image to AWS ECR:
   ```bash
   aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789.dkr.ecr.us-east-1.amazonaws.com
   docker build -t kklogistics .
   docker tag kklogistics:latest 123456789.dkr.ecr.us-east-1.amazonaws.com/kklogistics:latest
   docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/kklogistics:latest
   ```

2. Create ECS cluster
3. Deploy container from ECR
4. Set environment variables
5. Cost: ~$15-30/month

### Deploy to Docker Hub

1. Create Docker Hub account: https://hub.docker.com

2. Login locally:
   ```bash
   docker login
   # Enter your Docker Hub credentials
   ```

3. Tag and push:
   ```bash
   docker build -t yourusername/kklogistics:latest .
   docker push yourusername/kklogistics:latest
   ```

4. Anyone can now run:
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="..." \
     yourusername/kklogistics:latest
   ```

---

## Docker for Local Development

### Advantages
- ✅ Same environment as production
- ✅ No "works on my machine" issues
- ✅ Easy to reset database
- ✅ Isolated from system dependencies

### Using docker-compose.yml

**Start development:**
```bash
docker-compose up
```

**Make code changes:**
- Code is live-reloaded (hot reload works)
- See changes immediately

**Run database migrations:**
```bash
docker-compose exec app npm run db:push
```

**Stop development:**
```bash
docker-compose down
```

**Reset everything (fresh start):**
```bash
docker-compose down -v
docker-compose up --build
```

---

## Dockerfile Explanation

```dockerfile
FROM node:20-alpine
# Start with Node.js 20 on Alpine Linux (small size)

WORKDIR /app
# Set working directory

COPY package.json pnpm-lock.yaml ./
# Copy dependency files

RUN npm install --legacy-peer-deps
# Install dependencies

COPY . .
# Copy application code

RUN npm run build
# Build the app

EXPOSE 3000
# Expose port 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "..."
# Health check: is the app healthy?

CMD ["npm", "start"]
# Default command to run
```

---

## Docker Compose Explained

```yaml
services:
  mysql:
    image: mysql:8.0
    # Use official MySQL image
    
    environment:
      MYSQL_ROOT_PASSWORD: ...
      MYSQL_DATABASE: kklogistics_dev
    # Set up database and credentials
    
    ports:
      - "3306:3306"
    # Map port 3306 on host to 3306 in container
    
    volumes:
      - mysql_data:/var/lib/mysql
    # Persist data in a volume
    
    healthcheck:
      # Check if MySQL is healthy before starting app

  app:
    build: .
    # Build using Dockerfile
    
    environment:
      DATABASE_URL: mysql://kklogistics_user:...@mysql:3306/...
    # Note: uses "mysql" hostname (Docker DNS)
    
    depends_on:
      mysql:
        condition: service_healthy
    # Wait for MySQL to be healthy first
    
    ports:
      - "3000:3000"
    # Map port 3000
    
    volumes:
      - .:/app
      - /app/node_modules
    # Mount source code for hot reload

volumes:
  mysql_data:
    # Named volume for database persistence
```

---

## Troubleshooting

### Container won't start

```bash
# Check logs
docker-compose logs app

# Or for a specific service
docker-compose logs mysql
```

### Port already in use

```bash
# Change port in docker-compose.yml
ports:
  - "3001:3000"  # Use 3001 instead of 3000
```

### Database connection refused

```bash
# Make sure MySQL service is healthy
docker-compose logs mysql

# Check it's running
docker-compose ps

# Reset and try again
docker-compose down -v
docker-compose up --build
```

### Out of disk space

```bash
# Clean up unused Docker resources
docker system prune -a

# Remove volumes too
docker system prune -a --volumes
```

---

## Production Best Practices

1. **Use specific Node.js version**
   ```dockerfile
   FROM node:20.11.0-alpine
   ```

2. **Don't run as root**
   ```dockerfile
   RUN useradd -m appuser
   USER appuser
   ```

3. **Use .dockerignore**
   ```
   node_modules
   npm-debug.log
   .env.local
   .git
   dist
   ```

4. **Multi-stage builds** (for smaller images)
   ```dockerfile
   FROM node:20-alpine AS builder
   WORKDIR /app
   COPY package.json .
   RUN npm install
   
   FROM node:20-alpine
   COPY --from=builder /app/node_modules ./node_modules
   ```

5. **Health checks**
   ```dockerfile
   HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
     CMD node -e "require('http').get('http://localhost:3000')"
   ```

---

## Summary

**For Local Development:**
```bash
docker-compose up
```

**For Production:**
```bash
docker build -t kklogistics:latest .
docker run -p 3000:3000 -e DATABASE_URL="..." kklogistics:latest
```

**For Cloud Deployment:**
- Use managed platforms (Railway, DigitalOcean)
- Or push to Docker registries (Docker Hub, AWS ECR)

**Cost:**
- Free with most platforms
- Or ~$5-15/month for hosting

---

Need help with Docker? Let me know!
