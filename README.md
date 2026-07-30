# CivilStepIndia — Setup Guide

Follow these steps in order. Takes about 20-25 minutes.

## Part 1: Create your free database (Supabase)

1. Go to **supabase.com** → Sign up (use the same email as GitHub/Vercel)
2. Click **"New Project"**
   - Name: `civilstepindia`
   - Set any database password (save it somewhere safe)
   - Choose the region closest to India (e.g., Mumbai/Singapore)
   - Click **Create new project** (takes ~2 minutes to set up)
3. Once ready, go to **SQL Editor** (left sidebar) → **New query**
4. Open the file `supabase_setup.sql` from this project, copy everything in it, paste into the SQL editor, click **Run**
   - This creates the table that stores test scores
5. Go to **Project Settings** (gear icon) → **API**
   - Copy the **Project URL** — you'll need this
   - Copy the **anon public key** — you'll need this too

## Part 2: Upload this code to GitHub

1. Go to **github.com** → click the **+** icon (top right) → **New repository**
2. Name it `civilstepindia` → keep it **Public** → click **Create repository**
3. On the next page, click **"uploading an existing file"**
4. Drag and drop ALL the files/folders from this project into the upload box
5. Scroll down, click **Commit changes**

## Part 3: Deploy on Vercel

1. Go back to **vercel.com** → click **Add New** → **Project**
2. Click **Import** next to your `civilstepindia` GitHub repository
   (If you don't see it, click "Adjust GitHub App Permissions" and allow access)
3. Before clicking Deploy, expand **Environment Variables** and add:
   - Name: `NEXT_PUBLIC_SUPABASE_URL` → Value: (paste the Project URL from Part 1)
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY` → Value: (paste the anon public key from Part 1)
4. Click **Deploy**
5. Wait 1-2 minutes — your site goes live at a link like `civilstepindia.vercel.app`

## Part 4: Test it

1. Open your live link
2. Sign up with an email + password
3. Check your email for a confirmation link from Supabase, click it
4. Log in, try the mock test, check the analysis page

## Adding more questions later

Open `lib/data.js` — add new entries to the `QUESTIONS` array or `STUDY_NOTES` object following the same format. Push the change to GitHub, and Vercel will automatically redeploy.

## If something doesn't work

- Blank page / errors: double-check the two environment variable values in Vercel are copied exactly, no extra spaces
- Can't log in: check your email (including spam) for the Supabase confirmation link
- Still stuck: come back to this conversation and describe exactly what you see
