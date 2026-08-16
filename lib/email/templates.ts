export function inviteEmailHtml({
  senderName,
  message,
  inviteLink,
}: {
  senderName: string;
  message: string;
  inviteLink: string;
}) {
  const safeMessage = message
    .split("\n")
    .map((line) => `<p style="margin:0 0 12px;">${escapeHtml(line)}</p>`)
    .join("");

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f7;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="background:#f9c846;padding:14px 24px;text-align:center;font-weight:700;font-size:13px;letter-spacing:0.04em;text-transform:uppercase;color:#111827;">
                Your life, your wishes, your extremely specific playlist.
              </td>
            </tr>
            <tr>
              <td style="padding:32px 32px 8px;">
                <p style="margin:0 0 4px;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;color:#6b7280;font-weight:600;">When I Die™</p>
                <h1 style="margin:0 0 20px;font-size:22px;color:#111827;">${escapeHtml(senderName)} added you to their plan</h1>
                <div style="font-size:15px;line-height:1.5;color:#111827;">${safeMessage}</div>
                <div style="margin:28px 0;">
                  <a href="${inviteLink}" style="display:inline-block;background:#f9c846;color:#111827;font-weight:600;text-decoration:none;padding:12px 24px;border-radius:999px;font-size:15px;">View the plan</a>
                </div>
                <p style="margin:0;font-size:13px;color:#6b7280;">If the button doesn't work, copy this link: <br/><span style="word-break:break-all;">${inviteLink}</span></p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 28px;border-top:1px solid #e5e7eb;">
                <p style="margin:0;font-size:12px;color:#9ca3af;">Sent via When I Die™. This link only shows what ${escapeHtml(senderName)} chose to share with you.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
