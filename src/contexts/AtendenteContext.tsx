import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { IAtendente } from '../types/IAtendente';

// Mock data - depois pode vir de API
const ATENDENTES_MOCK: IAtendente[] = [
  { id: '1', nome: 'Arlindo Rodrigues', ativo: true },
  { id: '2', nome: 'Lauranece Siqueira', ativo: true },
  { id: '3', nome: 'Geovanne', ativo: true },
  { id: '4', nome: 'Isabela Maysa', ativo: false },
];

interface AtendenteContextData {
  atendentes: IAtendente[];
  atendenteSelecionado: IAtendente;
  handleAtendenteChange: (atendente: IAtendente) => void;
}

const AtendenteContext = createContext<AtendenteContextData | undefined>(undefined);

export function AtendenteProvider({ children }: { children: ReactNode }) {
  const [atendentes] = useState<IAtendente[]>(ATENDENTES_MOCK);
  const [atendenteSelecionado, setAtendenteSelecionado] = useState<IAtendente>(
    ATENDENTES_MOCK[0]
  );

  const handleAtendenteChange = useCallback((atendente: IAtendente) => {
    setAtendenteSelecionado(atendente);
  }, []);

  const atendentesAtivos = atendentes.filter(atendente => atendente.ativo);

  return (
    <AtendenteContext.Provider
      value={{
        atendentes: atendentesAtivos,
        atendenteSelecionado,
        handleAtendenteChange,
      }}
    >
      {children}
    </AtendenteContext.Provider>
  );
}

export function useAtendente(): AtendenteContextData {
  const context = useContext(AtendenteContext);
  if (!context) {
    throw new Error('useAtendente deve ser usado dentro de um AtendenteProvider');
  }
  return context;
}