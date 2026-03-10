# Matt & Anna — Wedding Seating Chart 🌿

An interactive drag-and-drop seating chart for your wedding reception.

---

## How to Deploy This as a Free Website

### What You'll Need
- A computer with internet access
- About 15 minutes

---

### OPTION A: Easiest — Vercel (Recommended)

Vercel gives you a free website with a URL like `matt-anna-seating.vercel.app`.

#### Step 1: Install Node.js
1. Go to https://nodejs.org
2. Download the **LTS** version (the big green button)
3. Run the installer, click Next through everything

#### Step 2: Set Up the Project
1. Download this entire `wedding-seating` folder to your computer
2. Open **Terminal** (Mac) or **Command Prompt** (Windows)
3. Navigate to the folder:
   ```
   cd path/to/wedding-seating
   ```
4. Install dependencies:
   ```
   npm install
   ```
5. (Optional) Test it locally:
   ```
   npm run dev
   ```
   Then open http://localhost:5173 in your browser to see it running.

#### Step 3: Push to GitHub
1. Go to https://github.com and create a free account (or log in)
2. Click the **+** button in the top right → **New repository**
3. Name it `wedding-seating`, keep it Public or Private, click **Create repository**
4. Back in your terminal, run these commands:
   ```
   git init
   git add .
   git commit -m "Wedding seating chart"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/wedding-seating.git
   git push -u origin main
   ```
   (Replace YOUR_USERNAME with your GitHub username)

#### Step 4: Deploy on Vercel
1. Go to https://vercel.com and sign up with your GitHub account
2. Click **"Add New Project"**
3. It will show your GitHub repos — select **wedding-seating**
4. Vercel auto-detects it's a Vite/React project. Just click **Deploy**
5. Wait ~60 seconds. Done! You'll get a live URL like:
   ```
   https://wedding-seating-abc123.vercel.app
   ```

#### Step 5 (Optional): Custom Domain
1. Buy a domain (e.g., `mattandannawedding.com`) from Namecheap (~$9/year) or Cloudflare (~$9/year)
2. In Vercel, go to your project → **Settings** → **Domains**
3. Add your domain and follow the DNS instructions they give you

---

### OPTION B: Even Simpler — Netlify Drop

No terminal or GitHub needed at all.

#### Step 1: Build the Project
1. Install Node.js (see above)
2. Open Terminal/Command Prompt, navigate to the folder:
   ```
   cd path/to/wedding-seating
   npm install
   npm run build
   ```
3. This creates a `dist` folder with your built website

#### Step 2: Deploy
1. Go to https://app.netlify.com/drop
2. Drag the entire `dist` folder onto the page
3. Done! You get a URL like `random-name-123.netlify.app`
4. Click **Site settings** to rename it to something like `matt-anna-seating.netlify.app`

---

### OPTION C: GitHub Pages (100% Free, No Account Needed Beyond GitHub)

#### Step 1: Same as Option A Steps 1-3

#### Step 2: Add GitHub Pages Config
1. In `vite.config.js`, change it to:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: '/wedding-seating/',
   })
   ```
2. Run:
   ```
   npm run build
   ```
3. Push the changes to GitHub

#### Step 3: Enable GitHub Pages
1. Go to your repo on GitHub
2. **Settings** → **Pages**
3. Under "Source", select **GitHub Actions**
4. It will suggest a workflow — use the static HTML one
5. Your site will be live at: `https://YOUR_USERNAME.github.io/wedding-seating/`

---

## Making Changes Later

Whenever you want to update the seating chart:

1. Edit `src/App.jsx` on your computer
2. If using Vercel/GitHub: push to GitHub and it auto-deploys in ~60 seconds
3. If using Netlify Drop: run `npm run build` and re-drag the `dist` folder

---

## Project Structure

```
wedding-seating/
├── index.html          ← Main HTML page
├── package.json        ← Project config & dependencies
├── vite.config.js      ← Build tool config
├── src/
│   ├── main.jsx        ← Entry point
│   └── App.jsx         ← The seating chart (all the code lives here)
└── README.md           ← This file
```

Congratulations Matt & Anna! 🥂🌿
