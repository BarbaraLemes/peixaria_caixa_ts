import { useState, useCallback } from 'react';
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
  const { mesas, mesaSelecionada, handleMesaClick } = useMesas();

  const [itensPedido, setItensPedido] = useState<Array<{ produto: IProduto; quantidade: number }>>([]);

  const handleProdutoSelect = (produto: IProduto) => {
    if (!mesaSelecionada) {
      alert('Por favor, selecione uma mesa primeiro');
      return;
    }

    const itemExistente = itensPedido.find(item => item.produto.id === produto.id);
    
    if (itemExistente) {
      setItensPedido(itensPedido.map(item => 
        item.produto.id === produto.id
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ));
    } else {
      setItensPedido([...itensPedido, { produto, quantidade: 1 }]);
    }
  };

  const handleAjustarQuantidade = (produtoId: number, ajuste: number) => {
    setItensPedido(itensPedido.map(item => {
      if (item.produto.id === produtoId) {
        const novaQuantidade = Math.max(0, item.quantidade + ajuste);
        return novaQuantidade === 0 ? null : { ...item, quantidade: novaQuantidade };
      }
      return item;
    }).filter(Boolean) as Array<{ produto: IProduto; quantidade: number }>);
  };

  // Debug logs
  console.log('Mesa Selecionada:', mesaSelecionada);
  console.log('Itens do Pedido:', itensPedido);

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
          />
        </section>
      </div>
    </div>
  );
};