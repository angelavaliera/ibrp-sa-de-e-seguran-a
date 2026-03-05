import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { BlogArticle, BlogCategory } from "./blog-types";

export const sanityClient = createClient({
  projectId: "ueiyjck5",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

function urlFor(source: any) {
  return builder.image(source);
}

function estimateReadTime(body: any): number {
  let text = "";
  if (Array.isArray(body)) {
    // Portable Text blocks
    text = body
      .filter((b: any) => b._type === "block")
      .map((b: any) => b.children?.map((c: any) => c.text).join("") ?? "")
      .join(" ");
  } else if (typeof body === "string") {
    text = body.replace(/<[^>]*>/g, " ");
  }
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function mapArticle(raw: any): BlogArticle {
  return {
    slug: raw.slug?.current ?? "",
    title: raw.title ?? "",
    subtitle: raw.subtitle ?? undefined,
    coverImage: raw.coverImage ? urlFor(raw.coverImage).width(1200).quality(80).url() : "",
    coverCaption: raw.coverImage?.caption ?? undefined,
    coverCredit: raw.coverImage?.credit ?? undefined,
    category: raw.category ?? "NR-1",
    author: raw.author ?? "",
    guestAuthor: raw.guestAuthor?.name
      ? {
          name: raw.guestAuthor.name,
          photo: raw.guestAuthor.photo ? urlFor(raw.guestAuthor.photo).width(200).height(200).quality(80).url() : undefined,
          bio: raw.guestAuthor.bio ?? undefined,
          linkedin: raw.guestAuthor.linkedin ?? undefined,
          instagram: raw.guestAuthor.instagram ?? undefined,
          email: raw.guestAuthor.email ?? undefined,
        }
      : undefined,
    publishedAt: raw.publishedAt ?? "",
    readTime: raw.readTime || estimateReadTime(raw.body),
    excerpt: raw.excerpt ?? "",
    body: raw.body ?? "",
    dataHighlight: raw.dataHighlight?.value
      ? {
          value: raw.dataHighlight.value,
          label: raw.dataHighlight.label ?? "",
          description: raw.dataHighlight.description ?? undefined,
        }
      : undefined,
    sources: raw.sources?.length
      ? raw.sources.map((s: any) => ({ name: s.name, url: s.url ?? undefined }))
      : undefined,
    metaTitle: raw.metaTitle ?? undefined,
    metaDescription: raw.metaDescription ?? undefined,
  };
}

const ARTICLE_FIELDS = `
  title,
  subtitle,
  "slug": slug,
  coverImage { ..., caption, credit },
  category,
  author,
  guestAuthor-> {
    name,
    photo,
    bio,
    linkedin,
    instagram,
    email
  },
  publishedAt,
  readTime,
  excerpt,
  body,
  dataHighlight,
  sources,
  metaTitle,
  metaDescription
`;

export async function getArticles(): Promise<BlogArticle[]> {
  try {
    const results = await sanityClient.fetch(
      `*[_type == "article"] | order(publishedAt desc) { ${ARTICLE_FIELDS} }`
    );
    if (results && results.length > 0) return results.map(mapArticle);
  } catch (e) {
    console.warn("Sanity fetch failed, using mock data", e);
  }
  const { mockArticles } = await import("./blog-mock-data");
  return mockArticles;
}

export async function searchArticles(query: string): Promise<BlogArticle[]> {
  if (!query.trim()) return getArticles();
  try {
    const results = await sanityClient.fetch(
      `*[_type == "article" && (title match $q || subtitle match $q || excerpt match $q || pt::text(body) match $q)] | order(publishedAt desc) { ${ARTICLE_FIELDS} }`,
      { q: `${query.trim()}*` }
    );
    if (results && results.length > 0) return results.map(mapArticle);
  } catch (e) {
    console.warn("Sanity search failed, using mock data", e);
  }
  const { mockArticles } = await import("./blog-mock-data");
  const q = query.toLowerCase();
  return mockArticles.filter(
    (a) =>
      a.title.toLowerCase().includes(q) ||
      a.subtitle?.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q)
  );
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  try {
    const result = await sanityClient.fetch(
      `*[_type == "article" && slug.current == $slug][0] { ${ARTICLE_FIELDS} }`,
      { slug }
    );
    if (result) return mapArticle(result);
  } catch (e) {
    console.warn("Sanity fetch failed, using mock data", e);
  }
  const { mockArticles } = await import("./blog-mock-data");
  return mockArticles.find((a) => a.slug === slug);
}
