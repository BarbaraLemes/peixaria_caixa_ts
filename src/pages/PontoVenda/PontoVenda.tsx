import { useState, useCallback, useEffect } from 'react';
import styles from './PontoVenda.module.css';
import { AtendentePicker } from '../../components/AtendentePicker';
import { ControleMesas } from '../../components/ControleMesas';
import { Produtos } from '../../components/Produtos';
import { useAtendente } from '../../contexts/AtendenteContext';
import { useMesas } from '../../components/ControleMesas/useMesas';
import SecaoPagamento from '../../components/SecaoPagamento';
import type { IProduto } from '../../types/IProduto';

export const PontoVenda = () => {
  const { atendentes, atendenteSelecionado, handleAtendenteChange } = useAtendente();
  const { mesas, mesaSelecionada, handleMesaClick, ocuparMesa, atualizarItensMesa, liberarMesa } = useMesas();

  // Estado local dos itens do pedido atual
  const [itensPedido, setItensPedido] = useState<Array<{ produto: IProduto; quantidade: number }>>([]);

  // Atualizar itens do pedido quando mudar de mesa
  useEffect(() => {
    if (mesaSelecionada) {
      // Se a mesa tem itens, carrega eles
      if (mesaSelecionada.itensPedido) {
        setItensPedido(mesaSelecionada.itensPedido);
      } else {
        // Se não tem itens, limpa o estado local
        setItensPedido([]);
      }
    } else {
      setItensPedido([]);
    }
  }, [mesaSelecionada]);

  const handleProdutoSelect = (produto: IProduto) => {
    if (!mesaSelecionada) {
      alert('Por favor, selecione uma mesa primeiro');
      return;
    }

    const itemExistente = itensPedido.find(item => item.produto.id === produto.id);
    let novosItens: Array<{ produto: IProduto; quantidade: number }>;
    
    if (itemExistente) {
      novosItens = itensPedido.map(item => 
        item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      );
    } else {
      novosItens = [...itensPedido, { produto, quantidade: 1 }];
    }

    setItensPedido(novosItens);

    // Se for o primeiro item adicionado, ocupar a mesa
    if (itensPedido.length === 0) {
      ocuparMesa(mesaSelecionada.id, novosItens);
    } else {
      // Se já tinha itens, apenas atualiza
      atualizarItensMesa(mesaSelecionada.id, novosItens);
    }
  };

  const handleAjustarQuantidade = (produtoId: number, ajuste: number) => {
    const novosItens = itensPedido
      .map(item => {
        if (item.produto.id === produtoId) {
          const novaQuantidade = Math.max(0, item.quantidade + ajuste);
          return novaQuantidade === 0 ? null : { ...item, quantidade: novaQuantidade };
        }
        return item;
      })
      .filter(Boolean) as Array<{ produto: IProduto; quantidade: number }>;

    setItensPedido(novosItens);
    
    // Atualiza os itens da mesa
    if (mesaSelecionada) {
      atualizarItensMesa(mesaSelecionada.id, novosItens);
    }
  };

  const handleVendaConcluida = (mesaId: string) => {
    // Liberar a mesa
    liberarMesa(mesaId);
    // Limpar os itens do pedido
    setItensPedido([]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <AtendentePicker
        atendentes={atendentes}
        atendenteSelecionado={atendenteSelecionado}
        onAtendenteChange={handleAtendenteChange}
      />
      
      <ControleMesas
        mesas={mesas}
        onMesaSelect={handleMesaClick}
      />
      
      <div className={styles.productsPedidos}>
        <div className={styles.productsSection}>
          <Produtos
            onProdutoSelect={handleProdutoSelect}
          />
        </div>

        <section className={styles.paymentSection}>
          <SecaoPagamento 
            mesaSelecionada={mesaSelecionada || undefined}
            atendenteSelecionado={atendenteSelecionado}
            itensPedido={itensPedido}
            onAjustarQuantidade={handleAjustarQuantidade}
            onVendaConcluida={handleVendaConcluida}
          />
        </section>
      </div>
    </div>
  );
};