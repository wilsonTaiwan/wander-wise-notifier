import { useEffect } from "react";

type PageMeta = {
  title: string;
  description?: string;
  robots?: string;
};

function setMetaTag(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMetaTag(name: string, attr: "name" | "property" = "name") {
  document.head.querySelector(`meta[${attr}="${name}"]`)?.remove();
}

// Client-only replacement for TanStack Start's per-route `head:` config, since
// this is now a plain CSR SPA with a single static index.html.
export function usePageMeta({ title, description, robots }: PageMeta) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;
    if (description) setMetaTag("description", description);
    if (robots) setMetaTag("robots", robots);

    return () => {
      document.title = previousTitle;
      if (robots) removeMetaTag("robots");
    };
  }, [title, description, robots]);
}
