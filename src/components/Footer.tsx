import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Importar Button
import logo from "@/assets/logo.png"; // Manter o import do logo para o favicon ou caso precise em outro lugar

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Top CTA Section */}
      <div className="bg-primary text-primary-foreground py-16 text-center">
        <div className="container">
          <h2 className="text-4xl font-bold mb-4">Solicite seu Orçamento</h2>
          <p className="text-lg mb-8 opacity-90">
            Entre em contato conosco e solicite um orçamento personalizado para o seu pedido
          </p>
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 py-6 text-lg font-semibold shadow-md">
            <Link to="/orcamento" className="flex items-center gap-2">
              Fazer Orçamento <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-primary" fill="hsl(var(--primary))" />
              <span className="text-2xl font-bold">Doces São Fidélis</span>
            </Link>
            <p className="text-sm opacity-90">
              Desde 2000 produzindo bananadas e gomas de amido com tradição e qualidade que atravessam gerações.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Home</Link></li>
              <li><Link to="/historia" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Nossa História</Link></li>
              <li><Link to="/produtos" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Catálogo</Link></li>
              <li><Link to="/qualidade" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Qualidade</Link></li>
              <li><Link to="/contato" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Contato</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm opacity-90">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <span>São Fidélis, RJ - Brasil</span>
              </li>
              <li className="flex items-center gap-2 text-sm opacity-90">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="tel:3298484644" className="hover:opacity-100 transition-opacity">(32) 98848-4644</a>
              </li>
              <li className="flex items-center gap-2 text-sm opacity-90">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <a href="mailto:contato@docessaofidelis.com.br" className="hover:opacity-100 transition-opacity">contato@docessaofidelis.com.br</a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Redes Sociais</h3>
            <p className="text-sm opacity-90 mb-4">Siga-nos nas redes sociais e fique por dentro das novidades!</p>
            <div className="flex gap-4">
              <a href="#" className="bg-primary p-2 rounded-full hover:opacity-90 transition-opacity" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-primary-foreground" />
              </a>
              <a href="#" className="bg-primary p-2 rounded-full hover:opacity-90 transition-opacity" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Doces São Fidélis. Todos os direitos reservados.</p>
          <Link to="/admin" className="hover:underline mt-1 block">Área Administrativa</Link>
        </div>
      </div>
    </footer>
  );
};