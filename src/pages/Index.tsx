import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Award, Heart, Leaf, Mail } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import productBananada from "@/assets/product-bananada.jpg";
import factoryImage from "@/assets/factory.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        </div>
        
        <div className="container relative z-10 text-center text-background">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Sabor Autêntico que Atravessa Gerações
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Desde 2000, produzindo bananadas e gomas de amido com a tradição e o carinho de uma empresa familiar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg">
              <Link to="/produtos">Veja nosso catálogo</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-background/90 hover:bg-background text-foreground text-lg">
              <Link to="/contato">Entre em contato</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Por que Escolher a Doces São Fidélis?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Mais de 20 anos de tradição, dedicação e compromisso com a qualidade
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Tradição Familiar</h3>
                <p className="text-muted-foreground">
                  Empresa familiar com receitas cuidadosamente desenvolvidas e preservadas ao longo de gerações
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Qualidade Premium</h3>
                <p className="text-muted-foreground">
                  Ingredientes selecionados e rigoroso controle de qualidade em todas as etapas de produção
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-8 text-center">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Ingredientes Naturais</h3>
                <p className="text-muted-foreground">
                  Bananas de primeira qualidade, açúcar refinado e ingredientes naturais para o melhor sabor
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Produtos Destaque */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nossos Produtos</h2>
            <p className="text-xl text-muted-foreground">
              Conheça nossa linha de doces tradicionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img src={productBananada} alt="Bananada Açucarada" className="w-full h-64 object-cover" />
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-2">Bananada Açucarada</h3>
                <p className="text-muted-foreground mb-4">
                  Nossa bananada tradicional com açúcar, sabor autêntico que conquistou o Brasil
                </p>
                <p className="text-sm font-medium">Embalagem com 50 unidades</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img src={productBananada} alt="Bananada" className="w-full h-64 object-cover" />
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-2">Bananada</h3>
                <p className="text-muted-foreground mb-4">
                  Doce de banana puro, mantendo o sabor natural da fruta
                </p>
                <p className="text-sm font-medium">Embalagem com 50 unidades</p>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <img src={productBananada} alt="Gomas Especiais" className="w-full h-64 object-cover" />
              <CardContent className="pt-6">
                <h3 className="text-2xl font-semibold mb-2">Gomas Especiais</h3>
                <p className="text-muted-foreground mb-4">
                  Banaçaí e Banagoiaba - combinações únicas de sabores tradicionais
                </p>
                <p className="text-sm font-medium">Embalagem com 50 unidades</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground">
              <Link to="/produtos">Ver todos os produtos</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Nossa Fábrica */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Nossa Fábrica</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Localizada em São Fidélis/RJ, nossa fábrica combina tradição artesanal com tecnologia moderna para garantir a melhor qualidade.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Atendemos diversos estados brasileiros, mantendo sempre o compromisso com a excelência e o sabor autêntico que nos tornou referência.
              </p>
              <Button asChild variant="default" className="bg-secondary hover:bg-secondary/90">
                <Link to="/historia">Conheça nossa história</Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src={factoryImage} alt="Fábrica Doces São Fidélis" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Mail className="h-16 w-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Cadastre-se para receber novidades</h2>
            <p className="text-lg mb-8 opacity-90">
              Fique por dentro de novos produtos, promoções e receitas especiais
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Seu melhor e-mail" 
                className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/60"
              />
              <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Cadastrar
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
