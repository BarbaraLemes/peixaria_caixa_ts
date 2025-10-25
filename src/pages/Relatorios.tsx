import { useCaixa } from '../contexts/CaixaContext';
import styles from './Relatorios.module.css';
import { AttachMoney } from '@mui/icons-material';

export const Relatorios = () => {
  const { valorInicial, valorTotal, caixaAberto } = useCaixa();

  const vendasRealizadas = valorTotal - valorInicial;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        <AttachMoney />
        Relatório do Caixa
      </h2>

      <div className={styles.infoContainer}>
        <div className={styles.infoCard}>
          <h3>Status do Caixa</h3>
          <p className={caixaAberto ? styles.statusAberto : styles.statusFechado}>
            {caixaAberto ? 'Aberto' : 'Fechado'}
          </p>
        </div>

        <div className={styles.infoCard}>
          <h3>Valor Inicial</h3>
          <p className={styles.valor}>
            R$ {valorInicial.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className={styles.infoCard}>
          <h3>Vendas Realizadas</h3>
          <p className={styles.valor}>
            R$ {vendasRealizadas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className={styles.infoCard}>
          <h3>Valor Total em Caixa</h3>
          <p className={styles.valorTotal}>
            R$ {valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
};