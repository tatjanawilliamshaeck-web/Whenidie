"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function StartCtaLink({
  className,
  loggedOutText,
  loggedInText = "Your plan",
}: {
  className?: string;
  loggedOutText: string;
  loggedInText?: string;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) setLoggedIn(true);
    });
  }, []);

  return (
    <Link href={loggedIn ? "/dashboard" : "/signup"} className={className}>
      {loggedIn ? loggedInText : loggedOutText}
    </Link>
  );
}
