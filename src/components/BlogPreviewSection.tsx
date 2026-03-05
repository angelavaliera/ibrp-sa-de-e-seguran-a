import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getArticles } from "@/lib/sanity-client";
import type { BlogArticle } from "@/lib/blog-types";

const BlogPreviewSection = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    getArticles().then((data) => setArticles(data.slice(0, 3)));
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-20 bg-verde-petroleo text-white" id="blog">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-3">
              Central de <span className="text-gradient">Inteligência</span> IBRP
            </h2>
            <p className="text-white/60 max-w-lg">
              Artigos e análises para transformar a saúde mental em vantagem competitiva.
            </p>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-verde-selva hover:underline"
          >
            Ver todos os artigos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link to={`/blog/${article.slug}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/10]">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {article.category && (
                    <Badge className="absolute top-3 left-3 text-xs bg-background/80 text-foreground border-border">
                      {article.category}
                    </Badge>
                  )}
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-1 group-hover:text-verde-selva transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-white/50 line-clamp-2 mb-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-white/40">
                  <time>
                    {new Date(article.publishedAt).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "short",
                    })}
                  </time>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime} min
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <Link
          to="/blog"
          className="md:hidden mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-verde-selva hover:underline"
        >
          Ver todos os artigos
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
