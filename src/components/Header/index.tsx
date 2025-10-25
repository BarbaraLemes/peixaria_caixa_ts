import type { IUsuario } from '../../types/IUsuario';
import styles from './Header.module.css';
import { HeaderDailySummary } from './HeaderDailySummary';
import { HeaderUserInfo } from './HeaderUserInfo';

interface HeaderProps {
    nomeUsuario?: IUsuario;
    tituloSistema?: string;
    pedidos?: number;
    onLogout?: () => void;
}

const Header = ({ 
    nomeUsuario = { nomeUsuario: "João da Silva" },
    tituloSistema = "Sistema de Caixa Peixaria da Laura",
    pedidos = 0,
    onLogout
}: HeaderProps) => {
    return (
           <header className={styles.header}>
              <HeaderUserInfo
                 nomeUsuario={nomeUsuario}
                 tituloSistema={tituloSistema}
                 data={new Date()}
               />

               <HeaderDailySummary
                 pedidos={pedidos}
                 onLogout={onLogout}
                />
            </header> 
    )
}

export default Header;