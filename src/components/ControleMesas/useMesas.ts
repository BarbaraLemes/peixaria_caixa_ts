import { useState, useCallback, useEffect } from 'react';
import type { IMesa, IMesaStatus } from '../../types/IMesa';
import type { IProduto } from '../../types/IProduto';

// Mock data das 13 mesas
const MESAS_MOCK: IMesa[] = Array.from({ length: 13 }, (_, i) => ({
  id: String(i + 1),
  numero: i + 1,
  status: 'livre'
}));

export const useMesas = () => {
  const [mesas, setMesas] = useState<IMesa[]>(MESAS_MOCK);
  const [mesaSelecionada, setMesaSelecionada] = useState<IMesa | null>(null);

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

  const handleMesaClick = useCallback((mesa: IMesa) => {
    if (mesaSelecionada?.id === mesa.id) {
      // Se clicar na mesa já selecionada, não faz nada
      return;
    }

    // Limpar seleção anterior
    setMesas(prevMesas => 
      prevMesas.map(m => ({
        ...m,
        status: m.status === 'selecionada' ? (m.itensPedido?.length ? 'ocupada' : 'livre') : m.status
      }))
    );

    // Se a mesa clicada não está ocupada, selecionar
    if (mesa.status !== 'ocupada') {
      setMesas(prevMesas => 
        prevMesas.map(m => 
          m.id === mesa.id 
            ? { ...m, status: 'selecionada' as IMesaStatus }
            : m
        )
      );
      setMesaSelecionada({ ...mesa, status: 'selecionada' });
    } else {
      // Se a mesa está ocupada, carregar os itens existentes
      setMesaSelecionada(mesa);
    }
  }, [mesaSelecionada]);

  const ocuparMesa = useCallback((mesaId: string, itensPedido: Array<{ produto: IProduto; quantidade: number }> = []) => {
    const valorTotal = itensPedido.reduce((acc, item) => 
      acc + (item.produto.preco * item.quantidade), 0
    );

    setMesas(prevMesas => 
      prevMesas.map(mesa => 
        mesa.id === mesaId 
          ? { 
              ...mesa, 
              status: 'ocupada' as IMesaStatus,
              valor: valorTotal,
              inicioOcupacao: new Date(),
              tempoOcupada: 0,
              itensPedido
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
              status: 'livre' as IMesaStatus,
              valor: undefined,
              inicioOcupacao: undefined,
              tempoOcupada: undefined
            }
          : mesa
      )
    );
  }, []);

  const atualizarItensMesa = useCallback((mesaId: string, itensPedido: Array<{ produto: IProduto; quantidade: number }>) => {
    const valorTotal = itensPedido.reduce((acc, item) => 
      acc + (item.produto.preco * item.quantidade), 0
    );

    setMesas(prevMesas => 
      prevMesas.map(mesa => 
        mesa.id === mesaId 
          ? { 
              ...mesa, 
              itensPedido,
              valor: valorTotal
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
    atualizarItensMesa,
  };
};