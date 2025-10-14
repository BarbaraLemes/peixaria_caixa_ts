import { Routes, Route } from 'react-router-dom';

// Componentes das páginas (você criará depois)
const PontoVenda = () => <div>Página do Ponto de Venda</div>;
const GestaoProdutos = () => <div>Página de Gestão de Produtos</div>;
const Relatorios = () => <div>Página de Relatórios</div>;

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<PontoVenda />} />
      <Route path="/ponto-venda" element={<PontoVenda />} />
      <Route path="/gestao-produtos" element={<GestaoProdutos />} />
      <Route path="/relatorios" element={<Relatorios />} />
    </Routes>
  );
};
