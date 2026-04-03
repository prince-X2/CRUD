# Vercel Deployment Guide

## Fix for 404 Error on Vercel

This guide explains how to fix the 404 error when deploying your Student Management System frontend on Vercel.

### Problem
When deploying a React SPA to Vercel, client-side routes like `/admin/dashboard` return 404 because Vercel treats them as physical file paths.

### Solution
Vercel automatically handles SPA routing for Vite projects. Follow these steps:

## Deployment Steps

### Option 1: Deploy Frontend Only (Recommended)

1. **Push code to GitHub** (Already done ✓)

2. **Create a new Vercel project:**
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository: `https://github.com/prince-X2/CRUD`

3. **Configure Vercel settings:**
   - **Framework Preset**: Vite
   - **Root Directory**: `student-management-system/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variables:**
   - In Vercel Project Settings → Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend-url.com/api`
     (Replace with your actual backend URL)

5. **Deploy**: Vercel will automatically deploy when you push to GitHub

### Option 2: Deploy Full Stack (Frontend + Backend)

If you want to deploy both frontend and backend on Vercel:

**Frontend:**
- Deploy as described above
- Set `VITE_API_BASE_URL` to point to your backend URL

**Backend:**
- Create a Vercel project for the backend
- Root Directory: `student-management-system/backend`
- Configure environment variables (.env)
- Deploy

### Vercel Configuration Files

The following files help Vercel build and deploy correctly:

**`vercel.json`** (in frontend directory):
```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "name": "student-management-frontend",
  "env": {
    "VITE_API_BASE_URL": "@vite_api_base_url"
  }
}
```

**`.env.example`** (in frontend directory):
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### SPA Routing Fix

The 404 error is fixed by:

1. **Vercel's automatic SPA support** - Vercel detects Vite and automatically routes all non-static requests to `index.html`

2. **Environment variable configuration** - The frontend API calls use the correct backend URL

3. **React Router** - Handles all client-side routing on the deployed app

### Testing After Deployment

1. **Check if site loads**: Visit your Vercel deployment URL
2. **Check if routing works**: Navigate to different pages (`/admin/dashboard`, `/student/dashboard`)
3. **Check if API works**: Try creating a student - should call your backend API

### Troubleshooting

**Still getting 404 after deployment?**

1. Check that `root` in `vercel.json` points to `student-management-system/frontend`
2. Verify build command is `npm run build`
3. Check that `package.json` exists in the frontend directory
4. Clear Vercel cache and redeploy

**API calls failing?**

1. Make sure `VITE_API_BASE_URL` environment variable is set
2. Verify your backend is deployed and accessible
3. Check CORS settings on your backend
4. Test backend URL directly in browser

**Build failing?**

1. Run `npm install` locally to ensure dependencies work
2. Run `npm run build` locally to test the build
3. Check build logs in Vercel dashboard for errors

### Environment Variables Needed

**Vercel Dashboard → Settings → Environment Variables:**

```
VITE_API_BASE_URL = https://your-backend-api.vercel.app/api
VITE_ENVIRONMENT = production
```

### Additional Notes

- Vercel's automatic framework detection works for Vite projects
- All SPA routes are automatically handled (no need for manual rewrite rules)
- The frontend will be deployed as static files after build
- You can view deployment logs in the Vercel dashboard

---

**Need help?** Check the Vercel documentation: https://vercel.com/docs/frameworks/vite
