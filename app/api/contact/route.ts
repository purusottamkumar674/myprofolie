import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (body.website) return NextResponse.json({ ok: true });
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json({ error: "Please enter a valid name." }, { status: 400 });
    }
    if (!emailPattern.test(email) || email.length > 180) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Please enter at least 10 characters." }, { status: 400 });
    }

    const supabase = await getServerSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: "The contact inbox is not connected yet. Please use the email link." },
        { status: 503 },
      );
    }

    const { error } = await supabase.from("contact_messages").insert({
      name,
      email,
      phone: String(body.phone || "").trim().slice(0, 60) || null,
      company: String(body.company || "").trim().slice(0, 150) || null,
      project_type: String(body.projectType || "").trim().slice(0, 100) || null,
      budget: String(body.budget || "").trim().slice(0, 100) || null,
      message,
    });

    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Message could not be sent. Please try again." }, { status: 500 });
  }
}
