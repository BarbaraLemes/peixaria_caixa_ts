import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { PlayArrow, Stop } from '@mui/icons-material';

interface NavbarProps {
  onNavigate?: (section: string) => void;
}

export const Navbar = ({ onNavigate }: NavbarProps) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('ponto-venda');

  // Sincroniza o item ativo com a rota atual
  useEffect(() => {
    const path = location.pathname.replace('/', '') || 'ponto-venda';
    setActiveItem(path);
  }, [location.pathname]);

  const navItems = [
    {
      id: 'ponto-venda',
      label: 'Ponto de Venda'
    },
    {
      id: 'gestao-produtos',
      label: 'Gestão de Produtos'
    },
    {
      id: 'relatorios',
      label: 'Relatórios'
    }
  ];

  const handleClick = (itemId: string) => {
    setActiveItem(itemId);
    if (onNavigate) {
      onNavigate(itemId);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar1}>
        {navItems.map((item) => (
        <button
          key={item.id}
          className={`${styles.navItem} ${activeItem === item.id ? styles.active : ''}`}
          onClick={() => handleClick(item.id)}
          type="button"
        >
          {item.label}
        </button>
      ))}
      </div>
      
      <div className={styles.navbar2}>
        <div className={styles.userName}>
          <AttachMoneyIcon sx={{ color: 'green', fontSize: 30 }} />
          <p>Controle de Caixa</p>
        </div>
        <div className={styles.Button}>
          <div className={styles.Button2}>
            <button className={styles.logoutButton} type="button"> <PlayArrow/> Abrir Caixa</button>
          </div>
          <div className={styles.Button2}>
            <button className={styles.logoutButton2} type="button"> <Stop/> Fechar Caixa</button>
          </div>
        </div>
      </div>
    </nav>
  );
};