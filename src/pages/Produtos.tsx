import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Package, Leaf, ArrowRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

const Produtos = () => {
  const { data: products, isLoading, error } = useQuery<Tables<'products'>[]>({
    queryKey: ['publicProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true) // Apenas produtos ativos
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <section className="bg-gradient-to-r from-primary to-orange-600 py-20 text-primary-foreground">
          <div className="container text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Nossos Produtos</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Conheça nossa linha completa de doces tradicionais de banana
            </p>
          </div>
        </section>
        <div className="flex justify-center items-center flex-1 py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2 text-lg text-muted-foreground">Carregando produtos...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <section className="bg-gradient-to-r from-primary to-orange-600 py-20 text-primary-foreground">
          <div className="container text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Nossos Produtos</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Conheça nossa linha completa de doces tradicionais de banana
            </p>
          </div>
        </section>
        <div className="flex justify-center items-center flex-1 py-20 text-red-500 text-lg">
          Erro ao carregar produtos: {error.message}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-orange-600 py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nossos Produtos</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Conheça nossa linha completa de doces tradicionais de banana
          </p>
        </div>
      </section>

      {/* Produtos Grid */}
      <section className="py-20 bg-background">
        <div className="container">
          {products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {products.map((produto) => (
                <Card key={produto.id} className="overflow-hidden shadow-xl hover:shadow-2xl transition-shadow rounded-xl">
                  <div className="relative h-80">
                    {produto.image_url ? (
                      <img 
                        src={produto.image_url} 
                        alt={produto.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-lg">
                        Sem Imagem
                      </div>
                    )}
                    {/* Você pode adicionar uma lógica para 'sem glúten' se tiver um campo no DB */}
                    {/* <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-semibold">
                      <Leaf className="h-4 w-4 mr-1" />
                      Sem Glúten
                    </Badge> */}
                  </div>
                  <CardContent className="pt-6">
                    <h3 className="text-3xl font-bold mb-4">{produto.name}</h3>
                    <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                      {produto.description || 'Nenhuma descrição disponível.'}
                    </p>
                    
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Package className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Categoria:</p>
                          <p className="text-muted-foreground">{produto.category || 'Não especificada'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Leaf className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Preço:</p>
                          <p className="text-muted-foreground">R$ {produto.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Leaf className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Estoque:</p>
                          <p className="text-muted-foreground">{produto.stock} unidades</p>
                        </div>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 text-base font-semibold shadow-md">
                      <Link to="/orcamento" className="flex items-center justify-center gap-2">
                        Solicitar Orçamento <ArrowRight className="h-5 w-5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-xl text-muted-foreground">
              Nenhum produto ativo encontrado.
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-accent">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Interessado em nossos produtos?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Entre em contato conosco para saber mais sobre preços, disponibilidade e condições especiais para distribuidores
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 shadow-lg">
              <Link to="/orcamento" className="flex items-center gap-2">
                Solicitar Orçamento <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 py-6 shadow-lg">
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