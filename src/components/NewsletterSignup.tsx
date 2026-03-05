import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const profiles = [
  "Empresário(a)",
  "Liderança",
  "RH",
  "Jurídico / Compliance",
  "Saúde e Segurança (SST)",
  "Psicologia / Saúde Mental",
  "Acadêmico",
  "Outros",
];

interface NewsletterSignupProps {
  variant?: "footer" | "article";
}

const NewsletterSignup = ({ variant = "footer" }: NewsletterSignupProps) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [perfil, setPerfil] = useState("");
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
      title: "Inscrição realizada!",
      description: "Você receberá nossos conteúdos em breve.",
    });
    setNome("");
    setEmail("");
    setPerfil("");
    setLgpd(false);
  };

  if (variant === "article") {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 md:p-8 mt-12" style={{ boxShadow: "var(--shadow-card)" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Mail className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-heading font-bold">Assine a Central de Inteligência IBRP</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          Receba análises, tendências e conteúdos estratégicos sobre saúde mental corporativa e NR-1.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            required
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="bg-muted border-border"
          />
          <Input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            className="bg-muted border-border"
          />
          <Select value={perfil} onValueChange={setPerfil}>
            <SelectTrigger className="bg-muted border-border">
              <SelectValue placeholder="Seu perfil" />
            </SelectTrigger>
            <SelectContent>
              {profiles.map((p) => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-start gap-3">
            <Checkbox
              id="lgpd-article"
              checked={lgpd}
              onCheckedChange={(v) => setLgpd(v === true)}
              className="mt-0.5"
            />
            <label htmlFor="lgpd-article" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
              Concordo em receber comunicações e conteúdos estratégicos do IBRP conforme a Política de Privacidade.
            </label>
          </div>
          <Button type="submit" className="w-full bg-gradient-brand hover:opacity-90 transition-opacity">
            Assinar Newsletter
            <Mail className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </div>
    );
  }

  // Footer variant
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <Mail className="h-5 w-5 text-primary" />
        <h4 className="font-heading font-bold">Assine a Central de Inteligência IBRP</h4>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Conteúdos estratégicos sobre saúde mental corporativa e NR-1.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          required
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          className="bg-muted border-border"
        />
        <Input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          className="bg-muted border-border"
        />
        <Select value={perfil} onValueChange={setPerfil}>
          <SelectTrigger className="bg-muted border-border">
            <SelectValue placeholder="Seu perfil" />
          </SelectTrigger>
          <SelectContent>
            {profiles.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-start gap-3">
          <Checkbox
            id="lgpd-footer"
            checked={lgpd}
            onCheckedChange={(v) => setLgpd(v === true)}
            className="mt-0.5"
          />
          <label htmlFor="lgpd-footer" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
            Concordo em receber comunicações e conteúdos estratégicos do IBRP conforme a Política de Privacidade.
          </label>
        </div>
        <Button type="submit" size="sm" className="w-full bg-gradient-brand hover:opacity-90 transition-opacity">
          Assinar
          <Mail className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
