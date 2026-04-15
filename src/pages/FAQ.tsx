import { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, HelpCircle, ChevronRight } from "lucide-react";
import { PortableText } from "@portabletext/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeEmbed from "@/components/YouTubeEmbed";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getFaqByCategory } from "@/lib/sanity-faq";
import type { FaqItem } from "@/lib/faq-types";

// Color mapping per category — mirrors DiferenciaisSection palette
const categoryStyles: Record<string, { bg: string; border: string; accentBorder: string; hoverBg: string; iconText: string; pillActive: string }> = {
  "Entenda as mudanças": {
    bg: "bg-verde-selva/10",
    border: "border-verde-selva/20",
    accentBorder: "border-l-verde-selva",
    hoverBg: "hover:bg-verde-selva/15",
    iconText: "text-verde-selva",
    pillActive: "bg-verde-selva text-white",
  },
  "Conceitos e riscos psicossociais": {
    bg: "bg-indigo-brand/10",
    border: "border-indigo-brand/20",
    accentBorder: "border-l-indigo-brand",
    hoverBg: "hover:bg-indigo-brand/15",
    iconText: "text-indigo-brand",
    pillActive: "bg-indigo-brand text-white",
  },
  "Implementação na prática": {
    bg: "bg-fucsia/10",
    border: "border-fucsia/20",
    accentBorder: "border-l-fucsia",
    hoverBg: "hover:bg-fucsia/15",
    iconText: "text-fucsia",
    pillActive: "bg-fucsia text-white",
  },
  "Valor e diferenciais do IBRP": {
    bg: "bg-caqui/10",
    border: "border-caqui/20",
    accentBorder: "border-l-caqui",
    hoverBg: "hover:bg-caqui/15",
    iconText: "text-caqui",
    pillActive: "bg-caqui text-white",
  },
};

const defaultStyle = {
  bg: "bg-muted/50",
  border: "border-border",
  accentBorder: "border-l-primary",
  hoverBg: "hover:bg-muted/70",
  iconText: "text-primary",
  pillActive: "bg-primary text-primary-foreground",
};

function getCategoryStyle(cat: string) {
  if (categoryStyles[cat]) return categoryStyles[cat];
  const lower = cat.toLowerCase();
  if (lower.includes("mudança")) return categoryStyles["Entenda as mudanças"];
  if (lower.includes("conceito") || lower.includes("risco")) return categoryStyles["Conceitos e riscos psicossociais"];
  if (lower.includes("implementa") || lower.includes("prática")) return categoryStyles["Implementação na prática"];
  if (lower.includes("valor") || lower.includes("diferencia")) return categoryStyles["Valor e diferenciais do IBRP"];
  return defaultStyle;
}

function stripHtml(text: string) {
  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function buildFaqJsonLd(grouped: Record<string, FaqItem[]>) {
  const allItems = Object.values(grouped).flat();
  if (allItems.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.pergunta,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.respostaPlainText || "",
      },
    })),
  };
}

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-muted-foreground leading-relaxed mb-3 last:mb-0">{children}</p>
    ),
    h4: ({ children }: any) => (
      <h4 className="font-heading font-semibold text-foreground mt-4 mb-2">{children}</h4>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
    link: ({ value, children }: any) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-3">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-5 space-y-1 text-muted-foreground mb-3">{children}</ol>
    ),
  },
};

const FAQ = () => {
  const [grouped, setGrouped] = useState<Record<string, FaqItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    getFaqByCategory().then((data) => {
      setGrouped(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => Object.keys(grouped), [grouped]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const result: Record<string, FaqItem[]> = {};
    for (const [cat, items] of Object.entries(grouped)) {
      if (activeCategory && cat !== activeCategory) continue;
      const matching = q
        ? items.filter(
            (i) =>
              i.pergunta.toLowerCase().includes(q) ||
              (i.respostaPlainText || "").toLowerCase().includes(q)
          )
        : items;
      if (matching.length > 0) result[cat] = matching;
    }
    return result;
  }, [grouped, search, activeCategory]);

  const totalResults = Object.values(filtered).flat().length;
  const jsonLd = useMemo(() => buildFaqJsonLd(grouped), [grouped]);

  return (
    <>
      <Helmet>
        <title>Perguntas Frequentes | IBRP</title>
        <meta
          name="description"
          content="Encontre respostas sobre riscos psicossociais, NR-1, cursos e serviços do IBRP. Tire suas dúvidas de forma rápida e prática."
        />
        <link rel="canonical" href="https://www.gestaoriscospsicossociais.com.br/faq" />
        {jsonLd && (
          <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        )}
      </Helmet>

      <Header />

      <main className="pt-24 pb-16 min-h-screen">
        {/* Hero */}
        <section className="bg-gradient-to-b from-muted/60 to-background border-b border-border pb-12 pt-8">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5">
                <HelpCircle className="w-7 h-7 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                Perguntas Frequentes
              </h1>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Encontre respostas sobre riscos psicossociais, NR-1, nossos cursos e serviços.
              </p>

              {/* Search */}
              <div className="relative max-w-lg mx-auto">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Busque por uma pergunta..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-11 h-12 text-base rounded-xl border-border bg-background shadow-sm"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Category pills */}
        {categories.length > 1 && (
          <div className="container mx-auto px-4 max-w-3xl pt-6 pb-2">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  !activeCategory
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => {
                const style = getCategoryStyle(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? style.pillActive
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content */}
        <div className="container mx-auto px-4 max-w-3xl py-8">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                {search
                  ? "Nenhuma pergunta encontrada para essa busca."
                  : "Nenhuma pergunta disponível no momento."}
              </p>
            </div>
          ) : (
            Object.entries(filtered).map(([category, items]) => {
              const style = getCategoryStyle(category);
              return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-10 last:mb-0"
              >
                {categories.length > 1 && (
                  <h2 className={`text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2`}>
                    <ChevronRight className={`w-4 h-4 ${style.iconText}`} />
                    {category}
                  </h2>
                )}

                <Accordion type="multiple" className="space-y-3">
                  {items.map((item) => (
                    <AccordionItem
                      key={item._id}
                      value={item._id}
                      className={`border border-l-4 ${style.accentBorder} ${style.border} ${style.bg} ${style.hoverBg} rounded-2xl px-5 data-[state=open]:shadow-sm transition-all hover:shadow-lg`}
                      style={{ boxShadow: "var(--shadow-card)" }}
                    >
                      <AccordionTrigger className="hover:no-underline py-4 text-left">
                        <h3 className="text-base font-medium text-foreground pr-4">
                          {item.pergunta}
                        </h3>
                      </AccordionTrigger>
                      <AccordionContent className="pb-5">
                        {Array.isArray(item.resposta) ? (
                          <PortableText
                            value={item.resposta}
                            components={portableTextComponents}
                          />
                        ) : typeof item.resposta === "string" ? (
                          <p className="text-muted-foreground leading-relaxed">
                            {item.resposta}
                          </p>
                        ) : null}

                        {item.videoUrl && (
                          <div className="mt-4">
                            <YouTubeEmbed url={item.videoUrl} title={item.pergunta} />
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
              );
            })
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FAQ;
