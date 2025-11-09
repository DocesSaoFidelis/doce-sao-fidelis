import React from 'react';
import { FileText } from 'lucide-react';

const AdminQuotations = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <FileText className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight">
          Gestão de Orçamentos
        </h3>
        <p className="text-sm text-muted-foreground">
          Esta seção está em desenvolvimento. Em breve, você poderá gerenciar os orçamentos aqui.
        </p>
      </div>
    </div>
  );
};

export default AdminQuotations;