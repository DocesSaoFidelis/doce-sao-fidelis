import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Calculator, ArrowRight, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/integrations/supabase/types";

// Esquema de validação para o formulário de orçamento
const quotationFormSchema = z.object({
  person_type: z.enum(["pf", "pj"], { message: "Selecione o tipo de pessoa." }),
  full_name: z.string().min(1, "O nome completo / razão social é obrigatório."),
  cpf_cnpj: z.string().min(1, "O CPF / CNPJ é obrigatório."),
  email: z.string().email("Por favor, insira um e-mail válido.").min(1, "O e-mail é obrigatório."),
  phone_whatsapp: z.string().min(1, "O telefone/WhatsApp é obrigatório."),
  zip_code: z.string().min(1, "O CEP é obrigatório."),
  address: z.string().min(1, "O endereço é obrigatório."),
  number: z.string().min(1, "O número é obrigatório."),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "O bairro é obrigatório."),
  city: z.string().min(1, "A cidade é obrigatória."),
  state: z.string().min(1, "O estado é obrigatório."),
  products_of_interest: z.array(z.string()).min(1, "Selecione pelo menos um produto de interesse."),
  estimated_quantity: z.coerce.number().int().min(1, "A quantidade estimada deve ser no mínimo 1."),
  how_did_you_hear: z.string().optional(),
  return_preference: z.array(z.string()).optional(),
  message: z.string().optional(),
});

type QuotationFormValues = z.infer<typeof quotationFormSchema>;

const Orcamento = () => {
  const form = useForm<QuotationFormValues>({
    resolver: zodResolver(quotationFormSchema),
    defaultValues: {
      person_type: "pf",
      full_name: "",
      cpf_cnpj: "",
      email: "",
      phone_whatsapp: "",
      zip_code: "",
      address: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
      products_of_interest: [],
      estimated_quantity: 1,
      how_did_you_hear: "",
      return_preference: [],
      message: "",
    },
  });

  const { data: products, isLoading: isLoadingProducts, error: productsError } = useQuery<Tables<'products'>[]>({
    queryKey: ['activeProducts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('id, name')
        .eq('is_active', true)
        .order('name', { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const onSubmit = async (values: QuotationFormValues) => {
    try {
      const { error } = await supabase.from('quotation_requests').insert(values);

      if (error) {
        throw error;
      }

      toast.success("Orçamento solicitado!", {
        description: "Sua solicitação foi enviada com sucesso. Entraremos em contato em breve com sua proposta.",
      });
      form.reset(); // Limpa o formulário após o envio
    } catch (error: any) {
      console.error("Erro ao solicitar orçamento:", error);
      toast.error("Erro ao solicitar orçamento", {
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
          <Calculator className="h-20 w-20 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Solicite seu Orçamento</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Preencha o formulário abaixo e receba uma proposta personalizada
          </p>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-20 bg-background">
        <div className="container max-w-4xl">
          <Card className="border-none shadow-2xl rounded-xl">
            <CardContent className="pt-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Tipo de Pessoa */}
                  <FormField
                    control={form.control}
                    name="person_type"
                    render={({ field }) => (
                      <FormItem className="space-y-4">
                        <FormLabel className="text-lg font-semibold">Tipo de Pessoa *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="pf" id="pf" className="text-primary border-primary" />
                              </FormControl>
                              <FormLabel htmlFor="pf" className="cursor-pointer font-normal">Pessoa Física</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="pj" id="pj" className="text-primary border-primary" />
                              </FormControl>
                              <FormLabel htmlFor="pj" className="cursor-pointer font-normal">Pessoa Jurídica</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Informações Pessoais */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome Completo / Razão Social *</FormLabel>
                          <FormControl>
                            <Input id="full_name" className="mt-2 rounded-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cpf_cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CPF / CNPJ *</FormLabel>
                          <FormControl>
                            <Input id="cpf_cnpj" className="mt-2 rounded-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail *</FormLabel>
                          <FormControl>
                            <Input id="email" type="email" className="mt-2 rounded-lg" {...field} />
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
                            <Input id="phone_whatsapp" type="tel" className="mt-2 rounded-lg" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Endereço de Entrega */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Endereço de Entrega</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="zip_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CEP *</FormLabel>
                            <FormControl>
                              <Input id="zip_code" className="mt-2 rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Endereço *</FormLabel>
                            <FormControl>
                              <Input id="address" className="mt-2 rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Número *</FormLabel>
                            <FormControl>
                              <Input id="number" className="mt-2 rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="complement"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Complemento</FormLabel>
                            <FormControl>
                              <Input id="complement" className="mt-2 rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="neighborhood"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bairro *</FormLabel>
                            <FormControl>
                              <Input id="neighborhood" className="mt-2 rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Cidade *</FormLabel>
                            <FormControl>
                              <Input id="city" className="mt-2 rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Estado *</FormLabel>
                            <FormControl>
                              <Input id="state" className="mt-2 rounded-lg" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Seleção de Produtos */}
                  <FormField
                    control={form.control}
                    name="products_of_interest"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold mb-4 block">Produtos de Interesse *</FormLabel>
                        {isLoadingProducts ? (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" /> Carregando produtos...
                          </div>
                        ) : productsError ? (
                          <p className="text-red-500">Erro ao carregar produtos: {productsError.message}</p>
                        ) : products && products.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {products.map((product) => (
                              <FormField
                                key={product.id}
                                control={form.control}
                                name="products_of_interest"
                                render={({ field: productField }) => {
                                  return (
                                    <FormItem
                                      key={product.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={productField.value?.includes(product.name)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? productField.onChange([...(productField.value || []), product.name])
                                              : productField.onChange(
                                                  productField.value?.filter(
                                                    (value) => value !== product.name
                                                  )
                                                );
                                          }}
                                          className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        {product.name}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">Nenhum produto ativo encontrado.</p>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Quantidade Estimada */}
                  <FormField
                    control={form.control}
                    name="estimated_quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantidade Estimada (embalagens) *</FormLabel>
                        <FormControl>
                          <Input 
                            id="estimated_quantity" 
                            type="number" 
                            min="1" 
                            className="mt-2 rounded-lg" 
                            placeholder="Ex: 10"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Como Conheceu */}
                  <FormField
                    control={form.control}
                    name="how_did_you_hear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Como conheceu a Doces São Fidélis?</FormLabel>
                        <FormControl>
                          <Input id="how_did_you_hear" className="mt-2 rounded-lg" placeholder="Indicação, internet, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Preferência de Retorno */}
                  <FormField
                    control={form.control}
                    name="return_preference"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold mb-4 block">Preferência de Retorno</FormLabel>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {['Telefone', 'E-mail', 'WhatsApp'].map((item) => (
                            <FormField
                              key={item}
                              control={form.control}
                              name="return_preference"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.toLowerCase())}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...(field.value || []), item.toLowerCase()])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.toLowerCase()
                                                )
                                              );
                                        }}
                                        className="border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {item}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Mensagem */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Observações ou Dúvidas</FormLabel>
                        <FormControl>
                          <Textarea 
                            id="message" 
                            className="mt-2 min-h-[120px] rounded-lg"
                            placeholder="Informações adicionais sobre seu pedido..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-semibold shadow-md" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Solicitando...
                      </>
                    ) : (
                      <>
                        Solicitar Orçamento <ArrowRight className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Orcamento;