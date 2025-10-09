import styles from './Header.module.css';
import { HeaderDailySummary } from './HeaderDailySummary';
import { HeaderUserInfo } from './HeaderUserInfo';

interface HeaderProps {
    nome?: string;
    tituloSistema?: string;
    total?: number;
    pedidos?: number;
    onLogout?: () => void;
}

const Header = ({ 
    nome = "João da Silva",
    tituloSistema = "Sistema de Caixa",
    total = 1230,
    pedidos = 15,
    onLogout
}: HeaderProps) => {
    return (
        <header className={styles.header}>
            <HeaderUserInfo
                nome={nome}
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