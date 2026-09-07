import { createFileRoute, Link } from "@tanstack/react-router";
import { Plane, BellRing, CalendarX2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      {
        name: "description",
        content:
          "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
      },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      {
        property: "og:description",
        content:
          "設定航線與目標價，機票降價就通知你。Set a route and a target price — we email you when the fare drops.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: Plane,
    title: "盯緊熱門航線",
    subtitle: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    icon: BellRing,
    title: "達標自動通知",
    subtitle: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    icon: CalendarX2,
    title: "隨時取消",
    subtitle: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <div className="pointer-events-none absolute inset-0 glow-violet" />

      <header className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <span className="text-sm font-semibold tracking-tight text-foreground">
          Flight Price Notifier
        </span>
        <Button asChild size="sm">
          <Link to="/auth">Sign in / 登入</Link>
        </Button>
      </header>

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <section className="mx-auto flex max-w-3xl flex-col items-center px-6 pt-20 pb-24 text-center sm:pt-28">
          <h1 className="animate-fade-up text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Flight Price Notifier
          </h1>
          <p className="mt-3 animate-fade-up delay-100 text-lg font-medium text-primary">
            機票降價通知
          </p>
          <p className="mt-6 max-w-xl animate-fade-up delay-200 text-xl leading-relaxed text-muted-foreground">
            設定航線與目標價，機票降價就通知你
          </p>
          <p className="mt-2 max-w-xl animate-fade-up delay-200 text-sm text-muted-foreground">
            Set a route and a target price — we email you when the fare drops.
          </p>
          <div className="mt-10 animate-fade-up delay-300">
            <Button asChild size="lg" className="px-8">
              <Link to="/auth">Sign in / 登入</Link>
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-card p-7 transition-colors hover:border-primary/50"
              >
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent transition-colors group-hover:bg-primary/20">
                  <f.icon className="h-5 w-5 text-accent-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-card-foreground">
                  {f.title}
                  <span className="ml-2 text-sm font-normal text-muted-foreground">
                    ({f.subtitle})
                  </span>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        © 2026 Flight Price Notifier
      </footer>
    </div>
  );
}
