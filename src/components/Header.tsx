import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoHorizontal from "@/assets/logo-horizontal-black.png";

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "Soluções NR-1", href: "#servicos" },
  { label: "Palestras", href: "#palestras" },
  { label: "Cursos", href: "#cursos" },
  { label: "Blog", href: "/blog" },
];

const NavLink = ({ item, onClick }: { item: typeof navItems[0]; onClick?: () => void }) => {
  const isInternal = item.href.startsWith("/");
  const className = "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors";

  if (isInternal) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/">
          <img src={logoHorizontal} alt="IBRP - Instituto Brasileiro de Riscos Psicossociais" className="h-10 md:h-12" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
          <Button asChild className="bg-gradient-brand hover:opacity-90 transition-opacity">
            <a href="#area-cliente">Área do Cliente</a>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} onClick={() => setIsOpen(false)} />
          ))}
          <Button asChild className="bg-gradient-brand w-full">
            <a href="#area-cliente">Área do Cliente</a>
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
