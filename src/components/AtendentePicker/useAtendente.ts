import { useState, useCallback } from 'react';
import type { IAtendente } from '../../types/IAtendente';

// Mock data - depois pode vir de API
const ATENDENTES_MOCK: IAtendente[] = [
  { id: '1', nome: 'Arlindo Rodrigues', ativo: true },
  { id: '2', nome: 'Lauranece Siqueira', ativo: true },
  { id: '3', nome: 'Geovanne', ativo: true },
  { id: '4', nome: 'Isabela Maysa', ativo: false },
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