import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getRelatedArticles } from "@/lib/sanity-client";
import type { BlogArticle } from "@/lib/blog-types";

interface RelatedArticlesProps {
  currentSlug: string;
  currentCategory?: string;
}

const RelatedArticles = ({ currentSlug, currentCategory }: RelatedArticlesProps) => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getRelatedArticles(currentSlug, currentCategory).then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [currentSlug, currentCategory]);

  if (loading) {
    return (
      <div className="mt-16 pt-10 border-t border-border">
        <div className="h-7 bg-muted rounded w-48 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[16/9] bg-muted rounded-xl mb-3" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-16 pt-10 border-t border-border"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-bold text-foreground">Continue lendo</h2>
        <Link
          to="/blog"
          className="text-sm text-primary hover:underline inline-flex items-center gap-1"
        >
          Ver todos <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {articles.map((article, i) => (
          <motion.div
            key={article.slug}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 + i * 0.08 }}
          >
            <Link
              to={`/blog/${article.slug}`}
              className="group block rounded-xl overflow-hidden border border-border bg-card hover:border-primary/30 transition-all duration-300"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {article.contentType === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-10 h-10 rounded-full bg-primary/90 flex items-center justify-center">
                      <Play className="h-4 w-4 text-primary-foreground ml-0.5" fill="currentColor" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                {article.category && (
                  <Badge variant="secondary" className="mb-2 text-[10px] px-2 py-0.5">
                    {article.category}
                  </Badge>
                )}
                <h3 className="text-sm font-heading font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <time>
                    {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "short",
                      timeZone: "UTC",
                    })}
                  </time>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RelatedArticles;
