import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  Heart,
  Scale,
  ShieldCheck,
  Instagram,
  Linkedin,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { PlayCircle } from "lucide-react";
import aulaOnlineBg from "@/assets/aula-online-bg.jpg";
import terapeutasHeroBg from "@/assets/terapeutas-hero-bg.jpg";

import profAngela from "@/assets/prof-angela.png";
import profElaine from "@/assets/prof-elaine.png";
import profIvanize from "@/assets/prof-ivanize.png";
import profIzabella from "@/assets/prof-izabella.png";
import logoSelo from "@/assets/logo-ibrp-selo.png";

const CHECKOUT_URL =
  "https://pay.voompcreators.com.br/11613/offer/o4EZpp/?ch_id=2399";

/* ─── Data ─── */

const modules = [
  {
    title: "Módulo 1 — Introdução: A Atualização da NR-1 e os Riscos Psicossociais",
    items: [
      "Os riscos psicossociais, a saúde mental e a oportunidade para Terapeutas Integrativos",
      "Fundamentos Jurídicos e Normativos da saúde mental no trabalho",
      "Estrutura base para adequação à NR-1",
    ],
  },
  {
    title: "Módulo 2 — Compreendendo as Fontes e os Impactos dos Riscos Psicossociais",
    items: [
      "Categorias de riscos psicossociais e suas causas",
      "Os impactos nas pessoas: saúde mental, física e social do trabalhador",
      "Os impactos nas empresas: econômicos, produtivos e jurídicos",
      "Os impactos na economia, na sociedade e no mundo",
    ],
  },
  {
    title: "Módulo 3 — Práticas Integrativas aplicadas às Empresas",
    items: [
      "As Práticas Integrativas Continuadas de Saúde (PICS) no Brasil",
      "Reconhecimento legal: OMS, ONU, SUS, PNPIC",
      "Quais PICS podem ser aplicadas no ambiente corporativo e por quê",
      "Evidências científicas",
      "Como funcionam os 3 modelos de implantação empresarial",
      "Cases reais de empresas com PICS",
    ],
  },
  {
    title: "Módulo 4 — Saúde e Segurança do Trabalho para Terapeutas Integrativos",
    items: [
      "Visão ampliada de Saúde e Segurança",
      "Como o terapeuta entra nos pilares de Prevenção, Promoção, Proteção e Bem-Estar",
      "Conexão entre SST, RH, PICS, Saúde Mental e Cultura Organizacional e de Segurança",
      "Diálogo com SESMT, PCMSO, PGR, CIPA, ISO 45003",
    ],
  },
  {
    title: "Módulo 5 — Do Inventário ao Plano de Ação: a Atuação Estratégica do Terapeuta",
    items: [
      "Como são levantados os riscos psicossociais de uma empresa, conhecendo ferramentas",
      "Da teoria à prática: Como traduzir relatórios de riscos em ações terapêuticas",
      "Estudos de Casos Práticos",
      "Documentos e Ferramentas",
      "Limites e responsabilidades profissionais",
    ],
  },
  {
    title: "Módulo 6 — As Práticas Integrativas sob a Ótica do RH Corporativo",
    items: [
      "O RH e o Universo das Organizações",
      "Postura Profissional e Ética Organizacional",
      "Comunicação e Linguagem Corporativa",
      "Entendendo o Valor: Indicadores e Resultados",
      "Parcerias Sustentáveis e Integração Corporativa",
      "Autogestão, Imagem e Sustentabilidade Profissional",
    ],
  },
  {
    title: "Módulo 7 — Riscos Psicossociais e Conformidade Legal na Prática",
    items: [
      "Riscos e Responsabilidades Legais frente a NR-1",
      "Riscos e Responsabilidades Contratuais – Prestação do Serviço de Consultoria",
    ],
  },
  {
    title: "Módulo 8 — Apresentando o Retorno do Investimento em saúde mental à empresa",
    items: ["Cálculo de ROI – Return of Investment"],
  },
];

