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
    publishedAt: raw.publishedAt ?? "",
    readTime: raw.readTime ?? 5,
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
  publishedAt,
  readTime,
  excerpt,
  "body": pt::text(body),
  dataHighlight,
  sources,
  metaTitle,
  metaDescription
`;

export async function getArticles(category?: BlogCategory): Promise<BlogArticle[]> {
  const filter = category
    ? `*[_type == "article" && category == $category] | order(publishedAt desc)`
    : `*[_type == "article"] | order(publishedAt desc)`;

  const params = category ? { category } : {};
  const results = await sanityClient.fetch(`${filter} { ${ARTICLE_FIELDS} }`, params);
  return results.map(mapArticle);
}

export async function getArticleBySlug(slug: string): Promise<BlogArticle | undefined> {
  const result = await sanityClient.fetch(
    `*[_type == "article" && slug.current == $slug][0] { ${ARTICLE_FIELDS} }`,
    { slug }
  );
  return result ? mapArticle(result) : undefined;
}
