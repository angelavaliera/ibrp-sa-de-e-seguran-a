// Utility to capture, persist and forward UTM parameters across SPA navigation
// UTMs are saved to sessionStorage on first visit so they survive route changes

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "ibrp_utm";

export type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

/** Read UTMs from URL and persist to sessionStorage (call once on app init) */
export function captureUtmParams(): void {
  const params = new URLSearchParams(window.location.search);
  const found: UtmParams = {};
  let hasAny = false;

  for (const key of UTM_KEYS) {
    const val = params.get(key);
    if (val) {
      found[key] = val;
      hasAny = true;
    }
  }

  if (hasAny) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  }
}

/** Retrieve stored UTMs (returns {} if none) */
export function getUtmParams(): UtmParams {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/** Append stored UTMs to a URL string */
export function appendUtmToUrl(url: string): string {
  const utms = getUtmParams();
  if (Object.keys(utms).length === 0) return url;

  const separator = url.includes("?") ? "&" : "?";
  const qs = Object.entries(utms)
    .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
    .join("&");

  return `${url}${separator}${qs}`;
}
