import { TableRestaurant } from '@mui/icons-material';
import { MesaCard } from './MesaCard';
import styles from './ControleMesas.module.css';
import type { IMesa } from '../../types/IMesa';

interface ControleMesasProps {
  mesas?: IMesa[];
  onMesaSelect?: (mesa: IMesa) => void;
}

export const ControleMesas = ({ mesas = [], onMesaSelect }: ControleMesasProps) => {

  const handleMesaClick = (mesa: IMesa) => {
    if (onMesaSelect) {
      onMesaSelect(mesa);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <TableRestaurant className={styles.titleIcon} />
        Controle de Mesas
      </h3>

      <div className={styles.mesasGrid}>
        {mesas.map((mesa) => (
          <MesaCard
            key={mesa.id}
            mesa={mesa}
            onMesaClick={handleMesaClick}
          />
        ))}
      </div>

      <div className={styles.legenda}>
        <div className={styles.legendaItem}>
          <div className={`${styles.legendaCor} ${styles.livre}`}></div>
          <span>Livre</span>
        </div>
        
        <div className={styles.legendaItem}>
          <div className={`${styles.legendaCor} ${styles.ocupada}`}></div>
          <span>Ocupada</span>
        </div>
        
        <div className={styles.legendaItem}>
          <div className={`${styles.legendaCor} ${styles.selecionada}`}></div>
          <span>Selecionada</span>
        </div>
      </div>
    </div>
  );
};