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
import { Send } from "lucide-react";
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
    <section id="contato" className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-center text-white">
            Sua empresa está em conformidade?
          </h2>

          <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm p-8">
            <h3 className="text-xl font-heading font-bold mb-6 text-white">Solicite uma proposta</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                Enviar mensagem
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContatoSection;
