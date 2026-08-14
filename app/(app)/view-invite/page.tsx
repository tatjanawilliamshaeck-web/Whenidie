"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AuthHeader } from "@/components/AuthHeader";
import { createClient } from "@/lib/supabase/client";
import { QUESTIONS } from "@/lib/questions";
import { getDisplayValue } from "@/lib/plan";

type PlanItem = { question_id: string; value: string };

function ViewInviteContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "no-token" | "no-plan" | "error" | "ready">(() =>
    token ? "loading" : "no-token"
  );
  const [plan, setPlan] = useState<PlanItem[]>([]);

  useEffect(() => {
    if (!token) return;
    const supabase = createClient();
    (async () => {
      try {
        await supabase.rpc("record_invite_open", { token });
        const { data, error } = await supabase.rpc("get_plan_for_invite", { token });
        if (error) {
          setStatus("error");
          return;
        }
        const items: PlanItem[] = data?.plan || [];
        if (items.length > 0) {
          setPlan(items);
          setStatus("ready");
        } else {
          setStatus("no-plan");
        }
      } catch {
        setStatus("error");
      }
    })();
  }, [token]);

  return (
    <main className="app-main" id="main-content">
      <div className="container container--narrow">
        <div className="auth-card view-invite-card">
          {status === "loading" ? <p className="view-invite-loading">Loading…</p> : null}
          {status === "no-token" || status === "error" ? (
            <p className="view-invite-message">This invite link is invalid or has expired.</p>
          ) : null}
          {status === "no-plan" ? (
            <>
              <h1 className="auth-title">You&rsquo;re on the list</h1>
              <p className="view-invite-message">
                Someone has shared their When I Die™ plan with you. When they&rsquo;re ready to
                give you access, you&rsquo;ll be able to view it here. No account needed.
              </p>
              <p className="view-invite-message view-invite-sub">Thanks for being someone they trust.</p>
            </>
          ) : null}
          {status === "ready" ? (
            <>
              <h1 className="auth-title">Shared plan</h1>
              <p className="view-invite-message">Someone has shared part of their When I Die™ plan with you.</p>
              <div className="invite-plan">
                {plan.map((item) => {
                  const question = QUESTIONS.find((q) => q.id === item.question_id);
                  const title = question?.title || item.question_id;
                  const display = question ? getDisplayValue(question, item.value) : item.value;
                  return (
                    <div className="invite-plan-item" key={item.question_id}>
                      <h3 className="invite-plan-title">{title}</h3>
                      <p className="invite-plan-value">{display}</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : null}
          <p className="auth-footer" style={{ marginTop: "1.5rem" }}>
            <Link href="/">Go to homepage</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default function ViewInvitePage() {
  return (
    <div className="page-app page-view-invite">
      <AuthHeader links={[{ href: "/", label: "Home" }]} />
      <Suspense fallback={null}>
        <ViewInviteContent />
      </Suspense>
    </div>
  );
}
