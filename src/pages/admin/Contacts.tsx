import React, { useState } from 'react';
import { Mail, Loader2, Search, CheckCircle, Trash2, Eye } from 'lucide-react';
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
  DialogTrigger,
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

const AdminContacts = () => {
  const queryClient = useQueryClient();
  const [filterTerm, setFilterTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Tables<'contact_messages'> | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<Tables<'contact_messages'> | null>(null);

  const { data: messages, isLoading, error } = useQuery<Tables<'contact_messages'>[]>({
    queryKey: ['contactMessages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: true })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      toast.success('Mensagem marcada como lida!');
    },
    onError: (err) => {
      toast.error('Erro ao marcar mensagem como lida', { description: err.message });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('contact_messages').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
      toast.success('Mensagem excluída com sucesso!');
      setIsDeleteDialogOpen(false);
      setMessageToDelete(null);
    },
    onError: (err) => {
      toast.error('Erro ao excluir mensagem', { description: err.message });
    },
  });

  const filteredMessages = messages?.filter(
    (message) =>
      message.name.toLowerCase().includes(filterTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(filterTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(filterTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(filterTerm.toLowerCase())
  );

  const handleViewMessage = (message: Tables<'contact_messages'>) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    if (!message.is_read) {
      markAsReadMutation.mutate(message.id);
    }
  };

  const handleDeleteClick = (message: Tables<'contact_messages'>) => {
    setMessageToDelete(message);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (messageToDelete) {
      deleteMutation.mutate(messageToDelete.id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
        <div className="flex flex-col items-center gap-1 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          <h3 className="text-2xl font-bold tracking-tight mt-2">
            Carregando Mensagens...
          </h3>
          <p className="text-sm text-muted-foreground">
            Buscando as mensagens enviadas pelo site.
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
            Erro ao Carregar Mensagens
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
        <h2 className="text-3xl font-bold tracking-tight">Mensagens de Contato</h2>
      </div>

      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Filtrar por nome, e-mail, assunto ou mensagem..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          className="pl-8"
        />
      </div>

      {filteredMessages && filteredMessages.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Assunto</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id} className={message.is_read ? 'text-muted-foreground' : 'font-semibold'}>
                <TableCell>
                  <Badge variant={message.is_read ? 'secondary' : 'default'}>
                    {message.is_read ? 'Lida' : 'Nova'}
                  </Badge>
                </TableCell>
                <TableCell>{message.name}</TableCell>
                <TableCell>{message.email}</TableCell>
                <TableCell>{message.subject}</TableCell>
                <TableCell>
                  {message.created_at
                    ? format(new Date(message.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })
                    : 'N/A'}
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => handleViewMessage(message)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  {!message.is_read && (
                    <Button variant="ghost" size="sm" onClick={() => markAsReadMutation.mutate(message.id)} disabled={markAsReadMutation.isPending}>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleDeleteClick(message)}>
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
            <Mail className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-2xl font-bold tracking-tight mt-2">
              Nenhuma Mensagem Encontrada
            </h3>
            <p className="text-sm text-muted-foreground">
              Ainda não há mensagens de contato ou nenhuma corresponde ao filtro.
            </p>
          </div>
        </div>
      )}

      {/* Dialog para Visualizar Mensagem */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="w-full max-w-lg h-full max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mensagem de {selectedMessage?.name}</DialogTitle>
            <DialogDescription>
              Detalhes da mensagem enviada em{' '}
              {selectedMessage?.created_at
                ? format(new Date(selectedMessage.created_at), 'dd/MM/yyyy HH:mm', { locale: ptBR })
                : 'N/A'}
            </DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Nome:</p>
                <p className="text-base">{selectedMessage.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">E-mail:</p>
                <p className="text-base">{selectedMessage.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Telefone/WhatsApp:</p>
                <p className="text-base">{selectedMessage.phone_whatsapp}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assunto:</p>
                <p className="text-base">{selectedMessage.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mensagem:</p>
                <p className="text-base whitespace-pre-wrap">{selectedMessage.message}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Status:</p>
                <Badge variant={selectedMessage.is_read ? 'secondary' : 'default'}>
                  {selectedMessage.is_read ? 'Lida' : 'Nova'}
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
              Esta ação não pode ser desfeita. Isso excluirá permanentemente a mensagem de{' '}
              <span className="font-semibold">{messageToDelete?.name}</span> (Assunto: {messageToDelete?.subject}).
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

export default AdminContacts;