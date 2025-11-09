import React, { useState } from 'react';
import { FileText, Loader2, Search, CheckCircle, Trash2, Eye } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

const AdminQuotations = () => {
  const queryClient = useQueryClient();
  const [filterTerm, setFilterTerm] = useState('');
  const [selectedQuotation, setSelectedQuotation] = useState<Tables<'quotation_requests'> | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [quotationToDelete, setQuotationToDelete] = useState<Tables<'quotation_requests'> | null>(null);

  const { data: quotations, isLoading, error } = useQuery<Tables<'quotation_requests'>[]>({
    queryKey: ['quotationRequests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quotation_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('quotation_requests')
        .update({ is_read: true })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotationRequests'] });
      toast.success('Orçamento marcado como lido!');
    },
    onError: (err) => {
      toast.error('Erro ao marcar orçamento como lido', { description: err.message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('quotation_requests').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotationRequests'] });
      toast.success('Orçamento excluído com sucesso!');
      setIsDeleteDialogOpen(false);
      setQuotationToDelete(null);
    },
    onError: (err) => {
      toast.error('Erro ao excluir orçamento', { description: err.message });
    },
  });

  const filteredQuotations = quotations?.filter(
    (quotation) =>
      quotation.full_name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      quotation.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
      quotation.cpf_cnpj.toLowerCase().includes(filterTerm.toLowerCase()) ||
      quotation.products_of_interest.some(product => product.toLowerCase().includes(filterTerm.toLowerCase()))
  );

  const handleViewQuotation = (quotation: Tables<'quotation_requests'>) => {
    setSelectedQuotation(quotation);
    setIsViewDialogOpen(true);
    if (!quotation.is_read) {
      markAsReadMutation.mutate(quotation.id);
    }
  };

  const handleDeleteClick = (quotation: Tables<'quotation_requests'>) => {
    setQuotationToDelete(quotation);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (quotationToDelete) {
      deleteMutation.mutate(quotationToDelete.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          <h3 className="text-2xl font-bold tracking-tight mt-2">
            Carregando Orçamentos...
          </h3>
          <p className="text-sm text-muted-foreground">
            Buscando as solicitações de orçamento enviadas pelo site.
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
            Erro ao Carregar Orçamentos
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
        <h2 className="text-3xl font-bold tracking-tight">Solicitações de Orçamento</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filtrar por nome, e-mail, CPF/CNPJ ou produtos..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {filteredQuotations && filteredQuotations.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotations.map((quotation) => (
              <TableRow key={quotation.id} className={quotation.is_read ? 'text-muted-foreground' : 'font-semibold'}>
                <TableCell>
                  <Badge variant={quotation.is_read ? 'secondary' : 'default'}>
                    {quotation.is_read ? 'Lido' : 'Novo'}
                  </Badge>
                </TableCell>
                <TableCell>{quotation.full_name}</TableCell>
                <TableCell>{quotation.email}</TableCell>
                <TableCell>
                  {quotation.products_of_interest.join(', ')}
                </TableCell>
                <TableCell>{quotation.estimated_quantity}</TableCell>
                <TableCell>
                  {quotation.created_at
                    ? format(new Date(quotation.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })
                    : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewQuotation(quotation)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {!quotation.is_read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsReadMutation.mutate(quotation.id)} disabled={markAsReadMutation.isPending}>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(quotation)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
          <div className="flex flex-col items-center gap-1 text-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight mt-2">
              Nenhuma Solicitação de Orçamento Encontrada
            </h3>
            <p className="text-sm text-muted-foreground">
              Ainda não há orçamentos ou nenhum corresponde ao filtro.
            </p>
          </div>
        </div>
      )}

      {/* Dialog para Visualizar Orçamento */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-full max-w-lg h-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes do Orçamento de {selectedQuotation?.full_name}</DialogTitle>
            <DialogDescription>
              Solicitação enviada em{' '}
              {selectedQuotation?.created_at
                ? format(new Date(selectedQuotation.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })
                : 'N/A'}
            </DialogDescription>
          </DialogHeader>
          {selectedQuotation && (
            <div className="space-y-4 py-4 text-sm">
              <div>
                <p className="font-medium text-muted-foreground">Tipo de Pessoa:</p>
                <p className="text-base">{selectedQuotation.person_type === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica'}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Nome Completo / Razão Social:</p>
                <p className="text-base">{selectedQuotation.full_name}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">CPF / CNPJ:</p>
                <p className="text-base">{selectedQuotation.cpf_cnpj}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">E-mail:</p>
                <p className="text-base">{selectedQuotation.email}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Telefone/WhatsApp:</p>
                <p className="text-base">{selectedQuotation.phone_whatsapp}</p>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="font-medium text-muted-foreground">Endereço de Entrega:</p>
                <p className="text-base">
                  {selectedQuotation.address}, {selectedQuotation.number}
                  {selectedQuotation.complement && `, ${selectedQuotation.complement}`}
                  <br />
                  {selectedQuotation.neighborhood}, {selectedQuotation.city} - {selectedQuotation.state}
                  <br />
                  CEP: {selectedQuotation.zip_code}
                </p>
              </div>
              <div className="border-t pt-4 mt-4">
                <p className="font-medium text-muted-foreground">Produtos de Interesse:</p>
                <p className="text-base">{selectedQuotation.products_of_interest.join(', ')}</p>
              </div>
              <div>
                <p className="font-medium text-muted-foreground">Quantidade Estimada:</p>
                <p className="text-base">{selectedQuotation.estimated_quantity} embalagens</p>
              </div>
              {selectedQuotation.how_did_you_hear && (
                <div>
                  <p className="font-medium text-muted-foreground">Como Conheceu:</p>
                  <p className="text-base">{selectedQuotation.how_did_you_hear}</p>
                </div>
              )}
              {selectedQuotation.return_preference && selectedQuotation.return_preference.length > 0 && (
                <div>
                  <p className="font-medium text-muted-foreground">Preferência de Retorno:</p>
                  <p className="text-base">{selectedQuotation.return_preference.join(', ')}</p>
                </div>
              )}
              {selectedQuotation.message && (
                <div>
                  <p className="font-medium text-muted-foreground">Observações/Dúvidas:</p>
                  <p className="text-base whitespace-pre-wrap">{selectedQuotation.message}</p>
                </div>
              )}
              <div>
                <p className="font-medium text-muted-foreground">Status:</p>
                <Badge variant={selectedQuotation.is_read ? 'secondary' : 'default'}>
                  {selectedQuotation.is_read ? 'Lido' : 'Novo'}
                </Badge>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AlertDialog para Confirmação de Exclusão */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a solicitação de orçamento de{' '}
              <span className="font-semibold">{quotationToDelete?.full_name}</span>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              {deleteMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminQuotations;