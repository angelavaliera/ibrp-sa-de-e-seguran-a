import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Scale,
  ShieldCheck,
  Instagram,
  Linkedin,
  Users,
  Briefcase,
  PlayCircle,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { syncToMailerLite } from "@/lib/sync-mailerlite";
import { trackEvent } from "@/lib/gtag";
import { formatPhone, isValidPhone, phoneDigits } from "@/lib/phone-utils";
import { useToast } from "@/hooks/use-toast";
import logoSelo from "@/assets/logo-ibrp-selo.png";
import gestaoHeroBg from "@/assets/gestao-hero-bg.jpg";
import aulaOnlineBg from "@/assets/aula-online-bg.jpg";

import profAngela from "@/assets/prof-angela.png";

import profIzabella from "@/assets/prof-izabella.png";

const CHECKOUT_URL = "https://pay.voompcreators.com.br/14076";

/* ─── Data ─── */

const modules = [
  {
    title: "Módulo 1 — Introdução: A Atualização da NR-1 e os Riscos Psicossociais",
    items: [
      "Os riscos psicossociais e a saúde mental",
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
    title: "Módulo 3 — Riscos Psicossociais e Conformidade Legal na Prática",
    items: [
      "Riscos e Responsabilidades Legais frente a NR-1",
      "Riscos e Responsabilidades Contratuais – Prestação do Serviço de Consultoria",
    ],
  },
  {
    title: "Módulo 4 — Inventário de Riscos Psicossociais",
    items: [
      "O que muda no inventário de riscos da NR-1 com os psicossociais",
      "Levantamento de indicadores de saúde mental da empresa",
      "Ferramentas de identificação e avaliação de riscos psicossociais - Questionários Internacionais e Nacionais",
      "Questionário Riscos Psicossociais IBRP",
    ],
  },
  {
    title: "Módulo 5 — Do Inventário ao Plano de Ação: a Atuação Estratégica",
    items: [
      "Da teoria à prática: Como traduzir inventários de riscos em ações concretas",
      "Ações fundamentais para gestão de riscos psicossociais",
      "Ações de acordo com os riscos levantados",
      "Definindo ações internas e ações com fornecedores",
      "Documentação exigida para comprovar a realização das ações",
    ],
  },
  {
    title: "Módulo 6 — Apresentando o Retorno do Investimento em saúde mental à empresa",
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
  { icon: Clock, label: "10 horas de conteúdo" },
  { icon: BookOpen, label: "Aulas em vídeo + material em PDF" },
  
  { icon: Calendar, label: "Acesso até 31/12/2026" },
  { icon: GraduationCap, label: "Início imediato" },
];

/* ─── Component ─── */

const CursoGestaoRiscos = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [aulaForm, setAulaForm] = useState({ nome: "", email: "", telefone: "" });
  const [aulaLoading, setAulaLoading] = useState(false);
  const [inscForm, setInscForm] = useState({ nome: "", email: "", telefone: "" });
  const [inscLoading, setInscLoading] = useState(false);
  const [showInscForm, setShowInscForm] = useState(false);

  useEffect(() => {
    document.title = "Curso Gestão de Riscos Psicossociais | IBRP";
  }, []);

  const scrollToCheckout = () =>
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });

  const validateForm = (form: { nome: string; email: string; telefone: string }) => {
    const nome = form.nome.trim();
    const email = form.email.trim();
    if (!nome || nome.length > 100) {
      toast({ title: "Nome inválido", description: "Preencha um nome válido (máx. 100 caracteres).", variant: "destructive" });
      return null;
    }
    if (!email || email.length > 255 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({ title: "E-mail inválido", description: "Preencha um e-mail válido.", variant: "destructive" });
      return null;
    }
    if (!isValidPhone(form.telefone)) {
      toast({ title: "Celular inválido", description: "Preencha o celular com DDD. Ex: (11) 99999-9999", variant: "destructive" });
      return null;
    }
    return { nome, email, tel: phoneDigits(form.telefone) };
  };

  const handleAulaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = validateForm(aulaForm);
    if (!data) return;
    
    setAulaLoading(true);
    const { error } = await supabase.from("curso_gestao_leads").insert({
      nome: data.nome,
      email: data.email,
      telefone: data.tel,
      status_funil: "aula_demo",
    } as any);
    setAulaLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar", description: "Tente novamente.", variant: "destructive" });
      return;
    }
    syncToMailerLite({ email: data.email, nome: data.nome, source: "curso_gestao", group_id: "182467397207197054", fields: { phone: data.tel, status_funil: "aula_demo" } });
    sessionStorage.setItem("aula-experimental-access", "true");
    navigate("/aula-experimental");
  };

  const handleInscSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = validateForm(inscForm);
    if (!data) return;

    setInscLoading(true);
    const { error } = await supabase.from("curso_gestao_leads").insert({
      nome: data.nome,
      email: data.email,
      telefone: data.tel,
      status_funil: "clicou_inscricao",
    } as any);
    setInscLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar", description: "Tente novamente.", variant: "destructive" });
      return;
    }
    syncToMailerLite({ email: data.email, nome: data.nome, source: "curso_gestao", group_id: "182467397207197054", fields: { phone: data.tel, status_funil: "clicou_inscricao" } });
    trackEvent("clique_matricula_curso", { curso: "gestao_riscos" });
    window.open(CHECKOUT_URL, "_blank");
    setShowInscForm(false);
    setInscForm({ nome: "", email: "", telefone: "" });
  };

  return (
    <div className="min-h-screen" style={{ background: "hsl(228, 40%, 95%)" }}>
      <Header />

      {/* ── Hero ── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute inset-0">
          <img src={gestaoHeroBg} alt="Alunos conversando no curso Gestão de riscos psicossociais NR-1 do Instituto Brasileiro de Riscos Psicossociais - IBRP" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "hsla(228, 54%, 31%, 0.85)" }} />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, hsl(166 62% 39% / 0.3) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(329 73% 44% / 0.15) 0%, transparent 50%)",
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
              <Briefcase className="h-4 w-4 text-fucsia" />
              <span className="text-sm font-medium text-white/90">
                Programa de Capacitação • IBRP
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6 text-white">
              Gestão de Riscos Psicossociais
            </h1>

            <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/70">
              Capacitação para{" "}
              <strong className="text-white">profissionais que desejam atuar</strong> com
              gestão de riscos psicossociais em empresas, em conformidade com a NR-1.
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
      <section className="py-6 border-b" style={{ background: "hsl(228, 40%, 90%)", borderColor: "hsl(228, 30%, 85%)" }}>
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
                  Em maio de 2025 passou a ser exigido que{" "}
                  <strong className="text-foreground">todas as empresas</strong> com empregados CLT
                  precisam identificar, avaliar e controlar os riscos psicossociais no Programa de
                  Gerenciamento de Riscos (PGR).
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Isso abre uma <strong className="text-foreground">oportunidade para profissionais de diversas áreas</strong>{" "}
                  atuarem estrategicamente nas empresas com implementação e gerenciamento de riscos
                  psicossociais corporativos.
                </p>
              </div>

              <div
                className="rounded-2xl border border-[hsl(228_30%_85%)] p-8"
                style={{ background: "hsl(228, 30%, 94%)", boxShadow: "var(--shadow-card)" }}
              >
                <ShieldCheck className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-heading font-bold mb-4">O que mudou?</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "Riscos psicossociais devem constar no PGR",
                    "Empresas precisam identificar, avaliar e controlar esses riscos",
                    "Gestores são corresponsáveis pela saúde mental dos colaboradores",
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
      <section className="py-16" style={{ background: "hsl(228, 40%, 92%)" }}>
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
              Destinado a gestores, líderes, profissionais de RH, de SESMT, advogados e consultores que precisam entender as obrigações legais e implementar um programa eficaz de gerenciamento de riscos psicossociais em organizações, em conformidade com a NR-1.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Objetivo do Curso ── */}
      <section className="py-16">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-sm font-medium text-primary uppercase tracking-widest">
              Propósito
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-5">
              Objetivo do curso
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Capacitar profissionais para uma atuação estratégica no contexto empresarial, com foco na identificação, no desenvolvimento e na execução de ações voltadas à mitigação dos riscos psicossociais da NR-1.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Qualificar profissionais tornando-os aptos a propor, implementar e monitorar intervenções efetivas em saúde mental no ambiente corporativo, promovendo a redução do estresse, prevenção do adoecimento ocupacional e o fortalecimento do bem-estar coletivo nas empresas, em conformidade com a legislação trabalhista e com a NR-1.
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
              5 módulos para sua{" "}
              <span className="text-gradient">atuação estratégica</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Do entendimento legal à prática corporativa: tudo o que você precisa para gerir riscos
              psicossociais com segurança e competência.
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
                    className="rounded-xl border border-[hsl(228_30%_85%)] px-6"
                    style={{ background: "hsl(228, 30%, 94%)", boxShadow: "var(--shadow-card)" }}
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
      <section className="py-20" style={{ background: "hsl(228, 40%, 92%)" }}>
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

          <div className="grid sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
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
                <p className="text-sm text-primary font-medium whitespace-pre-line">
                  {prof.role}
                </p>
                <p className="text-xs text-muted-foreground mt-2 mb-3 leading-relaxed">
                  {prof.bio}
                </p>
                {(prof.socials.linkedin || prof.socials.instagram) && (
                  <div className="flex items-center justify-center gap-3 mt-2">
                    {prof.socials.linkedin && (
                      <a
                        href={prof.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {prof.socials.instagram && (
                      <a
                        href={prof.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
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
          <img src={aulaOnlineBg} alt="Aluna assistindo aula online do Instituto Brasileiro de Riscos Psicossociais - IBRP" className="w-full h-full object-cover -scale-x-100" />
          <div className="absolute inset-0" style={{ background: "hsla(228, 54%, 31%, 0.88)" }} />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(circle at 30% 50%, hsl(166 62% 39% / 0.3) 0%, transparent 60%), radial-gradient(circle at 80% 20%, hsl(329 73% 44% / 0.15) 0%, transparent 50%)",
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
              Conheça o curso por dentro
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
                maxLength={100}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                type="email"
                placeholder="Seu melhor e-mail"
                value={aulaForm.email}
                onChange={(e) => setAulaForm((f) => ({ ...f, email: e.target.value }))}
                required
                maxLength={255}
                className="h-12 rounded-xl bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Input
                type="tel"
                placeholder="Celular com DDD"
                value={aulaForm.telefone}
                onChange={(e) => setAulaForm((f) => ({ ...f, telefone: formatPhone(e.target.value) }))}
                required
                maxLength={15}
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

      <section id="checkout" className="py-20">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-lg mx-auto"
          >
            <div
              className="rounded-3xl border-2 border-[hsl(228_30%_75%)] p-10 text-center relative overflow-hidden"
              style={{ background: "hsl(228, 30%, 94%)", boxShadow: "var(--shadow-glow)" }}
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-brand" />


              <h2 className="text-2xl font-heading font-bold mb-2">Garanta sua vaga</h2>
              <p className="text-muted-foreground mb-8">
                Início imediato • Acesso até 31/12/2026
              </p>

              <div className="mb-2">
                <span className="text-sm text-muted-foreground">Investimento</span>
              </div>
              <div className="text-3xl font-heading font-bold text-foreground mb-1">
                6x de R$ 163,87
              </div>
              <p className="text-base text-muted-foreground mb-8">
                ou à vista <strong className="text-foreground text-lg">R$ 890,00</strong>
              </p>

              <Button
                size="lg"
                className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-lg py-6 rounded-xl glow text-white"
                onClick={() => { setShowInscForm(true); document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" }); }}
              >
                Quero me inscrever
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                {[
                  "10h de conteúdo em vídeo + PDFs",
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

          {showInscForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto mt-10"
            >
              <div className="rounded-2xl border border-[hsl(228_30%_85%)] p-8" style={{ background: "hsl(228, 30%, 94%)", boxShadow: "var(--shadow-card)" }}>
                <h3 className="text-xl font-heading font-bold mb-2 text-center">Preencha seus dados</h3>
                <p className="text-sm text-muted-foreground mb-6 text-center">Após o envio, você será direcionado(a) para a página de pagamento.</p>
                <form onSubmit={handleInscSubmit} className="space-y-4">
                  <Input placeholder="Seu nome completo" value={inscForm.nome} onChange={(e) => setInscForm(f => ({ ...f, nome: e.target.value }))} required maxLength={100} className="h-12 rounded-xl" />
                  <Input type="email" placeholder="Seu melhor e-mail" value={inscForm.email} onChange={(e) => setInscForm(f => ({ ...f, email: e.target.value }))} required maxLength={255} className="h-12 rounded-xl" />
                  <Input type="tel" placeholder="Celular com DDD" value={inscForm.telefone} onChange={(e) => setInscForm(f => ({ ...f, telefone: formatPhone(e.target.value) }))} required maxLength={15} className="h-12 rounded-xl" />
                  <Button type="submit" size="lg" disabled={inscLoading} className="w-full bg-gradient-brand hover:opacity-90 transition-opacity text-lg py-6 rounded-xl glow text-white">
                    {inscLoading ? "Enviando..." : "Continuar para pagamento"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA final ── */}
      <section className="py-16" style={{ background: "hsl(228, 54%, 31%)" }}>
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
              Proteja sua empresa e seus colaboradores
            </h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Esteja em conformidade com a NR-1 e promova um ambiente de trabalho mais saudável e
              produtivo.
            </p>
            <Button
              size="lg"
              className="bg-gradient-brand hover:opacity-90 transition-opacity text-lg px-8 py-6 rounded-xl glow text-white"
              onClick={() => { setShowInscForm(true); document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Quero me inscrever
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CursoGestaoRiscos;
