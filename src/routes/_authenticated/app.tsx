import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plane } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      { name: "description", content: "Your flight route tracking dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AppPage,
});

function AppPage() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="pointer-events-none absolute inset-0 glow-violet" />
      <header className="relative z-10 flex items-center justify-between border-b border-border px-6 py-4">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Flight Price Notifier
        </span>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          Sign out / 登出
        </Button>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4">
        <div className="w-full max-w-lg animate-fade-up rounded-2xl border border-border bg-card p-10 text-center shadow-2xl shadow-primary/10">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent">
            <Plane className="h-7 w-7 text-accent-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-card-foreground">
            Hi {user.email}
          </h1>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
