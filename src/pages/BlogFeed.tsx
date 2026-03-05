import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getArticles, searchArticles } from "@/lib/sanity-client";
import type { BlogArticle } from "@/lib/blog-types";

const BlogFeed = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setLoading(true);
    const fetcher = debouncedQuery ? searchArticles(debouncedQuery) : getArticles();
    fetcher.then((data) => {
      setArticles(data);
      setLoading(false);
    });
  }, [debouncedQuery]);

  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto max-w-4xl px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-3">
              Central de Inteligência IBRP
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Artigos, dados e análises para quem quer transformar a saúde mental em vantagem competitiva.
            </p>
          </motion.div>

          {/* Search bar */}
          <div className="relative mb-10">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-64 bg-muted rounded-2xl mb-4" />
                  <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {debouncedQuery
                  ? `Nenhum artigo encontrado para "${debouncedQuery}".`
                  : "Nenhum artigo publicado ainda."}
              </p>
            </div>
          ) : (
            <>
              {/* Featured article */}
              {featured && (
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-16"
                >
                  <Link to={`/blog/${featured.slug}`} className="group block">
                    <div className="relative overflow-hidden rounded-2xl mb-6 aspect-[16/9]">
                      <img
                        src={featured.coverImage}
                        alt={featured.coverCaption || featured.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {featured.category && (
                        <Badge className="absolute top-4 left-4 bg-background/80 text-foreground border-border">
                          {featured.category}
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                      {featured.title}
                    </h2>
                    {featured.subtitle && (
                      <p className="text-lg text-muted-foreground mb-3 leading-relaxed">
                        {featured.subtitle}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{featured.author}</span>
                      <span>·</span>
                      <time>{new Date(featured.publishedAt).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}</time>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {featured.readTime} min
                      </span>
                    </div>
                  </Link>
                </motion.article>
              )}

              {/* Divider */}
              {rest.length > 0 && <hr className="border-border mb-10" />}

              {/* Article list */}
              <div className="space-y-10">
                {rest.map((article, i) => (
                  <motion.article
                    key={article.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link to={`/blog/${article.slug}`} className="group flex gap-6 items-start">
                      <div className="flex-1 min-w-0">
                        {article.category && (
                          <Badge className="mb-2 text-xs bg-muted text-muted-foreground border-border">
                            {article.category}
                          </Badge>
                        )}
                        <h3 className="text-xl font-heading font-bold text-foreground mb-1 group-hover:text-primary transition-colors leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-3 line-clamp-2 leading-relaxed">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <time>{new Date(article.publishedAt).toLocaleDateString("pt-BR", { day: "numeric", month: "short", timeZone: "UTC" })}</time>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime} min
                          </span>
                          <ArrowRight className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </div>
                      </div>
                      <div className="hidden sm:block w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img
                          src={article.coverImage}
                          alt={article.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogFeed;
