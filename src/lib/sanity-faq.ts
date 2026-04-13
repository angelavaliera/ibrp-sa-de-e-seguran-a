import { sanityClient } from "./sanity-client";
import type { FaqItem } from "./faq-types";

const FAQ_FIELDS = `
  _id,
  pergunta,
  resposta,
  "respostaPlainText": pt::text(resposta),
  videoUrl,
  categoria,
  ordem
`;

export async function getFaqItems(): Promise<FaqItem[]> {
  try {
    const results = await sanityClient.fetch(
      `*[_type == "faq"] | order(coalesce(ordem, 999) asc, pergunta asc) { ${FAQ_FIELDS} }`
    );
    if (results && results.length > 0) return results;
  } catch (e) {
    console.warn("Sanity FAQ fetch failed", e);
  }
  return [];
}

export async function getFaqByCategory(): Promise<Record<string, FaqItem[]>> {
  const items = await getFaqItems();
  const grouped: Record<string, FaqItem[]> = {};
  for (const item of items) {
    const cat = item.categoria || "Geral";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  }
  return grouped;
}
