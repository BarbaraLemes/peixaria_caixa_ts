import { useState } from 'react';
import { Typography } from '@mui/material';
import styles from './SecaoPagamento.module.css';
import type { IMesa } from '../../types/IMesa';
import type { IAtendente } from '../../types/IAtendente';

interface SecaoPagamentoProps {
    mesaSelecionada?: IMesa;
    atendenteSelecionado?: IAtendente;
}

export default function SecaoPagamento({ mesaSelecionada, atendenteSelecionado }: SecaoPagamentoProps) {
    const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'dinheiro' | ''>('');
    const [receivedValue, setReceivedValue] = useState('');
    const total = 0.00;
    const change = receivedValue ? (parseFloat(receivedValue) - total).toFixed(2) : '0,00';

    return (
        <div className={styles.container}>
            {/* Seção de Informações do Pagamento */}
            <div style={{ 
                marginBottom: '20px', 
                padding: '20px', 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                backgroundColor: '#f9f9f9'
            }}>
                <h3>Informações do Pedido</h3>
                {mesaSelecionada ? (
                    <>
                        <p><strong>Mesa:</strong> {mesaSelecionada.numero}</p>
                        <p><strong>Status:</strong> {mesaSelecionada.status}</p>
                        <p><strong>Atendente:</strong> {atendenteSelecionado?.nome || 'Não selecionado'}</p>
                        {mesaSelecionada.status === 'ocupada' && (
                            <>
                                <p><strong>Valor:</strong> R$ {mesaSelecionada.valor?.toFixed(2)}</p>
                                <p><strong>Tempo:</strong> {mesaSelecionada.tempoOcupada} minutos</p>
                            </>
                        )}
                        <div style={{ marginTop: '10px', borderTop: '1px solid #ddd', paddingTop: '10px' }}>
                            <p><strong>Método de Pagamento:</strong> {paymentMethod ? (paymentMethod === 'cartao' ? 'Cartão' : 'Dinheiro') : 'Não selecionado'}</p>
                            {paymentMethod === 'dinheiro' && (
                                <>
                                    <p><strong>Valor Recebido:</strong> R$ {receivedValue || '0.00'}</p>
                                    <p><strong>Troco:</strong> R$ {change}</p>
                                </>
                            )}
                        </div>
                    </>
                ) : (
                    <p>Nenhuma mesa selecionada</p>
                )}
            </div>

            <Typography variant="h6" sx={{ marginBottom: 3 }}>
                Pedido Atual
            </Typography>

            <div className={styles.emptyItems}>
                <Typography>Nenhum item adicionado</Typography>
            </div>

            <div className={styles.divider} />

            <div className={styles.total}>
                <span>Total</span>
                <span>R$ 0,00</span>
            </div>

            <div className={styles.paymentButtons}>
                <button
                    className={`${styles.paymentButton} ${
                        paymentMethod === 'cartao' ? styles.paymentButtonActive : styles.paymentButtonInactive
                    }`}
                    onClick={() => setPaymentMethod('cartao')}
                >
                    Cartão
                </button>
                <button
                    className={`${styles.paymentButton} ${
                        paymentMethod === 'dinheiro' ? styles.paymentButtonActive : styles.paymentButtonInactive
                    }`}
                    onClick={() => setPaymentMethod('dinheiro')}
                >
                    Dinheiro
                </button>
            </div>

            {paymentMethod === 'dinheiro' && (
                <>
                    <Typography sx={{ marginBottom: 1, fontWeight: 500 }}>
                        Valor Recebido
                    </Typography>
                    <input
                        type="text"
                        value={receivedValue}
                        onChange={(e) => setReceivedValue(e.target.value)}
                        placeholder="R$ 0,00"
                        className={styles.valueInput}
                    />

                    <div className={styles.troco}>
                        <span>Troco</span>
                        <span>R$ {change}</span>
                    </div>
                </>
            )}

            <button className={styles.concludeButton}>
                Concluir Venda
            </button>
        </div>
    );
}