import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Esquema de validação para o formulário de contato
const contactFormSchema = z.object({
  name: z.string().min(1, "O nome completo é obrigatório."),
  email: z.string().email("Por favor, insira um e-mail válido.").min(1, "O e-mail é obrigatório."),
  phone_whatsapp: z.string().min(1, "O telefone/WhatsApp é obrigatório."),
  subject: z.string().min(1, "O assunto é obrigatório."),
  message: z.string().min(1, "A mensagem é obrigatória."),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contato = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_whatsapp: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      const { error } = await supabase.from('contact_messages').insert(values);

      if (error) {
        throw error;
      }

      toast.success("Mensagem enviada!", {
        description: "Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.",
      });
      form.reset(); // Limpa o formulário após o envio
    } catch (error: any) {
      console.error("Erro ao enviar mensagem:", error);
      toast.error("Erro ao enviar mensagem", {
        description: error.message || "Ocorreu um erro inesperado. Tente novamente.",
      });
    }
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
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo *</FormLabel>
                          <FormControl>
                            <Input placeholder="Seu nome" className="mt-2 rounded-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="seu@email.com" className="mt-2 rounded-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone_whatsapp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone/WhatsApp *</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(00) 00000-0000" className="mt-2 rounded-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto *</FormLabel>
                          <FormControl>
                            <Input placeholder="Como podemos ajudar?" className="mt-2 rounded-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mensagem *</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Escreva sua mensagem aqui..." className="mt-2 min-h-[150px] rounded-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-3 text-base font-semibold shadow-md" size="lg" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Enviar Mensagem <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
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