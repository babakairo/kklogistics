# Railway.app Deployment Guide (Step-by-Step)

Railway is the **easiest** way to deploy this full-stack app. Complete setup in 10 minutes!

## Prerequisites
- GitHub account with your project pushed
- Railway account (free to start)

## Step-by-Step Instructions

### Step 1: Push Your Project to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/kklogistics.git
git branch -M main
git push -u origin main
```

Or if already on GitHub, just make sure everything is pushed.

---

### Step 2: Create Railway Account

1. Go to https://railway.app
2. Click "Start Free"
3. Sign up with GitHub
4. Authorize Railway to access your repositories

---

### Step 3: Create New Project from GitHub

1. In Railway dashboard, click "New Project"
2. Select "GitHub Repo"
3. Search for "kklogistics" (your repo name)
4. Click to import it
5. Railway auto-detects it's a Node.js project ✅

---

### Step 4: Add MySQL Database

1. In your Railway project, click "Add Service"
2. Click "Add from Marketplace"
3. Search for "MySQL"
4. Click "MySQL"
5. Railway automatically:
   - Installs MySQL
   - Creates a database
   - Generates DATABASE_URL ✅

---

### Step 5: Configure Environment Variables

1. Click on your Node.js service
2. Go to "Variables" tab
3. Railway auto-populated `DATABASE_URL` ✅
4. Add these additional variables:

```
NODE_ENV=production
PORT=8080
```

Optional (if using OAuth):
```
GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret
```

---

### Step 6: Configure Build & Start Commands

1. Click your Node.js service
2. Go to "Deploy" tab
3. Set these build/start commands:

**Build Command:**
```
npm install --legacy-peer-deps && npm run build
```

**Start Command:**
```
npm start
```

4. Click "Save"

---

### Step 7: Deploy!

1. Click "Deploy" button
2. Railway automatically:
   - Installs dependencies
   - Runs build: `npm run build`
   - Starts server: `npm start`
   - Assigns a public URL ✅

3. Wait 2-3 minutes for deployment
4. Your app is live! 🎉

---

## After Deployment

### Get Your App URL

1. Click your Node.js service
2. Look for "Service Domains"
3. Your app is at: `https://kklogistics-production.up.railway.app` (example)

### Run Database Migrations

First time only, you need to migrate your database:

```bash
# In Railway terminal/logs, you should see the app running
# You need to run migrations one time

# Option 1: Through Railway CLI
railway run npm run db:push

# Option 2: Through Railway Shell
# Click "Shell" tab and run:
npm run db:push
```

---

## Testing Your Deployment

1. Visit your app URL in browser
2. Test main features:
   - Frontend loads ✅
   - Can navigate pages ✅
   - API calls work (check browser Network tab) ✅
   - Database saves data ✅

---

## Monitoring & Logs

### View Real-time Logs

In Railway dashboard:
1. Click your Node.js service
2. Click "Logs" tab
3. See all server output in real-time

### Monitor Performance

1. Click your Node.js service
2. Click "Metrics" tab
3. See CPU, memory, network usage

---

## Common Issues & Fixes

### Issue: Build fails with "npm ERR!"

**Fix:** Railway might need more memory. This is rare.

```
Try rebuilding by clicking "Redeploy" button
```

### Issue: App crashes after deployment

**Check logs:**
1. Click "Logs" tab
2. Look for error messages
3. Usually: missing environment variable or database connection

**Fix:**
```
1. Click your service
2. Go to "Variables"
3. Make sure DATABASE_URL is set
4. Click "Redeploy"
```

### Issue: Database connection timeout

**Likely causes:**
- DATABASE_URL not set
- MySQL service not running

**Fix:**
```
1. Delete MySQL service
2. Add new MySQL service
3. Copy new DATABASE_URL
4. Update Node.js service variables
5. Redeploy
```

### Issue: "Port already in use"

**Fix:** Railway handles this automatically. Make sure start command is:
```
npm start
```

Not:
```
npm run dev
```

---

## Making Updates

Every time you push to GitHub:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Railway automatically:
1. Detects the push
2. Rebuilds your app
3. Deploys new version
4. Zero downtime ✅

---

## Scaling (When You Get Popular!)

As your app grows:

1. **Memory/CPU:** Railway auto-scales, no config needed
2. **Database:** Click MySQL service → increase plan ($7 → $15)
3. **Backups:** Railway includes automatic daily backups

---

## Cost Breakdown

- **Node.js service:** $7/month (pay-as-you-go, $5 free credits)
- **MySQL:** $7/month
- **Total:** ~$14/month (after free credits)

No credit card required for free tier!

---

## Next Steps (After Deployment)

1. ✅ Set up custom domain (optional)
   - Railway → Project Settings → Custom Domains
   - Add your domain: www.kklogistics.com

2. ✅ Set up backups
   - Automatic daily backups included!

3. ✅ Monitor errors
   - Add Sentry for error tracking: https://sentry.io

4. ✅ Set up analytics
   - Configure VITE_ANALYTICS_ENDPOINT in variables

---

## Support

If you get stuck:
1. Check Railway logs (Logs tab)
2. Check browser console (F12)
3. Railway docs: https://docs.railway.app
4. Ask in Railway Discord: https://discord.gg/railway

---

## Summary

**Your app will be live at:**
```
https://kklogistics-production.up.railway.app
```

**In ~10 minutes with:**
- ✅ Automatic deployments from GitHub
- ✅ MySQL database
- ✅ Zero-downtime updates
- ✅ Automatic backups
- ✅ $14/month cost

**That's it! You're deployed! 🎉**
