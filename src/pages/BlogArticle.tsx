import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticleBySlug } from "@/lib/sanity-client";
import type { BlogArticle, BlogCategory } from "@/lib/blog-types";

const categoryColors: Record<BlogCategory, string> = {
  "NR-1": "bg-indigo/10 text-indigo border-indigo/20",
  "Liderança": "bg-verde-selva/10 text-verde-selva border-verde-selva/20",
  "Saúde Mental": "bg-fucsia/10 text-fucsia border-fucsia/20",
  "Casos Jurídicos": "bg-caqui/10 text-caqui border-caqui/20",
};

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getArticleBySlug(slug).then((data) => {
      setArticle(data ?? null);
      setLoading(false);
    });
  }, [slug]);

  // Update document head for SEO
  useEffect(() => {
    if (!article) return;
    document.title = article.metaTitle || article.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", article.metaDescription || article.excerpt);
    }
  }, [article]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20">
          <div className="container mx-auto max-w-3xl px-4 animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-8" />
            <div className="h-10 bg-muted rounded w-3/4 mb-4" />
            <div className="h-6 bg-muted rounded w-1/2 mb-8" />
            <div className="aspect-[16/9] bg-muted rounded-2xl mb-8" />
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-20 text-center">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="text-2xl font-heading font-bold mb-4">Artigo não encontrado</h1>
            <Link to="/blog" className="text-primary hover:underline">
              ← Voltar à Central de Inteligência
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <article className="container mx-auto max-w-3xl px-4">
          {/* Back link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Central de Inteligência
            </Link>
          </motion.div>

          {/* Article header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Badge className={`mb-4 ${categoryColors[article.category]}`}>
              {article.category}
            </Badge>

            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-heading font-bold text-foreground leading-tight mb-3">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                {article.subtitle}
              </p>
            )}

            <div className="flex items-center gap-4 text-sm text-muted-foreground border-b border-border pb-6">
              <span className="font-medium text-foreground">{article.author}</span>
              <span>·</span>
              <time>
                {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime} min de leitura
              </span>
            </div>
          </motion.header>

          {/* Cover image */}
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-10"
          >
            <div className="rounded-2xl overflow-hidden aspect-[16/9]">
              <img
                src={article.coverImage}
                alt={article.coverCaption || article.title}
                className="w-full h-full object-cover"
              />
            </div>
            {(article.coverCaption || article.coverCredit) && (
              <figcaption className="text-xs text-muted-foreground mt-2 text-center">
                {article.coverCaption}
                {article.coverCredit && ` — ${article.coverCredit}`}
              </figcaption>
            )}
          </motion.figure>

          {/* Data Highlight (optional - dynamic) */}
          {article.dataHighlight && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8 mb-10"
            >
              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-3xl md:text-4xl font-heading font-bold text-primary">
                  {article.dataHighlight.value}
                </span>
                <span className="text-lg font-heading font-semibold text-foreground">
                  {article.dataHighlight.label}
                </span>
              </div>
              {article.dataHighlight.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.dataHighlight.description}
                </p>
              )}
            </motion.div>
          )}

          {/* Body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:text-foreground/85 prose-p:leading-[1.8] prose-p:mb-5
              prose-li:text-foreground/85 prose-li:leading-[1.7]
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-ul:my-4 prose-ol:my-4"
            dangerouslySetInnerHTML={{ __html: article.body }}
          />

          {/* Sources (optional - dynamic) */}
          {article.sources && article.sources.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-12 pt-8 border-t border-border"
            >
              <h3 className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Fontes e Referências
              </h3>
              <ul className="space-y-2">
                {article.sources.map((source, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {source.url ? (
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                      >
                        {source.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span>{source.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          {/* Back to feed */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar à Central de Inteligência
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogArticlePage;
