import React from 'react';
import { Newspaper, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const AdminNewsletter = () => {
  const { data: subscriptions, isLoading, error } = useQuery<Tables<'newsletter_subscriptions'>[]>({
    queryKey: ['newsletterSubscriptions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscriptions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          <h3 className="text-2xl font-bold tracking-tight mt-2">
            Carregando Assinantes...
          </h3>
          <p className="text-sm text-muted-foreground">
            Buscando os e-mails cadastrados na newsletter.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4 text-red-500">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Erro ao Carregar Assinantes
          </h3>
          <p className="text-sm text-muted-foreground">
            {error.message || 'Ocorreu um erro inesperado ao buscar os dados.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestão de Newsletter</h2>
      </div>

      {subscriptions && subscriptions.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>E-mail</TableHead>
              <TableHead>Data de Inscrição</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscriptions.map((subscription) => (
              <TableRow key={subscription.id}>
                <TableCell className="font-medium">{subscription.email}</TableCell>
                <TableCell>
                  {subscription.created_at
                    ? format(new Date(subscription.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
          <div className="flex flex-col items-center gap-1 text-center">
            <Newspaper className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight mt-2">
              Nenhum Assinante Encontrado
            </h3>
            <p className="text-sm text-muted-foreground">
              Ainda não há e-mails cadastrados na newsletter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsletter;