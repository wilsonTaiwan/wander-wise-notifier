import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type AuthState =
  | { status: "loading" }
  | { status: "anon" }
  | { status: "authed"; user: User };

// Client-side equivalent of the old `_authenticated` route's `ssr: false` +
// `beforeLoad` guard: checks the Supabase session on mount and redirects to
// /auth if there isn't one, otherwise renders the protected subtree.
export default function ProtectedRoute() {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      if (error || !data.user) {
        setState({ status: "anon" });
      } else {
        setState({ status: "authed", user: data.user });
      }
    });
    return () => {
      active = false;
    };
  }, []);

  if (state.status === "loading") return null;
  if (state.status === "anon") return <Navigate to="/auth" replace />;
  return <Outlet context={state.user} />;
}

export function useAuthedUser() {
  return useOutletContext<User>();
}
