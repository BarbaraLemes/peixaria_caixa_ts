import { AtendentePicker } from '../components/AtendentePicker';
import { useAtendente } from '../components/AtendentePicker/useAtendente';

export const PontoVenda = () => {
  const { atendentes, atendenteSelecionado, handleAtendenteChange } = useAtendente();

  return (
    <div style={{ padding: '20px' }}>
      <AtendentePicker
        atendentes={atendentes}
        atendenteSelecionado={atendenteSelecionado}
        onAtendenteChange={handleAtendenteChange}
      />
      
      {/* Aqui virá o resto da interface do ponto de venda */}
      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        border: '1px solid #ddd', 
        borderRadius: '4px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Ponto de Venda</h3>
        <p>Atendente selecionado: <strong>{atendenteSelecionado?.nome}</strong></p>
        <p>Aqui será implementada a interface de vendas...</p>
      </div>
    </div>
  );
};