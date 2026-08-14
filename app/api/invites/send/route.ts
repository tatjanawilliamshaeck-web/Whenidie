import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getResend, INVITE_FROM_ADDRESS } from "@/lib/email/resend";
import { inviteEmailHtml } from "@/lib/email/templates";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let body: { email?: string; message?: string; inviteLink?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { email, message, inviteLink } = body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That doesn't look like a valid email." }, { status: 400 });
  }
  if (!inviteLink || !message) {
    return NextResponse.json({ error: "Missing message or invite link." }, { status: 400 });
  }

  const resend = getResend();
  if (!resend) {
    return NextResponse.json({ error: "Email sending isn't configured yet." }, { status: 503 });
  }

  const senderName =
    (user.user_metadata as { display_name?: string } | null)?.display_name || user.email || "Someone";

  const { error } = await resend.emails.send({
    from: INVITE_FROM_ADDRESS,
    to: email,
    subject: `${senderName} added you to their When I Die™ plan`,
    html: inviteEmailHtml({ senderName, message, inviteLink }),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
