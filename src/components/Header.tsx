import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoHorizontal from "@/assets/logo-horizontal-black.png";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre o IBRP", href: "#sobre" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "NR-1", href: "#nr-1" },
  { label: "Palestras e Treinamentos", href: "#palestras" },
  { label: "Cursos", href: "#cursos" },
  { label: "Central de Inteligência", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

const sectionIds = navItems
  .filter((item) => item.href.startsWith("#"))
  .map((item) => item.href.slice(1));

const clientLinks = [
  { label: "Inventário de Riscos", description: "Ferramenta de mapeamento de riscos psicossociais", href: "https://inventario.gestaoriscospsicossociais.com.br" },
  { label: "Ambiente Virtual de Aprendizagem", description: "Acesse seus treinamentos corporativos", href: "https://ava.gestaoriscospsicossociais.com.br" },
];

const scrollToElement = (id: string, currentPath: string, navigateFn: (path: string) => void) => {
  if (currentPath !== "/") {
    navigateFn("/#" + id);
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (attempts < 20) {
        setTimeout(() => tryScroll(attempts + 1), 50);
      }
    };
    setTimeout(() => tryScroll(), 50);
  } else {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

function useActiveSection() {
  const [active, setActive] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      setActive("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return active;
}

const NavLink = ({
  item,
  onClick,
  activeSection,
}: {
  item: (typeof navItems)[0];
  onClick?: () => void;
  activeSection?: string;
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInternal = item.href.startsWith("/");
  const isAnchor = item.href.startsWith("#");
  const isActive =
    (isAnchor && activeSection === item.href.slice(1)) ||
    (isInternal && location.pathname === item.href);

  const className = `text-sm font-medium transition-colors ${
    isActive
      ? "text-primary"
      : "text-muted-foreground hover:text-foreground"
  }`;

  if (isInternal) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }

  if (isAnchor) {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (location.pathname !== "/") {
        navigate("/" + item.href);
        const tryScroll = (attempts = 0) => {
          const el = document.querySelector(item.href);
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          } else if (attempts < 20) {
            setTimeout(() => tryScroll(attempts + 1), 50);
          }
        };
        setTimeout(() => tryScroll(), 50);
      } else {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
      onClick?.();
    };
    return (
      <a href={item.href} className={className} onClick={handleClick}>
        {item.label}
      </a>
    );
  }

  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection();

  const handleScrollToContato = () => scrollToElement("contato", location.pathname, navigate);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <img src={logoHorizontal} alt="IBRP - Instituto Brasileiro de Riscos Psicossociais" className="h-10 md:h-12" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} activeSection={activeSection} />
          ))}
          <Button
            className="bg-gradient-brand hover:opacity-90 transition-opacity"
            onClick={handleScrollToContato}
          >
            Solicite Orçamento
          </Button>
          {/* Área do Cliente — temporariamente oculto
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="outline"
              className="inline-flex items-center gap-1.5"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Área do Cliente <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          */}
        </nav>

        {/* Mobile: CTA + toggle */}
        <div className="md:hidden flex items-center gap-2">
          <Button
            size="sm"
            className="bg-gradient-brand hover:opacity-90 transition-opacity text-xs px-3"
            onClick={() => {
              setIsOpen(false);
              handleScrollToContato();
            }}
          >
            Solicite Orçamento
          </Button>
          <button className="text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} onClick={() => setIsOpen(false)} activeSection={activeSection} />
          ))}
          {/* Área do Cliente mobile — temporariamente oculto */}
        </nav>
      )}
    </header>
  );
};

export default Header;
