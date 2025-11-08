import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Factory, Award } from "lucide-react";

const Historia = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-accent py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Nossa História</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Uma jornada de tradição, sabor e dedicação que começou em 2000
          </p>
        </div>
      </section>

      {/* Linha do Tempo */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <div className="space-y-12">
            <Card className="border-l-4 border-l-secondary">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary rounded-full p-3 flex-shrink-0">
                    <Calendar className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">2000 - O Começo</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A Doces São Fidélis nasceu do sonho de Roberto Porto em criar algo especial. 
                      Começamos em uma pequena cozinha em São Fidélis/RJ, produzindo bananadas e gomas 
                      de amido com receitas cuidadosamente desenvolvidas, unindo tradição e inovação.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-accent">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-accent rounded-full p-3 flex-shrink-0">
                    <Users className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Crescimento e Tradição</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Ao longo dos anos, crescemos mantendo nossa essência familiar e nosso compromisso 
                      com a qualidade. Cada doce que produzimos carrega o carinho e a dedicação que só 
                      uma empresa familiar pode oferecer. Nossa reputação cresceu boca a boca, conquistando 
                      clientes em todo o país.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary rounded-full p-3 flex-shrink-0">
                    <Factory className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Hoje</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      Hoje, nossa fábrica moderna em São Fidélis atende diversos estados brasileiros, 
                      mantendo a tradição artesanal e o compromisso com a excelência. Combinamos 
                      equipamentos modernos com processos tradicionais para garantir que cada produto 
                      mantenha o sabor autêntico que nos tornou referência.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossa Missão */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Award className="h-16 w-16 mx-auto mb-6 text-secondary" />
              <h2 className="text-4xl font-bold mb-6">Nossa Missão</h2>
            </div>
            
            <Card className="border-none shadow-xl">
              <CardContent className="pt-8 text-center">
                <p className="text-2xl font-semibold text-secondary mb-6">
                  "Produzir doces de banana de altíssima qualidade, respeitando a tradição artesanal 
                  e o sabor autêntico que nos tornaram reconhecidos em todo o Brasil."
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Nosso objetivo é proporcionar momentos de felicidade para nossos clientes, 
                  entregando produtos que celebram o sabor genuíno do Brasil, com o toque especial 
                  que só uma empresa familiar pode oferecer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16">Nossos Valores</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-none shadow-lg">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-10 w-10 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Tradição e Família</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Somos uma empresa familiar, e cada doce que produzimos carrega o carinho e a 
                  dedicação de gerações. A tradição nos guia, mas nossa paixão pelo que fazemos 
                  é o que nos motiva a inovar a cada dia.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="h-10 w-10 text-secondary-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Qualidade</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A qualidade está no coração de tudo o que fazemos. Selecionamos cuidadosamente 
                  os ingredientes e mantemos um rigoroso controle de qualidade em todas as etapas 
                  da produção para garantir que cada produto tenha o sabor perfeito.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardContent className="pt-8">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <Factory className="h-10 w-10 text-accent-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Compromisso com a Excelência</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Em cada bananada, goma de amido e produto que produzimos, temos o compromisso 
                  de oferecer a melhor experiência aos nossos clientes. Isso é refletido no nosso 
                  processo artesanal e no cuidado com os detalhes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Historia;
