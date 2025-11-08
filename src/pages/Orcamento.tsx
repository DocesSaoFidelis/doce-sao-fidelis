import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Calculator } from "lucide-react";

const produtos = [
  { id: "bananada", nome: "Bananada" },
  { id: "bananada-acucarada", nome: "Bananada Açucarada" },
  { id: "banacai", nome: "Banaçaí" },
  { id: "banagoiaba", nome: "Banagoiaba" },
];

const Orcamento = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Orçamento solicitado!",
      description: "Entraremos em contato em breve com sua proposta.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="bg-gradient-to-r from-accent to-primary py-20 text-accent-foreground">
        <div className="container text-center">
          <Calculator className="h-20 w-20 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Solicite seu Orçamento</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Preencha o formulário abaixo e receba uma proposta personalizada
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-20">
        <div className="container max-w-4xl">
          <Card className="border-none shadow-2xl">
            <CardContent className="pt-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Tipo de Pessoa */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Tipo de Pessoa *</Label>
                  <RadioGroup defaultValue="pf" className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pf" id="pf" />
                      <Label htmlFor="pf" className="cursor-pointer">Pessoa Física</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pj" id="pj" />
                      <Label htmlFor="pj" className="cursor-pointer">Pessoa Jurídica</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Informações Pessoais */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="nome">Nome Completo / Razão Social *</Label>
                    <Input id="nome" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="cpfcnpj">CPF / CNPJ *</Label>
                    <Input id="cpfcnpj" required className="mt-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input id="email" type="email" required className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input id="telefone" type="tel" required className="mt-2" />
                  </div>
                </div>

                {/* Endereço de Entrega */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Endereço de Entrega</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input id="cep" required className="mt-2" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="endereco">Endereço *</Label>
                      <Input id="endereco" required className="mt-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="numero">Número *</Label>
                      <Input id="numero" required className="mt-2" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="complemento">Complemento</Label>
                      <Input id="complemento" className="mt-2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <Label htmlFor="bairro">Bairro *</Label>
                      <Input id="bairro" required className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="cidade">Cidade *</Label>
                      <Input id="cidade" required className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="estado">Estado *</Label>
                      <Input id="estado" required className="mt-2" />
                    </div>
                  </div>
                </div>

                {/* Seleção de Produtos */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Produtos de Interesse *</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {produtos.map((produto) => (
                      <div key={produto.id} className="flex items-center space-x-2">
                        <Checkbox id={produto.id} />
                        <Label htmlFor={produto.id} className="cursor-pointer">
                          {produto.nome}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quantidade Estimada */}
                <div>
                  <Label htmlFor="quantidade">Quantidade Estimada (embalagens) *</Label>
                  <Input 
                    id="quantidade" 
                    type="number" 
                    min="1" 
                    required 
                    className="mt-2" 
                    placeholder="Ex: 10"
                  />
                </div>

                {/* Como Conheceu */}
                <div>
                  <Label htmlFor="conheceu">Como conheceu a Doces São Fidélis?</Label>
                  <Input id="conheceu" className="mt-2" placeholder="Indicação, internet, etc." />
                </div>

                {/* Preferência de Retorno */}
                <div>
                  <Label className="text-lg font-semibold mb-4 block">Preferência de Retorno</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ret-telefone" />
                      <Label htmlFor="ret-telefone" className="cursor-pointer">Telefone</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ret-email" />
                      <Label htmlFor="ret-email" className="cursor-pointer">E-mail</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ret-whatsapp" />
                      <Label htmlFor="ret-whatsapp" className="cursor-pointer">WhatsApp</Label>
                    </div>
                  </div>
                </div>

                {/* Mensagem */}
                <div>
                  <Label htmlFor="mensagem">Observações ou Dúvidas</Label>
                  <Textarea 
                    id="mensagem" 
                    className="mt-2 min-h-[120px]"
                    placeholder="Informações adicionais sobre seu pedido..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-secondary hover:bg-secondary/90 text-lg py-6">
                  Solicitar Orçamento
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Orcamento;
