import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Nossa História", href: "/historia" },
  { label: "Produtos", href: "/produtos" },
  { label: "Qualidade", href: "/qualidade" },
  { label: "Contato", href: "/contato" },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} alt="Doces São Fidélis" className="h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-secondary"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild variant="default" className="bg-secondary hover:bg-secondary/90">
            <Link to="/orcamento">Solicitar Orçamento</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-lg font-medium text-foreground/80 transition-colors hover:text-secondary"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild variant="default" className="bg-secondary hover:bg-secondary/90 mt-4">
                <Link to="/orcamento">Solicitar Orçamento</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
