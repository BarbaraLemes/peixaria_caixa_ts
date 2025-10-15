import { useState, useCallback, useEffect } from 'react';
import type { Mesa, StatusMesa } from '../../types';

// Mock data das 13 mesas
const MESAS_MOCK: Mesa[] = [
  { id: '1', numero: 1, status: 'livre' },
  { id: '2', numero: 2, status: 'ocupada', valor: 45, tempoOcupada: 15, inicioOcupacao: new Date(Date.now() - 15 * 60 * 1000) },
  { id: '3', numero: 3, status: 'livre' },
  { id: '4', numero: 4, status: 'livre' },
  { id: '5', numero: 5, status: 'ocupada', valor: 28, tempoOcupada: 8, inicioOcupacao: new Date(Date.now() - 8 * 60 * 1000) },
  { id: '6', numero: 6, status: 'livre' },
  { id: '7', numero: 7, status: 'livre' },
  { id: '8', numero: 8, status: 'ocupada', valor: 68, tempoOcupada: 25, inicioOcupacao: new Date(Date.now() - 25 * 60 * 1000) },
  { id: '9', numero: 9, status: 'livre' },
  { id: '10', numero: 10, status: 'livre' },
  { id: '11', numero: 11, status: 'livre' },
  { id: '12', numero: 12, status: 'livre' },
  { id: '13', numero: 13, status: 'livre' },
];

export const useMesas = () => {
  const [mesas, setMesas] = useState<Mesa[]>(MESAS_MOCK);
  const [mesaSelecionada, setMesaSelecionada] = useState<Mesa | null>(null);

  // Atualizar tempo das mesas ocupadas a cada minuto
  useEffect(() => {
    const interval = setInterval(() => {
      setMesas(prevMesas => 
        prevMesas.map(mesa => {
          if (mesa.status === 'ocupada' && mesa.inicioOcupacao) {
            const agora = new Date();
            const tempoDecorrido = Math.floor((agora.getTime() - mesa.inicioOcupacao.getTime()) / (1000 * 60));
            return { ...mesa, tempoOcupada: tempoDecorrido };
          }
          return mesa;
        })
      );
    }, 60000); // Atualiza a cada minuto

    return () => clearInterval(interval);
  }, []);

  const handleMesaClick = useCallback((mesa: Mesa) => {
    // Limpar seleção anterior
    setMesas(prevMesas => 
      prevMesas.map(m => ({
        ...m,
        status: m.status === 'selecionada' ? 'livre' : m.status
      }))
    );

    // Se a mesa clicada não está ocupada, selecionar
    if (mesa.status !== 'ocupada') {
      setMesas(prevMesas => 
        prevMesas.map(m => 
          m.id === mesa.id 
            ? { ...m, status: 'selecionada' as StatusMesa }
            : m
        )
      );
      setMesaSelecionada({ ...mesa, status: 'selecionada' });
    } else {
      setMesaSelecionada(mesa);
    }
  }, []);

  const ocuparMesa = useCallback((mesaId: string, valor: number = 0) => {
    setMesas(prevMesas => 
      prevMesas.map(mesa => 
        mesa.id === mesaId 
          ? { 
              ...mesa, 
              status: 'ocupada' as StatusMesa,
              valor,
              inicioOcupacao: new Date(),
              tempoOcupada: 0
            }
          : mesa
      )
    );
  }, []);

  const liberarMesa = useCallback((mesaId: string) => {
    setMesas(prevMesas => 
      prevMesas.map(mesa => 
        mesa.id === mesaId 
          ? { 
              ...mesa, 
              status: 'livre' as StatusMesa,
              valor: undefined,
              inicioOcupacao: undefined,
              tempoOcupada: undefined
            }
          : mesa
      )
    );
  }, []);

  return {
    mesas,
    mesaSelecionada,
    handleMesaClick,
    ocuparMesa,
    liberarMesa,
  };
};