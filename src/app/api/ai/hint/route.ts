import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { problemTitle, sprintName, apiKey } = body;

    const key = apiKey || process.env.GEMINI_API_KEY;
    if (!key) {
      return NextResponse.json(
        { error: "No Gemini API key available. Please add it to your environment or Adjust Plan modal." },
        { status: 400 }
      );
    }

    if (!problemTitle) {
      return NextResponse.json(
        { error: "Problem title is required." },
        { status: 400 }
      );
    }

    const cleanTitle = problemTitle.replace(/^🔄\s*/, "").trim();

    const promptText = `You are a Senior DSA Mentor helping a student with Striver's TakeUforward curriculum.
The student is working on: "${cleanTitle}" (Category: ${sprintName || "Core Data Structures & Algorithms"}).

Provide a concise, high-value hint without spoiling the complete solution. Format cleanly with markdown:
### 💡 Core Intuition
(2-3 sentences explaining the mental model or visual invariant, e.g., two-pointer, monotonicity, recurrence relation, or hash map shortcut).

### 🎯 Complexity Target
- **Time Complexity:** What is the optimal time (e.g. O(N), O(N log N))?
- **Space Complexity:** What is the optimal auxiliary space?

### ⚠️ Common Pitfalls & Edge Cases
- (2-3 key edge cases, e.g., duplicates, negative numbers, empty arrays, or integer overflow).`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${key}`,
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
        { error: `Gemini API error (${response.status}): ${err}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const hint =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Focus on the brute force first, then see if a Hash Map or Two-Pointer approach reduces repeated work.";

    return NextResponse.json({ success: true, hint });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
