import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoSelo from "@/assets/logo-ibrp-selo.png";
import type { BlogArticle } from "@/lib/blog-types";

import { getRecentArticles } from "@/lib/sanity-client";

const socialLinks = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@IBRP.riscos.psicossociais",
    color: "bg-[#FF0000]",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/ibrp.riscos.psicossociais/",
    color: "bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888]",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ibrp/",
    color: "bg-[#0A66C2]",
    icon: (
      <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.4 },
  }),
};

const Links = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    document.title = "Links — IBRP";
    getRecentArticles([]).then((a) => setArticles(a.slice(0, 3)));
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-lg mx-auto px-4 py-8 flex flex-col items-center gap-8">
        {/* Header */}
        <motion.div
          className="flex flex-col items-center text-center gap-3"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
        >
          <img
            src="/favicon.ico"
            alt="IBRP Logo"
            className="w-28 h-28 rounded-full object-cover border-4 border-primary/20 shadow-lg"
          />
          <h1 className="font-heading font-bold text-xl text-foreground leading-tight">
            Instituto Brasileiro de Riscos Psicossociais
          </h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            Prevenção de estresse, burnout e conflitos no ambiente corporativo.
          </p>
        </motion.div>

        {/* Main links */}
        <motion.div
          className="w-full flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          <a href="/#inicio">
            <Button className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-base px-6 py-5 rounded-xl glow text-white">
              Visite o site do IBRP
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="/#palestras">
            <Button className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-base px-6 py-5 rounded-xl glow text-white">
              Palestras e Treinamentos Corporativos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a href="/#contato">
            <Button className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-base px-6 py-5 rounded-xl glow text-white">
              Solicite um Diagnóstico para sua Empresa
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </motion.div>

        {/* Central de Inteligência */}
        <motion.div
          className="w-full flex flex-col gap-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
        >
          <h2 className="font-heading font-bold text-lg text-foreground text-center">
            Central de Inteligência
          </h2>

          {articles.length > 0 && (
            <div className="grid grid-cols-1 gap-3">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  to={`/blog/${article.slug}`}
                  className="group flex gap-3 items-start rounded-xl border border-border bg-card p-3 hover:shadow-md transition-shadow"
                >
                  {article.coverImage && (
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  )}
                  <span className="text-sm font-medium text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-3">
                    {article.title}
                  </span>
                </Link>
              ))}
            </div>
          )}

          <a href="/blog#newsletter-signup" className="w-full">
            <Button className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-base px-6 py-5 rounded-xl glow text-white">
              Assine a Newsletter da Central de Inteligência
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </motion.div>

        {/* Capacitação */}
        <motion.div
          className="w-full flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
        >
          <h2 className="font-heading font-bold text-lg text-foreground text-center">
            Capacitação
          </h2>
          <Link to="/curso-NR1-gestao">
            <Button className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-base px-6 py-5 rounded-xl glow text-white text-left leading-tight">
              Curso: Gestão de Riscos Psicossociais
            </Button>
          </Link>
          <Link to="/curso-NR1-terapeutas-PICS">
            <Button className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-sm px-6 py-5 rounded-xl glow text-white text-left leading-tight whitespace-normal h-auto">
              Curso: Terapeutas Integrativos nas Empresas — Atuação em Riscos
              Psicossociais alinhada à NR-1
            </Button>
          </Link>
        </motion.div>

        {/* Mídias */}
        <motion.div
          className="w-full flex flex-col gap-3"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
        >
          <h2 className="font-heading font-bold text-lg text-foreground text-center">
            Mídias
          </h2>
          <a
            href="https://www.youtube.com/playlist?list=PLhjg63juc_8eKS7H8EdSNqAtzQhtwnaOR"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-base px-6 py-5 rounded-xl glow text-white">
              <Play className="mr-2 h-4 w-4" />
              Série de Videocasts Janeiro Branco
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </a>

          <div className="flex items-center justify-center gap-4 pt-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${s.color} hover:opacity-90 shadow-md hover:shadow-lg hover:scale-105`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer mini */}
        <p className="text-xs text-muted-foreground text-center pt-4 pb-2">
          © 2026 IBRP — Instituto Brasileiro de Riscos Psicossociais
        </p>
      </div>
    </div>
  );
};

export default Links;
