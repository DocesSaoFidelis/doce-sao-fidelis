import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-4">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Bem-vindo à Área Administrativa!
        </h3>
        <p className="text-sm text-muted-foreground">
          Use o menu lateral para navegar e gerenciar o site.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;