import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Historia from "./pages/Historia";
import Produtos from "./pages/Produtos";
import Qualidade from "./pages/Qualidade";
import Contato from "./pages/Contato";
import Orcamento from "./pages/Orcamento";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { SessionContextProvider } from "./contexts/SessionContext";
import { AdminLayout } from "./components/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import React from "react"; // Importar React para usar React.Fragment

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <React.Fragment> {/* Adicionado React.Fragment aqui */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SessionContextProvider>
            <Routes>
              {/* Rotas Públicas */}
              <Route path="/" element={<Index />} />
              <Route path="/historia" element={<Historia />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/qualidade" element={<Qualidade />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/orcamento" element={<Orcamento />} />
              <Route path="/login" element={<Login />} />

              {/* Rotas Administrativas */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                {/* Futuras rotas de admin serão adicionadas aqui */}
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SessionContextProvider>
        </BrowserRouter>
      </React.Fragment> {/* Fechamento do React.Fragment */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;