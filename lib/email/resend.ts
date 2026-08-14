import { Resend } from "resend";

let client: Resend | null = null;

export function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

export const INVITE_FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS || "When I Die™ <hello@whenidie.us>";
