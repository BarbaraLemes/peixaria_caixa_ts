import { Routes, Route } from 'react-router-dom';
import { PontoVenda } from './pages/PontoVenda/PontoVenda';
import { GestaoProdutos } from './pages/GestaoProdutos/GestaoProdutos';
// import { Relatorios } from './pages/Relatorios';

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<PontoVenda />} />
      <Route path="/ponto-venda" element={<PontoVenda />} />
      <Route path="/gestao-produtos" element={<GestaoProdutos />} />
      {/* <Route path="/relatorios" element={<Relatorios />} /> */}
    </Routes>
  );
};
