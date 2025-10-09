import { ExitToApp, ShoppingCartOutlined } from "@mui/icons-material";
import styles from "./HeaderDailySummary.module.css";

interface HeaderDailySummaryProps {
    total: number;
    pedidos: number;
    onLogout?: () => void;
}

export const HeaderDailySummary = ({ total, pedidos, onLogout }: HeaderDailySummaryProps) => {
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        // Lógica adicional de logout aqui
        // Adicionar rota de logout futuramente, e retornar para a página de login
    };

    return (
        <div className={styles.container}>
            <div>
                <strong className={styles.total}>
                    R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </strong>
                <p className={styles.description}>Total do Dia</p>
            </div>

            <div className={styles.pedidos}>
                <ShoppingCartOutlined sx={{ color: "#3498db", fontSize: 20 }} />
                <span>{pedidos}</span>
                <p className={styles.description}>Pedidos</p>
            </div>

            <button className={styles.logout} onClick={handleLogout}>
                <ExitToApp />
                Sair
            </button>
        </div>
    )
}