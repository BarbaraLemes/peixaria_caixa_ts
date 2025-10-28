import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { IVenda } from '../types/IVenda';

interface VendasContextData {
  vendas: IVenda[];
  totalVendas: number;
  adicionarVenda: (venda: IVenda) => void;
}

const VendasContext = createContext<VendasContextData>({} as VendasContextData);

export function VendasProvider({ children }: { children: ReactNode }) {
  const [vendas, setVendas] = useState<IVenda[]>([]);

  const adicionarVenda = useCallback((venda: IVenda) => {
    setVendas(prevVendas => [...prevVendas, venda]);
  }, []);

  return (
    <VendasContext.Provider value={{ vendas, adicionarVenda }}>
      {children}
    </VendasContext.Provider>
  );
}

export function useVendas() {
  const context = useContext(VendasContext);
  if (!context) {
    throw new Error('useVendas deve ser usado dentro de um VendasProvider');
  }
  return context;
}