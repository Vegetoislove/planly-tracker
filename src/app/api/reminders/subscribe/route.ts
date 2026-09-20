import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const SUBSCRIBERS_FILE = path.join(process.cwd(), "subscribers.json");

interface Subscriber {
  email: string;
  morningReminder: boolean;
  eveningReminder: boolean;
  subscribedAt: string;
}

function getSubscribers(): Subscriber[] {
  try {
    if (!fs.existsSync(SUBSCRIBERS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(SUBSCRIBERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading subscribers file:", err);
    return [];
  }
}

function saveSubscribers(list: Subscriber[]) {
  try {
    fs.writeFileSync(SUBSCRIBERS_FILE, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing subscribers file:", err);
  }
}

export async function POST(req: Request) {
  try {
    const { email, morningReminder = true, eveningReminder = true } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { message: "Valid email address is required." },
        { status: 400 }
      );
    }

    const currentList = getSubscribers();
    const existingIndex = currentList.findIndex((s) => s.email.toLowerCase() === email.toLowerCase());

    const record: Subscriber = {
      email: email.toLowerCase(),
      morningReminder,
      eveningReminder,
      subscribedAt: new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      currentList[existingIndex] = record;
    } else {
      currentList.push(record);
    }

    saveSubscribers(currentList);

    return NextResponse.json({
      success: true,
      message: `Subscribed ${email} to daily study reminders!`,
      subscribersCount: currentList.length,
    });
  } catch (err: unknown) {
    console.error("Subscription route error:", err);
    return NextResponse.json(
      { message: "Internal server error saving subscription." },
      { status: 500 }
    );
  }
}
