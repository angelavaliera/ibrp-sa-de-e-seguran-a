export interface GuestAuthor {
  name: string;
  photo?: string;
  bio?: string;
  linkedin?: string;
  instagram?: string;
  email?: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  subtitle?: string;
  coverImage: string;
  coverCaption?: string;
  coverCredit?: string;
  category?: BlogCategory;
  author: string;
  guestAuthor?: GuestAuthor;
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

export type BlogCategory = string;

export const CATEGORIES: BlogCategory[] = [
  "Estudos de Caso",
  "Radar IBRP",
  "Ponto de Vista",
  "Gestão e Estratégia",
  "Jurídico e Normas",
];
