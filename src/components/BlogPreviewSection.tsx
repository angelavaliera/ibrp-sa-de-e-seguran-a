import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
      <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[16/10] bg-muted">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {article.contentType === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Play className="h-6 w-6 text-primary fill-primary ml-0.5" />
            </div>
          </div>
        )}
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

  // "Recentes" = 3 most recent posts (mixed types, excluding featured)
  const recentAll = useMemo(() => recent.slice(0, 3), [recent]);

  // "Destaques" = isFeatured posts (mixed types)
  const highlights = useMemo(() => featured.slice(0, 6), [featured]);

  // "Artigos" = most recent articles (non-video), from recent list
  const articlesOnly = useMemo(
    () => recent.filter((a) => a.contentType !== "video").slice(0, 3),
    [recent]
  );

  // "Vídeos & Podcasts" = most recent videos, from recent list
  const videosOnly = useMemo(
    () => recent.filter((a) => a.contentType === "video").slice(0, 3),
    [recent]
  );

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
              Artigos, vídeos e análises para transformar a saúde mental em vantagem competitiva.
            </p>
          </div>
          <Link
            to="/blog"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Ver todos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <Tabs defaultValue="recentes" className="w-full">
          <TabsList className="mb-8 bg-muted/60">
            <TabsTrigger value="recentes">Recentes</TabsTrigger>
            <TabsTrigger value="destaques" className="gap-1.5">
              <Star className="h-3.5 w-3.5" /> Destaques
            </TabsTrigger>
            <TabsTrigger value="artigos">Artigos</TabsTrigger>
            <TabsTrigger value="videos">Vídeos & Podcasts</TabsTrigger>
          </TabsList>

          <TabsContent value="recentes">
            {recentAll.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {recentAll.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} i={i} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">Nenhum conteúdo recente no momento.</p>
            )}
          </TabsContent>

          <TabsContent value="destaques">
            {highlights.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {highlights.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} i={i} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">Nenhum destaque no momento.</p>
            )}
          </TabsContent>

          <TabsContent value="artigos">
            {articlesOnly.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {articlesOnly.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} i={i} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">Nenhum artigo em destaque no momento.</p>
            )}
          </TabsContent>

          <TabsContent value="videos">
            {videosOnly.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-6">
                {videosOnly.map((article, i) => (
                  <ArticleCard key={article.slug} article={article} i={i} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">Nenhum vídeo em destaque no momento.</p>
            )}
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-center mt-12">
          <Button
            size="lg"
            className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow text-white"
            onClick={() => document.querySelector(".newsletter-signup")?.scrollIntoView({ behavior: "smooth" })}
          >
            Assine a Central de Inteligência
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
