// Thin wrapper around gtag for custom conversion events
// Google Tag is loaded globally via index.html (G-75RMWMHVMR)

import { getUtmParams } from "@/lib/utm";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type ConversionEvent =
  | "geracao_lead_b2b"
  | "clique_matricula_curso"
  | "assinatura_newsletter"
  | "clique_central_inteligencia";

export function trackEvent(
  event: ConversionEvent,
  params?: Record<string, string>,
) {
  if (typeof window.gtag === "function") {
    const utms = getUtmParams();
    window.gtag("event", event, { ...utms, ...params });
  }
}
