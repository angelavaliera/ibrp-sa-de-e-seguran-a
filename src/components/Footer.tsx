import logoHorizontal from "@/assets/logo-horizontal-white.png";
import { ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/20 py-14">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <img src={logoHorizontal} alt="IBRP" className="h-10 mb-4" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Instituto Brasileiro de Riscos Psicossociais. Ciência, acolhimento e transformação para ambientes de trabalho mais saudáveis.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Navegação</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li><a href="#inicio" className="hover:text-foreground transition-colors">Início</a></li>
              <li><a href="#servicos" className="hover:text-foreground transition-colors">Soluções NR-1</a></li>
              <li><a href="#palestras" className="hover:text-foreground transition-colors">Palestras</a></li>
              <li><a href="#cursos" className="hover:text-foreground transition-colors">Cursos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-4">Links Úteis</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://gestaoriscospsicossociais.com.br/questionario"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  Questionário <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://gestaoriscospsicossociais.com.br/ava"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                >
                  AVA - Ambiente Virtual <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} IBRP — Instituto Brasileiro de Riscos Psicossociais. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
