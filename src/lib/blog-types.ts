export interface BlogArticle {
  slug: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  coverCaption?: string;
  coverCredit?: string;
  category: BlogCategory;
  author: string;
  publishedAt: string;
  readTime: number;
  excerpt: string;
  body: any; // Portable Text blocks or HTML string
  dataHighlight?: DataHighlight;
  sources?: Source[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface DataHighlight {
  value: string;
  label: string;
  description?: string;
}

export interface Source {
  name: string;
  url?: string;
}

export type BlogCategory = "NR-1" | "Liderança" | "Saúde Mental" | "Casos Jurídicos";

export const CATEGORIES: BlogCategory[] = ["NR-1", "Liderança", "Saúde Mental", "Casos Jurídicos"];
