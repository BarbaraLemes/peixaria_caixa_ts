import { useState } from 'react';
import { Typography } from '@mui/material';
import styles from './SecaoPagamento.module.css';

export default function SecaoPagamento() {
    const [paymentMethod, setPaymentMethod] = useState<'cartao' | 'dinheiro' | ''>('');
    const [receivedValue, setReceivedValue] = useState('');
    const total = 0.00;
    const change = receivedValue ? (parseFloat(receivedValue) - total).toFixed(2) : '0,00';

    return (
        <div className={styles.container}>
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