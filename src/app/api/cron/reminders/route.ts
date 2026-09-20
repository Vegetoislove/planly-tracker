import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");

function getSubscribers() {
  try {
    if (!fs.existsSync(SUBSCRIBERS_FILE)) return [];
    return JSON.parse(fs.readFileSync(SUBSCRIBERS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const subscribers = getSubscribers();
    const resendApiKey = process.env.RESEND_API_KEY;

    // Detect if this is a morning or evening trigger (IST is UTC+5:30)
    const nowUtcHours = new Date().getUTCHours();
    const isMorning = nowUtcHours < 8;

    const title = isMorning
      ? "☀️ 9:00 AM Study Kickoff — Planly Tracker"
      : "🌙 6:00 PM Evening Session Check-in — Planly Tracker";

    const previewMessage = isMorning
      ? "Good morning! Your today's study roadmap is ready. Jump in and start your first problem!"
      : "Evening check-in! Did you complete your planned questions today? Start your timer and log your hours!";

    const results = [];

    for (const sub of subscribers) {
      if (isMorning && !sub.morningReminder) continue;
      if (!isMorning && !sub.eveningReminder) continue;

      if (resendApiKey) {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Planly Tracker <reminders@resend.dev>",
            to: sub.email,
            subject: title,
            html: `
              <div style="font-family: sans-serif; max-width: 550px; margin: 0 auto; background: #090d16; color: #f1f5f9; padding: 28px; border-radius: 16px; border: 1px solid #232d42;">
                <div style="font-size: 24px; font-weight: bold; color: #60a5fa; margin-bottom: 8px;">⚡ Planly Study Reminder</div>
                <p style="font-size: 15px; line-height: 1.5; color: #cbd5e1;">${previewMessage}</p>
                <div style="margin: 24px 0; background: #111726; border: 1px solid #232d42; padding: 18px; border-radius: 12px;">
                  <strong style="color: #38bdf8;">Planly 50-Day Roadmap (rereckoning)</strong><br>
                  <span style="font-size: 13px; color: #94a3b8;">Keep up your consistency! Every day counts towards interview mastery.</span>
                </div>
                <div style="text-align: center; margin-top: 24px;">
                  <a href="https://your-planly-app.vercel.app" style="background: #2563eb; color: #ffffff; text-decoration: none; padding: 12px 24px; font-weight: bold; border-radius: 8px; display: inline-block;">Open Study Dashboard & Start Timer →</a>
                </div>
              </div>
            `,
          }),
        });
        results.push({ email: sub.email, status: res.status });
      } else {
        results.push({ email: sub.email, status: "simulated (add RESEND_API_KEY in production)" });
      }
    }

    return NextResponse.json({
      success: true,
      trigger: isMorning ? "9:00 AM Morning Kickoff" : "6:00 PM Evening Check-in",
      recipients: results,
      message: resendApiKey
        ? `Sent ${results.length} reminder emails.`
        : `Simulated reminders for ${results.length} recipients. Add RESEND_API_KEY environment variable on Vercel to send live emails!`,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    console.error("Cron route error:", err);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
