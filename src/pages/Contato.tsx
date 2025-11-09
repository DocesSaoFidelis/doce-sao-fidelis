import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
import { toast } from "sonner"; // Usando sonner para toasts

const Contato = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mensagem enviada!", {
      description: "Entraremos em contato em breve.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-orange-600 py-20 text-primary-foreground">
        <div className="container text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Entre em Contato</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Estamos aqui para atender você e responder todas as suas dúvidas
          </p>
        </div>
      </section>

      {/* Contato Info e Formulário */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info de Contato */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Informações de Contato</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Entre em contato conosco através de qualquer um dos canais abaixo. 
                  Teremos prazer em atender você!
                </p>
              </div>

              <Card className="border-none shadow-xl rounded-xl">
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary rounded-full p-3 flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Endereço</h3>
                      <p className="text-muted-foreground">
                        R. Alsalga Tito de Azevedo - Ipuca<br />
                        São Fidélis - RJ, 28400-000
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary rounded-full p-3 flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Telefone</h3>
                      <a href="tel:3298484644" className="text-muted-foreground hover:text-primary transition-colors">
                        (32) 98848-4644
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary rounded-full p-3 flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Horário de Atendimento</h3>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 8h às 17h<br />
                        Sábado: 8h às 12h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Formulário de Contato */}
            <Card className="border-none shadow-xl rounded-xl">
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-6">Envie uma Mensagem</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input id="nome" required className="mt-2 rounded-lg" placeholder="Seu nome" />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" required className="mt-2 rounded-lg" placeholder="seu@email.com" />
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone/WhatsApp *</Label> {/* Label alterado */}
                    <Input id="telefone" type="tel" required className="mt-2 rounded-lg" placeholder="(00) 00000-0000" /> {/* Adicionado 'required' */}
                  </div>

                  <div>
                    <Label htmlFor="assunto">Assunto *</Label>
                    <Input id="assunto" required className="mt-2 rounded-lg" placeholder="Como podemos ajudar?" />
                  </div>

                  <div>
                    <Label htmlFor="mensagem">Mensagem *</Label>
                    <Textarea 
                      id="mensagem" 
                      required 
                      className="mt-2 min-h-[150px] rounded-lg" 
                      placeholder="Escreva sua mensagem aqui..."
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 text-base font-semibold shadow-md" size="lg">
                    Enviar Mensagem <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-20 bg-accent">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Nossa Localização</h2>
          <div className="rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.123456789!2d-41.7489!3d-21.6489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDM4JzU2LjAiUyA0McKwNDQnNTYuMCJX!5e0!3m2!1spt-BR!2sbr!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Doces São Fidélis"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contato;