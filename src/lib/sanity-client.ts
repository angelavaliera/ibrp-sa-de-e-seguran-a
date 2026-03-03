/**
 * Sanity CMS Client — pronto para integração futura.
 *
 * Passos para conectar:
 * 1. Crie um projeto em https://www.sanity.io/manage
 * 2. Anote o Project ID e Dataset (geralmente "production")
 * 3. Adicione as variáveis de ambiente:
 *    - VITE_SANITY_PROJECT_ID
 *    - VITE_SANITY_DATASET
 * 4. Instale o pacote: npm install @sanity/client @sanity/image-url
 * 5. Descomente o código abaixo e remova o mock fallback.
 *
 * Esquema Sanity (sanity/schemas/article.ts):
 * - title: string (required)
 * - subtitle: string (optional)
 * - slug: slug (required, source: title)
 * - coverImage: image (required, fields: caption string, credit string)
 * - category: string (required, list: NR-1, Liderança, Saúde Mental, Casos Jurídicos)
 * - author: string (required)
 * - publishedAt: datetime (required)
 * - readTime: number (required)
 * - excerpt: text (required)
 * - body: array of block (rich text with links, lists)
 * - dataHighlight: object (optional, fields: value string, label string, description text)
 * - sources: array of object (optional, fields: name string, url url)
 * - metaTitle: string (optional, max 60)
 * - metaDescription: text (optional, max 160)
 */

import { mockArticles } from "./blog-mock-data";
import type { BlogArticle, BlogCategory } from "./blog-types";

// Atualmente usando dados mock. Substitua pelas chamadas à API do Sanity.
export async function getArticles(category?: BlogCategory): Promise<BlogArticle[]> {
  // Simula latência de rede
  await new Promise((r) => setTimeout(r, 300));
  if (category) {
    return mockArticles.filter((a) => a.category === category);
  }
  return mockArticles;
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  await new Promise((r) => setTimeout(r, 200));
  return mockArticles.find((a) => a.slug === slug);
}