const professors = [
  {
    name: "Angela Valiera Mascarenhas",
    role: "Diretora do IBRP",
    bio: "Consultora empresarial, especialista em desenvolvimento de human skills, criatividade e liderança. Jornalista, Palestrante e Professora em MBAs. Certificada pelo Harvard Manage Mentor. Coach de Executivos e alta liderança com atuação em 14 países.",
    photo: profAngela,
    socials: {
      linkedin: "https://www.linkedin.com/in/angelavaliera/",
      instagram: "https://www.instagram.com/angelavaliera/",
    },
  },
  {
    name: "Elaine Reginaldo",
    role: "Terapeuta de PICS e Enfermeira\nEspecialista em Segurança do Trabalho e NRs",
    bio: "Enfermeira do Trabalho e Terapeuta de PICS. 30 anos de experiência com Saúde do Trabalhador. Especialista em Saúde Ocupacional, Medicina Tradicional Chinesa, Naturopatia e Neurociências. Coautora do livro 'Como Cuidar da Ansiedade'.",
    photo: profElaine,
    socials: {
      instagram: "https://www.instagram.com/elainereginnaldo/",
    },
  },
  {
    name: "Ivanize Martins Moraes Silva",
    role: "Gestora de RH e Consultora de Transformação Empresarial",
    bio: "Mais de 15 anos em posições de liderança em multinacionais de grande porte. MBA em Gestão de Pessoas e Administração de Empresas (FGV). Certificada em ESG, DISC, Coaching e PNL. Especialista em transformação cultural e governança corporativa.",
    photo: profIvanize,
    socials: {},
  },
  {
    name: "Izabella Alonso Soares",
    role: "Advogada Trabalhista\nEspecialista em NR-1 e Consultora Empresarial",
    bio: "Sócia fundadora da Alonso Pistun Advocacia. Especialista em Direito do Trabalho com MBA em Gestão do Valor Humano nos Negócios. Vice-presidente da Comissão do Pacto Global da OAB/PR e Líder Regional do Pacto Global da ONU Brasil.",
    photo: profIzabella,
    socials: {
      linkedin: "https://www.linkedin.com/in/izabellaalonsosoares/",
      instagram: "https://www.instagram.com/izabellaalonsosoares/",
    },
  },
];

const highlights = [
  { icon: Clock, label: "30 horas de conteúdo" },
  { icon: BookOpen, label: "Aulas em vídeo + material em PDF" },
  { icon: Users, label: "Grupo exclusivo no Telegram" },
  { icon: Calendar, label: "Acesso até 31/12/2026" },
  { icon: GraduationCap, label: "Início imediato" },
];

/* ─── Component ─── */

