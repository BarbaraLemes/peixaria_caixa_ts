import { AccessTime } from '@mui/icons-material';
import styles from './ControleMesas.module.css';
import type { IMesaCard } from '../../types/IMesa';

export const MesaCard = ({ mesa, onMesaClick }: IMesaCard) => {
  const handleClick = () => {
    if (onMesaClick) {
      onMesaClick(mesa);
    }
  };

  const formatarTempo = (minutos: number): string => {
    if (minutos < 60) {
      return `${minutos}min`;
    }
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return minutosRestantes > 0 ? `${horas}h ${minutosRestantes}min` : `${horas}h`;
  };

  const formatarValor = (valor: number): string => {
    return `R$ ${valor.toFixed(0)}`;
  };

  return (
    <div 
      className={`${styles.mesaCard} ${styles[mesa.status]}`}
      onClick={handleClick}
    >
      <div className={styles.mesaNumero}>
        Mesa {mesa.numero}
      </div>
      
      <div className={`${styles.mesaStatus} ${styles[mesa.status]}`}>
        {mesa.status === 'livre' ? 'Livre' : 
         mesa.status === 'ocupada' ? 'Ocupada' : 'Selecionada'}
      </div>

      {mesa.status === 'ocupada' && (
        <div className={styles.mesaInfo}>
          {mesa.tempoOcupada !== undefined && (
            <div className={styles.mesaTempo}>
              <AccessTime style={{ fontSize: 12 }} />
              {formatarTempo(mesa.tempoOcupada)}
            </div>
          )}
          
          {mesa.valor !== undefined && (
            <div className={styles.mesaValor}>
              {formatarValor(mesa.valor)}
            </div>
          )}
        </div>
      )}
    </div>
  );
};