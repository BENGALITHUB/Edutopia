# Edutopia Kolkata — CI/CD & Cloud Deployment Guide

This project is a high-performance, frontend-only static web application built with **React, Vite, Tailwind CSS v4, and Framer Motion**. Because it produces purely static, pre-rendered assets (`index.html`, hashed `.js`, `.css`, and optimized `.webp` images), it can be deployed with extreme speed, zero backend maintenance, and 100% uptime.

---

## 1. Hosting Architecture Comparison

| Platform | Recommended Use Case | Setup Complexity | Custom Domain & Free SSL | Monthly Cost |
| :--- | :--- | :--- | :--- | :--- |
| **GitHub Pages** | **Instant Hosting** (zero new accounts) | ★☆☆☆☆ (2 clicks) | ✅ Yes (Free Let's Encrypt) | **$0** (Free) |
| **Vercel** | **Fastest Developer Experience** (PR Previews, Global Edge CDN) | ★☆☆☆☆ (1-click GitHub import) | ✅ Yes (Automated SSL) | **$0** (Hobby) |
| **Netlify** | **Alternative Edge Cloud** (Form handling, Branch deploys) | ★☆☆☆☆ (1-click GitHub import) | ✅ Yes (Automated SSL) | **$0** (Starter) |
| **AWS (S3 + CloudFront)** | **Enterprise Production** (Lowest unit bandwidth costs, full cloud integration) | ★★★☆☆ (Requires AWS Console IAM + S3) | ✅ Yes (AWS Certificate Manager) | Pay-as-you-go (~$0.50/mo) |

---

## 2. Included CI/CD Configurations in this Repository

| File Path | Purpose |
| :--- | :--- |
| **[`.github/workflows/ci.yml`](file:///.github/workflows/ci.yml)** | Automated Quality Gate: runs typechecking and builds on every push/PR. |
| **[`.github/workflows/deploy-github-pages.yml`](file:///.github/workflows/deploy-github-pages.yml)** | Automated CD pipeline: builds and publishes directly to **GitHub Pages**. |
| **[`.github/workflows/deploy-aws.yml`](file:///.github/workflows/deploy-aws.yml)** | Automated Cloud pipeline: syncs production build to **AWS S3** and invalidates **CloudFront**. |
| **[`vercel.json`](file:///vercel.json)** | Pre-configured for **Vercel**: SPA routing fallbacks, asset caching, and security headers. |
| **[`netlify.toml`](file:///netlify.toml)** | Pre-configured for **Netlify**: redirects, Node 20 runtime, and security policies. |
| **[`.gitignore`](file:///.gitignore)** | Prevents `node_modules/`, `dist/`, and local caches from accidentally being committed. |

---

## 3. Initializing Git & Pushing to GitHub

Run these commands in your PowerShell terminal inside `E:\TUTOPIA LANDING`:

```powershell
# 1. Initialize git
git init -b main

# 2. Stage all project files (node_modules is excluded by .gitignore)
git add .

# 3. Create initial commit
git commit -m "feat: complete Edutopia redesign, responsive layouts, and CI/CD pipelines"

# 4. Link your GitHub repository (replace with your actual GitHub repo URL)
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git

# 5. Push to GitHub
git push -u origin main
```

---

## 4. Option A: Instant Free Hosting on GitHub Pages

1. Push your code to GitHub (as shown above).
2. Go to your GitHub repository in your browser:
   - Click **Settings** (top tab) → **Pages** (left sidebar).
   - Under **Build and deployment** → **Source**, select **`GitHub Actions`**.
3. That's it! The workflow **`deploy-github-pages.yml`** will trigger automatically on every push to `main`.
4. Your site will be live at:  
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

## 5. Option B: Cloud Hosting on Vercel

1. Log in to [Vercel](https://vercel.com) using your GitHub account.
2. Click **Add New...** → **Project**.
3. Import your GitHub repository.
4. Vercel will automatically detect **Vite** and read our included [`vercel.json`](file:///vercel.json).
5. Click **Deploy**.
6. **Custom Domain**: Under Project Settings → Domains, add your domain (e.g., `edutopiakolkata.in`). Vercel automatically generates and renews your SSL certificate.

---

## 6. Option C: Cloud Hosting on Netlify

1. Log in to [Netlify](https://www.netlify.com).
2. Click **Add new site** → **Import an existing project** → **GitHub**.
3. Select your repository.
4. Netlify will automatically detect our pre-configured [`netlify.toml`](file:///netlify.toml).
5. Click **Deploy site**.

---

## 7. Option D: Cloud Hosting on AWS (S3 + CloudFront)

For high-volume enterprise traffic on Amazon Web Services:

### Step 1: AWS Setup
1. **S3 Bucket**: Create an S3 bucket (e.g. `edutopia-production-static`).
2. **CloudFront**: Create a CloudFront distribution pointing to the S3 bucket:
   - Enable Origin Access Control (OAC).
   - Set Default Root Object to `index.html`.
   - Add a Custom Error Response: HTTP Error Code `403` and `404` → Response Page Path `/index.html`, HTTP Response Code `200` (for SPA client-side routing).
   - Attach your custom domain with an ACM SSL certificate.

### Step 2: GitHub Secrets
In your GitHub repo, go to **Settings** → **Secrets and variables** → **Actions** and add:
- `AWS_ACCESS_KEY_ID`: Your IAM user access key (with S3 and CloudFront permissions).
- `AWS_SECRET_ACCESS_KEY`: Your IAM user secret key.
- `AWS_REGION`: e.g. `ap-south-1` (Mumbai).
- `AWS_S3_BUCKET`: Your bucket name.
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`: Your CloudFront distribution ID (e.g. `E1A2B3C4D5E6F7`).

### Step 3: Triggering Deploy
Run the workflow from GitHub Actions: **Actions** tab → **Deploy to AWS (S3 + CloudFront)** → **Run workflow**.
