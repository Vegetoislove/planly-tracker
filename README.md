# ⚡ Planly Study Tracker (`rereckoning`)

A modern, production-grade Next.js study tracker for the **50-Day / 8-Sprint (905 problems)** TakeUforward "rereckoning" study curriculum.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Lucide React**.

---

## 🌟 Key Features

1. **Complete 50-Day Curriculum**: All 8 Sprints, 50 Days, and 905 Problems pre-loaded with time estimates.
2. **Interactive Checklists & Progress**: Checking off tasks updates your daily target, sprint progress, and the master circular progress ring.
3. **Live Study Stopwatch**: Built-in session stopwatch with Start, Pause, Resume, and 1-click **Log Time to Day** buttons (+15m, +30m, +1h quick-adds).
4. **Automated Twice-Daily Email Reminders**:
   - **9:00 AM IST**: Morning Kickoff with today's topic list and study targets.
   - **6:00 PM IST**: Evening Session Check-in to finish remaining tasks.
5. **1-Click LeetCode / TUF Search**: Direct external links to search tutorials and problem statements on Google.
6. **Task Notes**: Personal notes for tricky questions, saved automatically.
7. **Offline Persistence & Backups**: Auto-saved in `localStorage` + 1-click JSON backup export & restore.

---

## 🚀 1-Click Deployment to Vercel (Recommended)

1. Push this project to your **GitHub** repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Planly Tracker"
   git branch -M main
   git remote add origin https://github.com/your-username/planly-tracker.git
   git push -u origin main
   ```
2. Go to **[vercel.com](https://vercel.com)** and click **"Add New" -> "Project"**.
3. Import your `planly-tracker` GitHub repository.
4. *(Optional for live email reminders)*:
   - Create a free account at **[resend.com](https://resend.com)** and grab a free API Key.
   - In Vercel Project Settings under **Environment Variables**, add:
     - `RESEND_API_KEY`: `re_xxxxxxxxx`
5. Click **Deploy**! Your app will be live at `https://your-project.vercel.app` with automated 9 AM and 6 PM cron triggers via `vercel.json`!

---

## 💻 Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⏰ Cron Reminders Configuration

The schedule is defined in `vercel.json`:
- `30 3 * * *`: 03:30 UTC = **9:00 AM IST**
- `30 12 * * *`: 12:30 UTC = **6:00 PM IST**