const CursoTerapeutasPICS = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [aulaForm, setAulaForm] = useState({ nome: "", email: "" });
  const [aulaLoading, setAulaLoading] = useState(false);

  const scrollToCheckout = () =>
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });

  const handleAulaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aulaForm.nome.trim() || !aulaForm.email.trim()) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    setAulaLoading(true);
    const { error } = await supabase.from("curso_pics_leads").insert({
      nome: aulaForm.nome.trim(),
      email: aulaForm.email.trim(),
    });
    setAulaLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar", description: "Tente novamente.", variant: "destructive" });
      return;
    }
    sessionStorage.setItem("aula-experimental-pics-access", "true");
    navigate("/aula-experimental-pics");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={terapeutasHeroBg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-caqui/85" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, hsl(18 81% 53% / 0.4) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(329 73% 44% / 0.2) 0%, transparent 50%)",
            }}
          />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <Heart className="h-4 w-4 text-fucsia" />
              <span className="text-sm font-medium text-white/90">
                Programa de Capacitação • IBRP
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-white">
              Terapeutas Integrativos nas Empresas:{" "}
              <span className="text-gradient">
                Atuação em Riscos Psicossociais alinhada à NR-1
              </span>
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/70">
              Para você ir além do atendimento individual, contribuindo para a{" "}
              <strong className="text-white">saúde mental coletiva</strong> nas
              empresas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow text-white"
                onClick={scrollToCheckout}
              >
                Quero me inscrever
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 rounded-xl border-white/20 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                onClick={() =>
                  document
                    .getElementById("programa")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Ver Grade Curricular
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Highlights bar ── */}
      <section className="py-6 bg-caqui/10 border-b border-caqui/20">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {highlights.map((h, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <h.icon className="h-4 w-4 text-primary" />
                <span>{h.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contexto Legal ── */}
      <section className="py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-sm font-medium text-laranja-alerta uppercase tracking-widest flex items-center gap-2">
                  <Scale className="h-4 w-4" />
                  Contexto Legal
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-5">
                  A NR-1 agora exige{" "}
                  <span className="text-gradient">gestão de riscos psicossociais</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                 Em maio de 2025 passou a ser exigido que <strong className="text-foreground">todas as empresas</strong> com empregados CLT precisam identificar, avaliar e controlar
                  os riscos psicossociais no Programa de Gerenciamento de Riscos (PGR).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Isso abre uma <strong className="text-foreground">oportunidade inédita</strong>{" "}
                  para Terapeutas Integrativos atuarem estrategicamente nas empresas, oferecendo
                  soluções eficazes em saúde mental e bem-estar organizacional.
                </p>
              </div>

              <div className="bg-card rounded-2xl border border-border p-8" style={{ boxShadow: "var(--shadow-card)" }}>
                <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-bold mb-4">O que mudou?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Riscos psicossociais devem constar no PGR",
                    "Empresas precisam identificar, avaliar e controlar esses riscos",
                    "Terapeutas de PICS podem atuar no plano de ação pós-inventário",
                    "Demanda crescente por profissionais qualificados",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Público-alvo ── */}
      <section className="py-16 bg-caqui/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              Para quem é esse curso?
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-5">
              Público-alvo
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Destinado a terapeutas das Práticas Integrativas e Complementares em Saúde (PICS)
              — aromaterapeutas, arteterapeutas, instrutores de meditação, professores de yoga,
              massoterapeutas e outros profissionais que desejam{" "}
              <strong className="text-foreground">
                ampliar sua atuação para o ambiente corporativo
              </strong>
              , atendendo empresas que buscam cumprir as exigências de saúde mental e riscos
              psicossociais da NR-1.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Grade Curricular ── */}
      <section id="programa" className="py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-medium text-indigo uppercase tracking-widest">
              Grade Curricular
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
              8 módulos para sua{" "}
              <span className="text-gradient">atuação estratégica</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Do entendimento legal à prática corporativa: tudo o que você precisa para atuar com segurança e competência.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {modules.map((mod, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <AccordionItem
                    value={`mod-${i}`}
                    className="rounded-xl border border-border bg-card px-6"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <AccordionTrigger className="text-left font-heading font-semibold text-base hover:no-underline">
                      {mod.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 pb-2">
                        {mod.items.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ── Professoras ── */}
      <section className="py-20 bg-caqui/5">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-medium text-fucsia uppercase tracking-widest">
              Corpo Docente
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-4">
              Aprenda com quem <span className="text-gradient">faz na prática</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {professors.map((prof, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-36 h-36 mx-auto mb-5 rounded-full overflow-hidden ring-4 ring-primary/20">
                  <img
                    src={prof.photo}
                    alt={`Professora ${prof.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-heading font-bold">{prof.name}</h3>
                <p className="text-sm text-primary font-medium whitespace-pre-line">{prof.role}</p>
                <p className="text-xs text-muted-foreground mt-2 mb-3 leading-relaxed">{prof.bio}</p>
                {(prof.socials.linkedin || prof.socials.instagram) && (
                  <div className="flex items-center justify-center gap-3 mt-2">
                    {prof.socials.linkedin && (
                      <a href={prof.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {prof.socials.instagram && (
                      <a href={prof.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                        <Instagram className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Aula Experimental ── */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={aulaOnlineBg} alt="Pessoa assistindo aula online no notebook" className="w-full h-full object-cover -scale-x-100" />
          <div className="absolute inset-0 bg-caqui/85" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, hsl(166 62% 39% / 0.4) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(329 73% 44% / 0.2) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm">
              <PlayCircle className="h-4 w-4 text-fucsia" />
              <span className="text-sm font-medium text-white/90">Aula Experimental</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white">
              Conheça o curso <span className="text-gradient">por dentro</span>
            </h2>
            <p className="text-white/70 mb-10 max-w-xl mx-auto">
              Assista gratuitamente a uma aula real do curso e veja na prática como é a experiência de aprendizado. Preencha seus dados abaixo para liberar o acesso.
            </p>

            <form
              onSubmit={handleAulaSubmit}
              className="max-w-md mx-auto space-y-4"
            >
              <Input
                placeholder="Seu nome completo"
                value={aulaForm.nome}
                onChange={(e) => setAulaForm((f) => ({ ...f, nome: e.target.value }))}
                required
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={aulaForm.email}
                onChange={(e) => setAulaForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                size="lg"
                disabled={aulaLoading}
                className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-lg py-6 rounded-xl glow text-white"
              >
                {aulaLoading ? "Enviando..." : "Assistir aula experimental"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── Checkout ── */}
      <section id="checkout" className="py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div
              className="rounded-3xl border-2 border-primary/30 bg-card p-10 text-center relative overflow-hidden"
              style={{ boxShadow: "var(--shadow-glow)" }}
            >
              {/* Decorative top gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-brand" />

              <img
                src={logoSelo}
                alt="Selo IBRP"
                className="w-16 h-16 mx-auto mb-6 object-contain"
              />

              <h2 className="text-2xl font-heading font-bold mb-2">
                Garanta sua vaga
              </h2>
              <p className="text-muted-foreground mb-8">
                Início imediato • Acesso até 31/12/2026
              </p>

              <div className="mb-2">
                <span className="text-sm text-muted-foreground">Investimento</span>
              </div>
              <div className="text-3xl font-heading font-bold text-foreground mb-1">
                10x de R$ 219,53
              </div>
              <p className="text-base text-muted-foreground mb-8">
                ou à vista <strong className="text-foreground text-lg">R$ 1.880</strong>
              </p>

              <Button
                size="lg"
                className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-lg py-6 rounded-xl glow text-white"
                asChild
              >
                <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                  Quero me inscrever
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>


              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                {[
                  "30h de conteúdo em vídeo + PDFs",
                  "Grupo exclusivo no Telegram para dúvidas",
                  "Certificado de conclusão",
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-16 bg-caqui">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Amplie seu campo de atuação profissional
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Torne-se referência em saúde mental corporativa e atenda à crescente demanda do mercado.
            </p>
            <Button
              size="lg"
              className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow text-white"
              asChild
            >
              <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer">
                Quero me inscrever
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CursoTerapeutasPICS;
