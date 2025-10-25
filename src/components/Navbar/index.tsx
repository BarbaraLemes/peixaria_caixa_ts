import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { PlayArrow, Stop } from '@mui/icons-material';
import { ControleCaixa } from '../ControleCaixa';

interface NavbarProps {
  onNavigate?: (section: string, nomeUsuario: string) => void;
  onOpenCaixa: (valorInicial: number) => void;
  onCloseCaixa: () => void;
  caixaAberto: boolean;
}

export const Navbar = ({ onNavigate, onOpenCaixa, onCloseCaixa, caixaAberto }: NavbarProps) => {
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
      label: 'Ponto de Venda',
      nomeUsuario: 'Atendente de Vendas'
    },
    {
      id: 'gestao-produtos',
      label: 'Gestão de Produtos',
      nomeUsuario: 'Gerente de Produtos'
    },
    {
      id: 'relatorios',
      label: 'Relatórios',
      nomeUsuario: 'Analista Financeiro'
    }
  ];

  const handleClick = (itemId: string) => {
    setActiveItem(itemId);
    if (onNavigate) {
      const selectedItem = navItems.find(item => item.id === itemId);
      onNavigate(itemId, selectedItem?.nomeUsuario || 'Usuário');
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
      
      {/* <div className={styles.navbar2}>
        <div className={styles.userName}>
          <AttachMoneyIcon sx={{ color: 'green', fontSize: 30 }} />
          <p>Controle de Caixa</p>
        </div>
        <div className={styles.Button}>
          <div className={styles.Button2}>
            
          </div>
          <div className={styles.Button2}>
            
          </div>
        </div>
      </div> */}

      <div>
        <ControleCaixa 
          onOpenCaixa={onOpenCaixa}
          onCloseCaixa={onCloseCaixa}
          caixaAberto={caixaAberto}
        />
      </div>
    </nav>
  );
};