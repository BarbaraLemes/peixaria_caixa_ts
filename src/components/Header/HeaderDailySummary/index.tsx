import { ExitToApp, ShoppingCartOutlined } from "@mui/icons-material";
import styles from "./HeaderDailySummary.module.css";

interface HeaderDailySummaryProps {
    pedidos: number;
    onLogout?: () => void;
}

export const HeaderDailySummary = ({ pedidos, onLogout }: HeaderDailySummaryProps) => {
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        // Lógica adicional de logout aqui
        // Adicionar rota de logout futuramente, e retornar para a página de login
    };

    return (
        <div className={styles.container}>
            <div className={styles.pedidos}>
                <div className={styles.pedidos2}>
                    <ShoppingCartOutlined sx={{ color: "#3498db", fontSize: 20 }} />
                    <span>{pedidos}</span>
                </div>
                <div>
                    <p className={styles.description}>Pedidos</p>
                </div>
            </div>

            <button className={styles.logout} onClick={handleLogout}>
                <ExitToApp />
                Sair
            </button>
        </div>
    )
}