import { Avatar } from "@mui/material";
import styles from "./HeaderUserInfo.module.css";
import { CalendarTodayOutlined, Person } from "@mui/icons-material";

interface HeaderUserInfoProps {
  nome: string;
  tituloSistema: string;
  data: Date;
}
//Mock data do usuário - depois virá de contexto/estado global

export const HeaderUserInfo = ({ nome, tituloSistema, data }: HeaderUserInfoProps) => {
  const formatDate = (date: Date) => {
    const formatted = date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  return (
    <div className={styles.container}>
      <Avatar
        sx={{
          backgroundColor: "#80b1d2ff",
          width: 45,
          height: 45,
        }}
      >
        <Person />
      </Avatar>

      <div className={styles.textContainer}>
        <h3 className={styles.titulo}>{tituloSistema}</h3>
        <p className={styles.nome}>{nome}</p>
      </div>

      <div className={styles.dateContainer}>
        <CalendarTodayOutlined sx={{ color: "#666", fontSize: 20 }} />
        <span>{formatDate(data)}</span>
      </div>
    </div>
  );
};
