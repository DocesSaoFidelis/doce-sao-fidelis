import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Award, Heart, Leaf, Mail, ArrowRight, Factory, CheckCircle, MapPin, Star, Users, Package, Loader2, ShoppingCart } from "lucide-react"; // Adicionado ShoppingCart
import heroBanner from "@/assets/hero-banner.jpg";
import factoryImage from "@/assets/factory.jpg";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

const Index = () => {
  const { data: featuredProducts, isLoading: isLoadingFeatured, error: featuredError } = useQuery<Tables<'products'>[]>({
    queryKey: ['featuredProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true) // Apenas produtos ativos
        .order('created_at', { ascending: false })
        .limit(10); // Limita a 10 produtos em destaque para preencher a grade
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[650px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 to-foreground/40" />
        </div>
        
        <div className="container relative z-10 text-center text-background">
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full mb-6 text-sm font-semibold shadow-md">
            <Award className="h-4 w-4" /> Tradição desde 2000
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Sabor Autêntico que Atravessa Gerações
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto drop-shadow-md">
            Bananadas e gomas de amido produzidas artesanalmente com a tradição e o carinho de uma empresa familiar
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg rounded-full px-8 py-6 shadow-lg">
              <Link to="/produtos" className="flex items-center gap-2">
                Veja nosso catálogo <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg rounded-full px-8 py-6 shadow-lg">
              <Link to="/contato">Entre em contato</Link>
            </Button>
          </div>
          {/* Carousel Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-primary/50" />
            <div className="h-2 w-2 rounded-full bg-primary/50" />
          </div>
        </div>
      </section>

      {/* Newsletter Section (Moved up) */}
      <section className="py-20 bg-accent">
        <div className="container">
          <Card className="max-w-2xl mx-auto text-center p-8 shadow-xl rounded-xl">
            <CardContent className="pt-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 text-sm font-semibold">
                <Mail className="h-4 w-4" /> Fique por dentro das novidades
              </div>
              <h2 className="text-2xl font-bold mb-4">Cadastre-se para receber ofertas especiais e lançamentos</h2>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="flex-1 bg-muted/50 border-muted-foreground/20 text-foreground placeholder:text-muted-foreground rounded-full px-5 py-3"
                />
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 shadow-md">
                  Cadastrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Valores Section (New/Restyled) */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Receita Tradicional</h3>
              <p className="text-muted-foreground text-sm">Mantemos as receitas das receitas originais</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ingredientes</h3>
              <p className="text-muted-foreground text-sm">Apenas produtos de primeira qualidade</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Empresa Familiar</h3>
              <p className="text-muted-foreground text-sm">Paixão e dedicação em cada produto</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Entrega Nacional</h3>
              <p className="text-muted-foreground text-sm">Participamos de vários estados brasileiros</p>
            </div>
          </div>
        </div>
      </section>

      {/* Nossa História (Restyled) */}
      <section className="py-20 bg-accent">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-xl">
              <img src={factoryImage} alt="Nossa História" className="w-full h-auto object-cover" />
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 text-sm font-semibold">
                <MapPin className="h-4 w-4" /> São Fidélis, RJ
              </div>
              <h2 className="text-4xl font-bold mb-4">Uma Tradição que Começou em 2000</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                A Doces São Fidélis nasceu do amor pela culinária tradicional e do desejo de compartilhar
                sabores autênticos que atravessam gerações. Produzindo cada doce com o mesmo carinho e dedicação desde o primeiro dia. Nossa missão é levar o sabor da tradição para famílias em todo o Brasil.
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center gap-2 text-primary font-medium">
                  <CheckCircle className="h-5 w-5" /> Receitas tradicionais preservadas
                </span>
                <span className="flex items-center gap-2 text-green-600 font-medium">
                  <Leaf className="h-5 w-5" /> Ingredientes naturais selecionados
                </span>
              </div>
              <Button asChild variant="link" className="text-primary p-0 h-auto text-lg font-semibold">
                <Link to="/historia" className="flex items-center gap-2">
                  Conheça nossa história completa <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos Destaque (Restyled) */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4 text-sm font-semibold">
              <Award className="h-4 w-4" /> Produtos Artesanais
            </div>
            <h2 className="text-4xl font-bold mb-4">Nossos Doces Tradicionais</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada produto é feito com dedicação, seguindo receitas tradicionais que garantem o sabor
              autêntico que você procura
            </p>
          </div>

          {isLoadingFeatured ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-lg text-muted-foreground">Carregando produtos em destaque...</p>
            </div>
          ) : featuredError ? (
            <div className="text-center text-red-500 text-lg">
              Erro ao carregar produtos em destaque: {featuredError.message}
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"> {/* Alterado aqui */}
              {featuredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow rounded-lg">
                  <div className="relative h-48 w-full">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover rounded-t-lg" />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm rounded-t-lg">
                        Sem Imagem
                      </div>
                    )}
                    <Button variant="ghost" size="icon" className="absolute bottom-2 right-2 bg-white/80 hover:bg-white text-primary rounded-full p-2 shadow-md">
                      <ShoppingCart className="h-5 w-5" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1">{product.name}</h3>
                    <div className="flex items-center text-yellow-500 text-sm mb-2">
                      <Star fill="currentColor" className="h-4 w-4" />
                      <Star fill="currentColor" className="h-4 w-4" />
                      <Star fill="currentColor" className="h-4 w-4" />
                      <Star fill="currentColor" className="h-4 w-4" />
                      <Star fill="currentColor" className="h-4 w-4" />
                      <span className="ml-1 text-muted-foreground text-xs">5.0</span>
                    </div>
                    <p className="text-xl font-bold text-foreground">R$ {product.price.toFixed(2)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-xl text-muted-foreground">
              Nenhum produto em destaque ativo encontrado.
            </div>
          )}

          <div className="text-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 shadow-lg">
              <Link to="/produtos" className="flex items-center gap-2">
                Ver catálogo completo <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Processo de Produção (New Section) */}
      <section className="py-20 bg-accent">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Produção Artesanal de Qualidade</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cada etapa do nosso processo é cuidadosamente realizada para garantir produtos de excelência
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Leaf className="h-12 w-12 text-primary" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold border-2 border-accent">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Seleção de Ingredientes</h3>
              <p className="text-muted-foreground">
                Escolhemos cuidadosamente as melhores bananas e ingredientes naturais, garantindo
                frescor e qualidade desde o início
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Heart className="h-12 w-12 text-primary" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold border-2 border-accent">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Preparar Artesanal</h3>
              <p className="text-muted-foreground">
                Seguimos receitas tradicionais, preparando cada lote com dedicação e o carinho de uma empresa familiar
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <Package className="h-12 w-12 text-primary" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold border-2 border-accent">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Entrega</h3>
              <p className="text-muted-foreground">
                Embalamos com cuidado e enviamos para todo o Brasil, levando sabor e tradição até você
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-primary p-0 h-auto text-lg font-semibold">
              <Link to="/qualidade" className="flex items-center gap-2 mx-auto w-fit">
                Saiba mais sobre nossa qualidade <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section (New Section) */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">O Que Nossos Clientes Dizem</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A satisfação de quem confia em nossos produtos é nosso maior orgulho
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-xl rounded-xl p-6">
              <CardContent className="pt-0">
                <div className="flex text-primary mb-4">
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                </div>
                <p className="text-lg text-foreground mb-4 leading-relaxed">
                  "As bananadas são exatamente como a minha avó fazia! Sabor autêntico e
                  qualidade excepcional. Virei cliente fiel."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Maria Silva</p>
                    <p className="text-sm text-muted-foreground">Rio de Janeiro, RJ</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl rounded-xl p-6">
              <CardContent className="pt-0">
                <div className="flex text-primary mb-4">
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                </div>
                <p className="text-lg text-foreground mb-4 leading-relaxed">
                  "Compro para minha loja há mais de 2 anos. Os clientes, máquinas e a qualidade são
                  sempre consistentes. Recomendo muito!"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">João Santos</p>
                    <p className="text-sm text-muted-foreground">São Paulo, SP</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-xl rounded-xl p-6">
              <CardContent className="pt-0">
                <div className="flex text-primary mb-4">
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                  <Star fill="hsl(var(--primary))" className="h-5 w-5" />
                </div>
                <p className="text-lg text-foreground mb-4 leading-relaxed">
                  "Sabor incomparável! As gomas de amido são macias e deliciosas. Meus filhos livres e
                  eu fico tranquilo com ingredientes naturais."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Ana Oliveira</p>
                    <p className="text-sm text-muted-foreground">Belo Horizonte, MG</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section (New Section) */}
      <section className="py-20 bg-accent">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-5xl font-bold text-primary mb-2">25+</h3>
              <p className="text-xl text-foreground">Anos de Tradição</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-primary mb-2">Mais de 1000</h3>
              <p className="text-xl text-foreground">Clientes Satisfeitos</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-primary mb-2">15+</h3>
              <p className="text-xl text-foreground">Estados Atendidos</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold text-primary mb-2">100%</h3>
              <p className="text-xl text-foreground">Artesanal</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;