import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * => z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { TablesInsert, TablesUpdate } from '@/integrations/supabase/types';
import { Loader2 } from 'lucide-react';

const productSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, 'Preço deve ser maior que zero'),
  category: z.string().optional(),
  stock: z.coerce.number().int().min(0, 'Estoque não pode ser negativo'),
  image_url: z.string().optional(), // No longer strictly a URL, as it can be set by upload
  is_active: z.boolean().default(true),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  product?: TablesUpdate<'products'>;
  onSuccess: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess }) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          ...product,
          price: parseFloat(product.price as any),
          stock: product.stock || 0,
          is_active: product.is_active ?? true,
        }
      : {
          name: '',
          description: '',
          price: 0.01,
          category: '',
          stock: 0,
          image_url: '',
          is_active: true,
        },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const onSubmit = async (values: ProductFormValues) => {
    setIsUploading(true);
    let imageUrl = values.image_url;

    try {
      if (selectedFile) {
        const fileExtension = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExtension}`;
        const filePath = `${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, selectedFile, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);
        
        imageUrl = publicUrlData.publicUrl;
      }

      const productData = { ...values, image_url: imageUrl };

      if (product) {
        // Update product
        const { error } = await supabase
          .from('products')
          .update(productData as TablesUpdate<'products'>)
          .eq('id', product.id);
        if (error) throw error;
        toast.success('Produto atualizado com sucesso!');
      } else {
        // Add new product
        const { error } = await supabase
          .from('products')
          .insert(productData as TablesInsert<'products'>);
        if (error) throw error;
        toast.success('Produto adicionado com sucesso!');
      }
      queryClient.invalidateQueries({ queryKey: ['products'] });
      onSuccess();
    } catch (error: any) {
      toast.error('Erro ao salvar produto', { description: error.message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição do produto" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bananada">Bananada</SelectItem>
                  <SelectItem value="goma">Goma de Amido</SelectItem>
                  <SelectItem value="especial">Especial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estoque</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Imagem do Produto</FormLabel>
          <FormControl>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
          </FormControl>
          <FormDescription>
            {product?.image_url && !selectedFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Imagem atual: <a href={product.image_url} target="_blank" rel="noopener noreferrer" className="underline">Ver Imagem</a>
              </p>
            )}
            {selectedFile && (
              <p className="text-sm text-muted-foreground mt-2">
                Arquivo selecionado: {selectedFile.name}
              </p>
            )}
          </FormDescription>
          <FormMessage />
        </FormItem>
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Produto Ativo</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Define se o produto está visível no site.
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Fazendo upload...
            </>
          ) : product ? (
            'Salvar Alterações'
          ) : (
            'Adicionar Produto'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;