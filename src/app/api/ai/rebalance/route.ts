import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { apiKey, missedTasks, activeSprintName, activeDayName } = body;

    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "No Gemini API key provided. Please save your API key in the Adjust Plan modal." },
        { status: 400 }
      );
    }

    const promptText = `You are an expert DSA study planner for TakeUforward's Striver curriculum.
The student is currently at: ${activeSprintName}, ${activeDayName}.
They have ${missedTasks?.length || 0} backlog/missed problems from previous days:
${(missedTasks || []).slice(0, 15).map((t: { title: string; time?: string }) => `- ${t.title} (${t.time || "20m"})`).join("\n")}

Provide a concise, encouraging 3-step action plan on how they should pace their study sessions over the next 3 days to catch up without burning out. Keep it formatted with bullet points and realistic time estimates.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      return NextResponse.json(
        { error: `Gemini API request failed: ${err}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const recommendation =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Focus on 2 backlog problems per day alongside your regular sprint schedule.";

    return NextResponse.json({ success: true, recommendation });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
