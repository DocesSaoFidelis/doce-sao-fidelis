import React from 'react';
import { Newspaper } from 'lucide-react';

const AdminNewsletter = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <Newspaper className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-2xl font-bold tracking-tight">
          Gestão de Newsletter
        </h3>
        <p className="text-sm text-muted-foreground">
          Esta seção está em desenvolvimento. Em breve, você poderá gerenciar os assinantes da newsletter aqui.
        </p>
      </div>
    </div>
  );
};

export default AdminNewsletter;