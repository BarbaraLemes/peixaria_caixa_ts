import { useState, useCallback } from 'react';
import type { IAtendente } from '../../types/IAtendente';

// Mock data - depois pode vir de API
const ATENDENTES_MOCK: IAtendente[] = [
  { id: '1', nome: 'João Silva', ativo: true },
  { id: '2', nome: 'Maria Santos', ativo: true },
  { id: '3', nome: 'Pedro Costa', ativo: true },
  { id: '4', nome: 'Ana Oliveira', ativo: false },
];

export const useAtendente = () => {
  const [atendentes] = useState<IAtendente[]>(ATENDENTES_MOCK);
  const [atendenteSelecionado, setAtendenteSelecionado] = useState<IAtendente>(
    ATENDENTES_MOCK[0] // João Silva como padrão
  );

  const handleAtendenteChange = useCallback((atendente: IAtendente) => {
    setAtendenteSelecionado(atendente);
  }, []);

  const atendentesAtivos = atendentes.filter(atendente => atendente.ativo);

  return {
    atendentes: atendentesAtivos,
    atendenteSelecionado,
    handleAtendenteChange,
  };
};