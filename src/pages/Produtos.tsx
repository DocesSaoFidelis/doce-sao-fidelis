import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, Leaf } from "lucide-react";
import productBananada from "@/assets/product-bananada.jpg";
import productBanacai from "@/assets/product-banacai.jpg";
import productBanagoiaba from "@/assets/product-banagoiaba.jpg";

const produtos = [
  {
    id: 1,
    nome: "Bananada",
    imagem: productBananada,
    descricao: "Doce tradicional de banana sem açúcar adicionado, mantendo o sabor natural e autêntico da fruta.",
    ingredientes: "Banana, açúcar e acidulante ácido fosfórico",
    peso: "2,9kg",
    unidades: 50,
    glutenFree: true,
  },
  {
    id: 2,
    nome: "Bananada Açucarada",
    imagem: productBananada,
    descricao: "Nossa bananada clássica com açúcar adicionado para um sabor ainda mais doce e irresistível.",
    ingredientes: "Banana, açúcar, polpa de batata doce e acidulante ácido fosfórico",
    peso: "800g",
    unidades: 50,
    glutenFree: true,
  },
  {
    id: 3,
    nome: "Banaçaí",
    imagem: productBanacai,
    descricao: "Combinação perfeita de banana com açaí, unindo dois sabores tradicionais brasileiros.",
    ingredientes: "Banana, açaí, açúcar, polpa de batata doce e acidulante ácido fosfórico",
    peso: "800g",
    unidades: 50,
    glutenFree: true,
  },
  {
    id: 4,
    nome: "Banagoiaba",
    imagem: productBanagoiaba,
    descricao: "Deliciosa mistura de banana com goiaba, criando um sabor único e especial.",
    ingredientes: "Banana, goiaba, açúcar e acidulante ácido fosfórico",
    peso: "800g",
    unidades: 50,
    glutenFree: true,
  },
];

const Produtos = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-accent to-secondary py-20 text-accent-foreground">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nossos Produtos</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Conheça nossa linha completa de doces tradicionais de banana
          </p>
        </div>
      </section>

      {/* Produtos Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {produtos.map((produto) => (
              <Card key={produto.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow">
                <div className="relative h-80">
                  <img 
                    src={produto.imagem} 
                    alt={produto.nome} 
                    className="w-full h-full object-cover"
                  />
                  {produto.glutenFree && (
                    <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                      <Leaf className="h-4 w-4 mr-1" />
                      Sem Glúten
                    </Badge>
                  )}
                </div>
                <CardContent className="pt-6">
                  <h3 className="text-3xl font-bold mb-4">{produto.nome}</h3>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {produto.descricao}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <Package className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Embalagem:</p>
                        <p className="text-muted-foreground">{produto.unidades} unidades - Peso líquido: {produto.peso}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <Leaf className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold">Ingredientes:</p>
                        <p className="text-muted-foreground">{produto.ingredientes}</p>
                      </div>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                    <Link to="/orcamento">Solicitar Orçamento</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Interessado em nossos produtos?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para saber mais sobre preços, disponibilidade e condições especiais para distribuidores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
              <Link to="/orcamento">Solicitar Orçamento</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Produtos;
