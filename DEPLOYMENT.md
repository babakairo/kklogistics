# KK Logistics - Deployment Guide

## Quick Overview
Your application has:
- **Frontend**: React + Vite (builds to static files)
- **Backend**: Node.js + Express + tRPC (REST API)
- **Database**: MySQL with Drizzle ORM
- **Build Output**: `dist/` folder (contains both frontend & backend)

---

## Option 1: Deploy to Vercel (Easiest)

### Limitations
- ⚠️ Vercel doesn't support persistent Node.js servers on free tier
- ⚠️ Would need to use Vercel Edge Functions or serverless
- ❌ **Not recommended** for this architecture

---

## Option 2: Deploy to Railway.app (Recommended - Easiest)

Railway is perfect for full-stack apps. They handle deployment automatically.

### Setup Steps:

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Connect Your GitHub Repository**
   - Link this project to GitHub
   - Railway auto-detects Node.js + MySQL setup

3. **Add MySQL Database**
   - In Railway dashboard, click "New Service"
   - Select "MySQL"
   - Railway generates `DATABASE_URL` automatically

4. **Configure Environment Variables**
   ```
   DATABASE_URL=mysql://user:pass@host:port/dbname
   NODE_ENV=production
   PORT=8080
   ```

5. **Deploy**
   - Push to GitHub main branch
   - Railway auto-builds and deploys
   - Your app runs at: `https://your-app.railway.app`

### Cost
- MySQL: ~$7/month
- Node.js: ~$10/month
- **Total: ~$17/month**

---

## Option 3: Deploy to DigitalOcean App Platform

### Setup Steps:

1. **Create DigitalOcean Account**
   - Go to https://www.digitalocean.com

2. **Create App from GitHub**
   - Click "Create" → "App Platform"
   - Connect your GitHub repo
   - Select your branch

3. **Configure Build & Run**
   - **Build Command**: `npm install --legacy-peer-deps && npm run build`
   - **Run Command**: `npm start`
   - **HTTP Port**: `3000`

4. **Add MySQL Database**
   - Within the app, add a Database component
   - Select MySQL
   - DigitalOcean auto-provisions it

5. **Set Environment Variables**
   - Add `DATABASE_URL` (DigitalOcean provides this)
   - Add `NODE_ENV=production`

6. **Deploy**
   - Click "Create App"
   - DigitalOcean deploys automatically

### Cost
- App Platform: ~$12/month
- MySQL: ~$15/month
- **Total: ~$27/month**

---

## Option 4: Deploy to AWS (Most Scalable)

### Services Needed:
1. **EC2** - Virtual server to run Node.js
2. **RDS MySQL** - Managed database
3. **S3** - For file uploads (if needed)

### Setup Steps (Complex):

1. **Create AWS Account** - https://aws.amazon.com

2. **Create RDS MySQL Database**
   ```
   - Engine: MySQL 8.0
   - Instance: db.t3.micro (free tier)
   - Storage: 20GB
   - Get connection string
   ```

3. **Create EC2 Instance**
   ```
   - AMI: Ubuntu 22.04 LTS
   - Instance: t3.micro (free tier)
   - Security Group: Allow port 80, 443
   ```

4. **SSH into EC2 and Install**
   ```bash
   sudo apt update
   sudo apt install nodejs npm git
   git clone https://github.com/yourusername/kklogistics.git
   cd kklogistics
   npm install --legacy-peer-deps
   npm run build
   ```

5. **Set Environment Variables**
   ```bash
   export DATABASE_URL="mysql://user:pass@rds-endpoint:3306/dbname"
   export NODE_ENV=production
   ```

6. **Run Application**
   ```bash
   npm start
   ```

7. **Setup Reverse Proxy (Nginx)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Cost
- EC2 t3.micro: Free (first 12 months)
- RDS MySQL db.t3.micro: Free (first 12 months)
- After free tier: ~$15-20/month

---

## Option 5: Deploy Using Docker (Most Flexible)

### Create Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install --legacy-peer-deps

# Copy source
COPY . .

# Build
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
```

### Run Locally with Docker
```bash
docker build -t kklogistics .
docker run -p 3000:3000 \
  -e DATABASE_URL="mysql://user:pass@host:3306/db" \
  -e NODE_ENV=production \
  kklogistics
```

### Deploy to Any Hosting
- Docker Hub
- AWS ECR
- DigitalOcean Container Registry
- Any Docker-compatible platform

---

## Setup Local Development with MySQL

### Install MySQL Locally
```bash
# Windows (using Chocolatey)
choco install mysql

# Or use Docker
docker run -d -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=password \
  -e MYSQL_DATABASE=kklogistics_dev \
  mysql:8.0
```

### Create .env.local
```
DATABASE_URL=mysql://root:password@localhost:3306/kklogistics_dev
NODE_ENV=development
```

### Run Migrations
```bash
npm run db:push
```

### Start Development Server
```bash
npm run dev
```

---

## Production Deployment Checklist

### Before Deploying:

- [ ] Database backups configured
- [ ] All environment variables set
- [ ] HTTPS/SSL certificate configured
- [ ] Error monitoring setup (Sentry, Rollbar)
- [ ] Logging configured (Winston, Pino)
- [ ] Rate limiting enabled
- [ ] CORS configured properly
- [ ] Security headers set (Helmet middleware)
- [ ] Database migrations tested

### Deployment Checklist:

- [ ] Build passes: `npm run build`
- [ ] Tests pass: `npm test`
- [ ] No console errors
- [ ] Environment variables correct
- [ ] Database connection verified
- [ ] Static files served correctly
- [ ] API endpoints responding

### Post-Deployment:

- [ ] Test all features
- [ ] Check error logs
- [ ] Verify database connection
- [ ] Test OAuth flows
- [ ] Monitor performance
- [ ] Set up automated backups

---

## Recommended Setup for You

**Start with: Railway.app**
1. Fastest to deploy
2. Cheapest (~$17/month)
3. Auto-scaling included
4. Perfect for startups

**Later migrate to:**
- DigitalOcean (if needing more control)
- AWS (if scaling significantly)

---

## Environment Variables Reference

```
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Server
NODE_ENV=production
PORT=3000

# OAuth (if using)
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

# AWS S3 (if using)
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
S3_BUCKET_NAME=xxx

# Manus (if using)
VITE_ANALYTICS_ENDPOINT=https://...
VITE_ANALYTICS_WEBSITE_ID=xxx
```

---

## Database Backup Strategy

### Railway.app
- Automatic daily backups included

### DigitalOcean
- Configure automated backups in RDS settings
- Keep 7-14 days of backups

### AWS
- Use AWS Backup service
- Set retention policy

### Manual Backups
```bash
# Export database
mysqldump -u user -p database > backup.sql

# Import database
mysql -u user -p database < backup.sql
```

---

## Monitoring & Debugging

### Logs
```bash
# Railway
railway logs

# DigitalOcean
# Check app platform logs in dashboard

# Local
npm run dev  # See all logs in terminal
```

### Performance
- Monitor database query times
- Check API response times
- Monitor memory usage
- Track error rates

### Tools
- Datadog
- New Relic
- Sentry (error tracking)
- Grafana (monitoring)

---

Need help with any specific option? Let me know!
