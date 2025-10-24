import styles from './ControleCaixa.module.css'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { PlayArrow, Stop } from '@mui/icons-material';

interface ControleCaixaProps {
    onOpenCaixa: () => void;
    onCloseCaixa: () => void;
    caixaAberto: boolean; // Indica se o caixa está aberto ou fechado
}

export const ControleCaixa = ({ onOpenCaixa, onCloseCaixa, caixaAberto = false }: ControleCaixaProps) => {

    return (
        <div className={styles.container}>
            <div className={styles.titulo}>
                <AttachMoneyIcon sx={{ color: 'green', fontSize: 30 }} />
                <p>Controle de Caixa</p>
            </div>
            <div className={styles.containerButtons}>
                <div className={styles.buttonGroup}>
                    <button 
                        className={styles.buttonOpen} 
                        type="button"
                        onClick={onOpenCaixa}
                        disabled={caixaAberto} // Desabilita o botão se o caixa já estiver aberto
                    > 
                        <PlayArrow/> Abrir Caixa</button>
                </div>
                <div className={styles.buttonGroup}>
                    <button 
                        className={styles.buttonClose} 
                        type="button"
                        onClick={onCloseCaixa}
                        disabled={!caixaAberto} // Desabilita o botão se o caixa já estiver fechado
                    > 
                        <Stop/> Fechar Caixa</button>
                </div>
            </div>
        </div>
    )
}