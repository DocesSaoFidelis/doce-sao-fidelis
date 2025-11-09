import { Link } from "react-router-dom";
import { Menu, LogIn, LayoutDashboard, Heart, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import logo from "@/assets/logo.png"; // Manter o import do logo para o favicon ou caso precise em outro lugar
import { useSession } from "@/contexts/SessionContext";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Nossa História", href: "/historia" },
  { label: "Catálogo", href: "/produtos" }, // Alterado para Catálogo
  { label: "Qualidade", href: "/qualidade" },
  { label: "Contato", href: "/contato" },
];

export const Header = () => {
  const { session, isLoading } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-card shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground text-sm py-2 hidden md:block">
        <div className="container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="tel:3298484644" className="flex items-center gap-1 hover:underline">
              <Phone className="h-4 w-4" /> (32) 98848-4644
            </a>
            <a href="mailto:contato@docessaofidelis.com.br" className="flex items-center gap-1 hover:underline">
              <Mail className="h-4 w-4" /> contato@docessaofidelis.com.br
            </a>
          </div>
          <span>Tradição desde 2000</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-8 w-8 text-primary" fill="hsl(var(--primary))" /> {/* Ícone de coração */}
          <span className="text-2xl font-bold text-foreground">Doces São Fidélis</span>
          <span className="text-sm text-muted-foreground hidden sm:block">Sabor que atravessa gerações</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="text-base font-medium text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-6 py-3 text-base font-semibold shadow-md">
            <Link to="/orcamento">Solicitar Orçamento</Link>
          </Button>

          {/* Botão Admin/Login */}
          {!isLoading && (
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg px-4 py-2 text-sm">
              {session ? (
                <Link to="/admin">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Área Admin
                </Link>
              ) : (
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" /> Login
                </Link>
              )}
            </Button>
          )}
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
                  className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 rounded-lg px-6 py-3 text-base font-semibold shadow-md">
                <Link to="/orcamento">Solicitar Orçamento</Link>
              </Button>

              {/* Botão Admin/Login para Mobile */}
              {!isLoading && (
                <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground mt-2 rounded-lg px-4 py-2 text-sm">
                  {session ? (
                    <Link to="/admin">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Área Admin
                    </Link>
                  ) : (
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" /> Login
                    </Link>
                  )}
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};