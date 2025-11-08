import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1">
            <img src={logo} alt="Doces São Fidélis" className="h-20 w-auto mb-4" />
            <p className="text-sm opacity-90">
              Tradição e sabor desde 2000. Produzindo os melhores doces de banana do Brasil.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Início</Link></li>
              <li><Link to="/historia" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Nossa História</Link></li>
              <li><Link to="/produtos" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Produtos</Link></li>
              <li><Link to="/qualidade" className="text-sm opacity-90 hover:opacity-100 transition-opacity">Qualidade</Link></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm opacity-90">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>R. Alsalga Tito de Azevedo - Ipuca, São Fidélis - RJ, 28400-000</span>
              </li>
              <li className="flex items-center gap-2 text-sm opacity-90">
                <Phone className="h-5 w-5 flex-shrink-0" />
                <a href="tel:3298484644" className="hover:opacity-100 transition-opacity">(32) 98848-4644</a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Redes Sociais</h3>
            <div className="flex gap-4">
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="opacity-90 hover:opacity-100 transition-opacity" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-accent-foreground/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Doces São Fidélis. CNPJ: 04.074.923/0001-49. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
