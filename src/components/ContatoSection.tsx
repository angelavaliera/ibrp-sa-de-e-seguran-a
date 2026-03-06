import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const companySize = ["1-50", "51-200", "201-500", "+500"];
const interests = [
  "Serviços de Gestão de Riscos Psicossociais",
  "Palestras e Treinamentos Corporativos",
  "Cursos de Capacitação",
  "Coaching de Liderança",
];

const ContatoSection = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    empresa: "",
    cargo: "",
    tamanho: "",
    interesse: "",
    mensagem: "",
  });
  const [lgpd, setLgpd] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lgpd) {
      toast({
        title: "Consentimento necessário",
        description: "Marque a caixa de consentimento LGPD para continuar.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Solicitação enviada!",
      description: "Nossa equipe entrará em contato em breve.",
    });
    setForm({ nome: "", email: "", empresa: "", cargo: "", tamanho: "", interesse: "", mensagem: "" });
    setLgpd(false);
  };

  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary uppercase tracking-widest">Diagnóstico</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Sua empresa está em conformidade?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Descubra como a sua organização está em relação às exigências da NR-1 para riscos psicossociais. Preencha o formulário e receba um diagnóstico personalizado da nossa equipe.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              {[
                "Avaliação completa de conformidade NR-1",
                "Relatório com recomendações práticas",
                "Apoio especializado do início ao fim",
                "Metodologia validada cientificamente",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-brand shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-2xl border border-border bg-card p-8" style={{ boxShadow: "var(--shadow-card)" }}>
              <h3 className="text-xl font-heading font-bold mb-6">Solicitar Diagnóstico</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Nome</label>
                    <Input
                      required
                      value={form.nome}
                      onChange={(e) => setForm({ ...form, nome: e.target.value })}
                      placeholder="Seu nome completo"
                      className="bg-muted border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">E-mail Corporativo</label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="seu@empresa.com"
                      className="bg-muted border-border"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Empresa</label>
                    <Input
                      required
                      value={form.empresa}
                      onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                      placeholder="Nome da empresa"
                      className="bg-muted border-border"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Cargo</label>
                    <Input
                      required
                      value={form.cargo}
                      onChange={(e) => setForm({ ...form, cargo: e.target.value })}
                      placeholder="Seu cargo"
                      className="bg-muted border-border"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Tamanho da Empresa</label>
                    <Select value={form.tamanho} onValueChange={(v) => setForm({ ...form, tamanho: v })}>
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySize.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s} colaboradores
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-1.5 block">Interesse Principal</label>
                    <Select value={form.interesse} onValueChange={(v) => setForm({ ...form, interesse: v })}>
                      <SelectTrigger className="bg-muted border-border">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        {interests.map((i) => (
                          <SelectItem key={i} value={i}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Mensagem</label>
                  <Textarea
                    value={form.mensagem}
                    onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                    placeholder="Descreva brevemente o que você precisa..."
                    className="bg-muted border-border min-h-[100px] resize-none"
                    maxLength={1000}
                  />
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="lgpd-contato"
                    checked={lgpd}
                    onCheckedChange={(v) => setLgpd(v === true)}
                    className="mt-0.5"
                  />
                  <label htmlFor="lgpd-contato" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                    Concordo em receber comunicações e conteúdos estratégicos do IBRP conforme a Política de Privacidade.
                  </label>
                </div>

                <Button type="submit" className="w-full bg-gradient-brand hover:opacity-90 transition-opacity">
                  Solicitar Diagnóstico
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContatoSection;
