import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedArticles, getRecentArticles } from "@/lib/sanity-client";
import type { BlogArticle } from "@/lib/blog-types";

const ArticleCard = ({ article, i }: { article: BlogArticle; i: number }) => (
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
      <h3 className="text-lg font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-snug line-clamp-2">
        {article.title}
      </h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
    </Link>
  </motion.article>
);

const BlogPreviewSection = () => {
  const [featured, setFeatured] = useState<BlogArticle[]>([]);
  const [recent, setRecent] = useState<BlogArticle[]>([]);

  useEffect(() => {
    getFeaturedArticles().then((featuredData) => {
      setFeatured(featuredData);
      const excludeSlugs = featuredData.map((a) => a.slug);
      getRecentArticles(excludeSlugs).then(setRecent);
    });
  }, []);

  if (featured.length === 0 && recent.length === 0) return null;

  return (
    <section className="py-20" id="blog" style={{ backgroundColor: "hsl(36 30% 93%)" }}>
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
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl">
              Artigos e análises para transformar a saúde mental em vantagem competitiva.
            </p>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Ver todos os artigos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Featured articles */}
        {featured.length > 0 && (
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <Star className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">Destaques</span>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {featured.map((article, i) => (
                <ArticleCard key={article.slug} article={article} i={i} />
              ))}
            </div>
          </div>
        )}

        {/* Recent articles */}
        {recent.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-6"
            >
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Mais recentes</span>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {recent.map((article, i) => (
                <ArticleCard key={article.slug} article={article} i={i} />
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Button
            size="lg"
            className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow text-white"
            onClick={() => document.querySelector(".newsletter-signup")?.scrollIntoView({ behavior: "smooth" })}
          >
            Assine a Central de Inteligência
          </Button>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Ver todos os artigos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
