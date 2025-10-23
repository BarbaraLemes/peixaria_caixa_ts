import type { IUsuario } from '../../types/IUsuario';
import styles from './Header.module.css';
import { HeaderDailySummary } from './HeaderDailySummary';
import { HeaderUserInfo } from './HeaderUserInfo';

interface HeaderProps {
    nomeUsuario?: IUsuario;
    tituloSistema?: string;
    total?: number;
    pedidos?: number;
    onLogout?: () => void;
}

const Header = ({ 
    nomeUsuario = { nomeUsuario: "João da Silva" },
    tituloSistema = "Sistema de Caixa",
    total = 1230,
    pedidos = 15,
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
                total={total}
                pedidos={pedidos}
                onLogout={onLogout}
            />
        </header>
    )
}

export default Header;