import { useState } from 'react';
import { Typography } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import styles from './SecaoPagamento.module.css';
import type { IMesa } from '../../types/IMesa';
import type { IAtendente } from '../../types/IAtendente';
import type { IProduto } from '../../types/IProduto';
import { useVendas } from '../../contexts/VendasContext';

interface SecaoPagamentoProps {
    mesaSelecionada?: IMesa;
    atendenteSelecionado?: IAtendente;
    itensPedido?: Array<{ produto: IProduto; quantidade: number }>;
    onAjustarQuantidade?: (produtoId: number, ajuste: number) => void;
    onVendaConcluida?: (mesaId: string) => void;
}

export default function SecaoPagamento({ 
    mesaSelecionada, 
    atendenteSelecionado, 
    itensPedido = [], 
    onAjustarQuantidade,
    onVendaConcluida
}: SecaoPagamentoProps) {
    const { adicionarVenda } = useVendas();
    const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'dinheiro' | ''>('');
    const [cardType, setCardType] = useState<'credito' | 'debito' | ''>('');
    const [receivedValue, setReceivedValue] = useState('');

    const handlePaymentMethodChange = (method: 'cartao' | 'dinheiro') => {
        setPaymentMethod(method);
        if (method === 'dinheiro') {
            setCardType('');
        }
    };
    
    const total = itensPedido.reduce((acc, item) => acc + (item.produto.preco * item.quantidade), 0);
    const change = receivedValue ? (parseFloat(receivedValue) - total).toFixed(2) : '0,00';

    const handleConcluirVenda = () => {
        if (!mesaSelecionada || !atendenteSelecionado) {
            alert('Selecione uma mesa e um atendente para concluir a venda');
            return;
        }

        if (!paymentMethod) {
            alert('Selecione um método de pagamento');
            return;
        }

        if (paymentMethod === 'cartao' && !cardType) {
            alert('Selecione o tipo de cartão (Crédito/Débito)');
            return;
        }

        if (paymentMethod === 'dinheiro' && !receivedValue) {
            alert('Informe o valor recebido em dinheiro');
            return;
        }

        const novaVenda = {
            id: Date.now().toString(),
            numeroMesa: mesaSelecionada.numero,
            atendente: atendenteSelecionado,
            itens: itensPedido,
            total,
            tempoOcupacao: mesaSelecionada.tempoOcupada || 0,
            metodoPagamento: paymentMethod === 'cartao' 
                ? `Cartão - ${cardType === 'credito' ? 'Crédito' : 'Débito'}`
                : 'Dinheiro',
            dataVenda: new Date(),
            formaPagamento: {
                tipo: paymentMethod,
                subtipo: cardType || undefined,
                valorRecebido: paymentMethod === 'dinheiro' ? parseFloat(receivedValue) : undefined,
                troco: paymentMethod === 'dinheiro' ? parseFloat(change) : undefined
            }
        };

        // Adicionar a venda ao contexto
        adicionarVenda(novaVenda);

        // Liberar a mesa
        if (onVendaConcluida && mesaSelecionada) {
            onVendaConcluida(mesaSelecionada.id);
        }

        // Resetar o estado do componente
        setPaymentMethod('');
        setCardType('');
        setReceivedValue('');
    };

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
                            <p>
                                <strong>Método de Pagamento:</strong> {
                                paymentMethod 
                                    ? (paymentMethod === 'cartao' 
                                        ? `Cartão ${cardType ? `(${cardType === 'credito' ? 'Crédito' : 'Débito'})` : ''}`
                                        : 'Dinheiro'
                                    ) 
                                    : 'Não selecionado'
                                }
                            </p>
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

            {!mesaSelecionada ? (
                <div className={styles.emptyItems}>
                    <Typography>Por favor, selecione uma mesa primeiro</Typography>
                </div>
            ) : itensPedido.length === 0 ? (
                <div className={styles.emptyItems}>
                    <Typography>Nenhum item adicionado</Typography>
                </div>
            ) : (
                <div className={styles.itemsList}>
                    {itensPedido.map((item) => (
                        <div key={item.produto.id} className={styles.itemPedido}>
                            <div className={styles.itemInfo}>
                                <Typography variant="body1">{item.produto.nome}</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    R$ {item.produto.preco.toFixed(2)}
                                </Typography>
                            </div>
                            <div className={styles.itemQuantidade}>
                                <button 
                                    className={styles.quantidadeButton}
                                    onClick={() => onAjustarQuantidade?.(item.produto.id, -1)}
                                >
                                    <RemoveIcon fontSize="small" />
                                </button>
                                <span>{item.quantidade}</span>
                                <button 
                                    className={styles.quantidadeButton}
                                    onClick={() => onAjustarQuantidade?.(item.produto.id, 1)}
                                >
                                    <AddIcon fontSize="small" />
                                </button>
                                <Typography variant="body2" color="textSecondary" sx={{ marginLeft: 2 }}>
                                    Total: R$ {(item.produto.preco * item.quantidade).toFixed(2)}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.divider} />

            <div className={styles.total}>
                <span>Total</span>
                <span>R$ {total.toFixed(2)}</span>
            </div>

            <div className={styles.paymentButtons}>
                <button
                    className={`${styles.paymentButton} ${
                        paymentMethod === 'cartao' ? styles.paymentButtonActive : styles.paymentButtonInactive
                    }`}
                    onClick={() => handlePaymentMethodChange('cartao')}
                >
                    Cartão
                </button>
                <button
                    className={`${styles.paymentButton} ${
                        paymentMethod === 'dinheiro' ? styles.paymentButtonActive : styles.paymentButtonInactive
                    }`}
                    onClick={() => handlePaymentMethodChange('dinheiro')}
                >
                    Dinheiro
                </button>
            </div>

            {paymentMethod === 'cartao' && (
                <div className={styles.paymentButtons} style={{ marginTop: '10px' }}>
                    <button
                        className={`${styles.paymentButton} ${
                            cardType === 'credito' ? styles.paymentButtonActive : styles.paymentButtonInactive
                        }`}
                        onClick={() => setCardType('credito')}
                    >
                        Crédito
                    </button>
                    <button
                        className={`${styles.paymentButton} ${
                            cardType === 'debito' ? styles.paymentButtonActive : styles.paymentButtonInactive
                        }`}
                        onClick={() => setCardType('debito')}
                    >
                        Débito
                    </button>
                </div>
            )}

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

            <button 
                className={styles.concludeButton}
                onClick={handleConcluirVenda}
                disabled={!mesaSelecionada || !atendenteSelecionado || !paymentMethod || (paymentMethod === 'cartao' && !cardType) || (paymentMethod === 'dinheiro' && !receivedValue)}
            >
                Concluir Venda
            </button>
        </div>
    );
}