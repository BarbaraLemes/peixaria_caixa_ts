import styles from './PontoVenda.module.css';
import { AtendentePicker } from '../../components/AtendentePicker';
import { ControleMesas } from '../../components/ControleMesas';
import { Produtos } from '../../components/Produtos';
import { useAtendente } from '../../components/AtendentePicker/useAtendente';
import { useMesas } from '../../components/ControleMesas/useMesas';
import SecaoPagamento from '../../components/SecaoPagamento';

export const PontoVenda = () => {
  const { atendentes, atendenteSelecionado, handleAtendenteChange } = useAtendente();
  const { mesas, mesaSelecionada, handleMesaClick } = useMesas();

  const handleProdutoSelect = (produto: any) => {
    console.log('Produto selecionado:', produto);
    // Aqui você pode implementar a lógica para adicionar o produto ao pedido
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
      
      <div className={styles.productsSection}>
        <Produtos
        onProdutoSelect={handleProdutoSelect}
      />
      </div>

      <section className={styles.paymentSection}>
        <SecaoPagamento />
      </section>
      
      {/* Debug info - removível */}
      {mesaSelecionada && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '4px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>Informações da Mesa Selecionada</h3>
          <p><strong>Mesa:</strong> {mesaSelecionada.numero}</p>
          <p><strong>Status:</strong> {mesaSelecionada.status}</p>
          <p><strong>Atendente:</strong> {atendenteSelecionado?.nome}</p>
          {mesaSelecionada.status === 'ocupada' && (
            <>
              <p><strong>Valor:</strong> R$ {mesaSelecionada.valor?.toFixed(2)}</p>
              <p><strong>Tempo:</strong> {mesaSelecionada.tempoOcupada} minutos</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};