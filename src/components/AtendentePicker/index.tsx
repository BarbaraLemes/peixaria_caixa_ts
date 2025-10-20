import { Person, KeyboardArrowDown } from '@mui/icons-material';
import styles from './AtendentePicker.module.css';
import type { IAtendentePicker } from '../../types/IAtendente';

export const AtendentePicker = ({
  atendentes = [],
  atendenteSelecionado,
  onAtendenteChange,
  label = "Atendente:"
}: IAtendentePicker) => {

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const atendenteId = event.target.value;
    const atendente = atendentes.find(a => a.id === atendenteId);
    
    if (atendente && onAtendenteChange) {
      onAtendenteChange(atendente);
    }
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <Person className={styles.icon} />
        {label}
      </label>
      
      <div className={styles.selectContainer}>
        <select
          className={styles.select}
          value={atendenteSelecionado?.id || ''}
          onChange={handleSelectChange}
        >
          {atendentes.map((atendente) => (
            <option 
              key={atendente.id} 
              value={atendente.id}
              className={styles.option}
            >
              {atendente.nome}
            </option>
          ))}
        </select>
        <KeyboardArrowDown className={styles.selectIcon} />
      </div>
    </div>
  );
};