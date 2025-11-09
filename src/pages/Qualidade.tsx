import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Award, Users, Leaf, Factory } from "lucide-react";

const Qualidade = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-orange-600 py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Compromisso com a Qualidade</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Excelência em cada etapa do processo de produção
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl text-center">
          <Award className="h-20 w-20 mx-auto mb-8 text-primary" />
          <h2 className="text-4xl font-bold mb-6">Nossa Garantia de Qualidade</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A qualidade é um compromisso que assumimos com cada cliente. Mantemos os mais altos 
            padrões de produção, combinando métodos tradicionais com as melhores práticas de 
            segurança alimentar. Do início ao fim, cada etapa é cuidadosamente monitorada para 
            garantir que você receba produtos excepcionais.
          </p>
        </div>
      </section>

      {/* Pilares da Qualidade */}
      <section className="py-20 bg-accent">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">Nossos Pilares de Qualidade</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-none shadow-lg rounded-xl">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Ingredientes Selecionados</h3>
                <p className="text-muted-foreground">
                  Utilizamos apenas bananas de primeira qualidade, açúcar refinado e ingredientes naturais
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg rounded-xl">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Factory className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Processo Artesanal</h3>
                <p className="text-muted-foreground">
                  Combinamos tradição artesanal com tecnologia moderna para resultados perfeitos
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg rounded-xl">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Equipe Dedicada</h3>
                <p className="text-muted-foreground">
                  Nossa equipe familiar trabalha com paixão e dedicação em cada produto
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg rounded-xl">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">Controle Rigoroso</h3>
                <p className="text-muted-foreground">
                  Inspeção minuciosa em todas as etapas, do recebimento à expedição
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Processo de Produção */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Nosso Processo de Produção</h2>
            
            <div className="space-y-8">
              <Card className="border-l-4 border-l-primary shadow-xl rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Seleção de Ingredientes</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Começamos selecionando cuidadosamente as melhores bananas da região, garantindo 
                        que apenas frutas de primeira qualidade entrem em nossa produção. Cada lote é 
                        inspecionado individualmente.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 shadow-xl rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-white font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Preparação Artesanal</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Seguindo receitas tradicionais desenvolvidas ao longo de mais de 20 anos, 
                        preparamos cada lote com técnicas artesanais que preservam o sabor autêntico 
                        e a textura perfeita.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-primary shadow-xl rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-primary-foreground font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Controle de Qualidade</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Durante todo o processo, realizamos testes de qualidade rigorosos, verificando 
                        sabor, textura, cor e consistência. Nenhum produto sai da fábrica sem nossa 
                        aprovação final.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-orange-500 shadow-xl rounded-xl">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-orange-500 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-white font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Embalagem e Expedição</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                        Cada produto é cuidadosamente embalado para preservar sua qualidade e frescor. 
                        A expedição segue padrões rigorosos de armazenamento e transporte para garantir 
                        que chegue perfeito até você.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Certificações */}
      <section className="py-20 bg-accent">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">Conformidade e Segurança Alimentar</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Seguimos todas as normas e regulamentações de segurança alimentar estabelecidas pelos órgãos 
            competentes, garantindo que nossos produtos sejam não apenas deliciosos, mas também seguros 
            para toda a família.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge className="text-lg px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-md">CNPJ: 04.074.923/0001-49</Badge>
            <Badge className="text-lg px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-md">Indústria Brasileira</Badge>
            <Badge className="text-lg px-6 py-3 bg-primary text-primary-foreground rounded-full shadow-md">Sem Glúten</Badge>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Qualidade;