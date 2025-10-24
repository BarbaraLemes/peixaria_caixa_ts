import { Avatar } from "@mui/material";
import styles from "./HeaderUserInfo.module.css";
import { CalendarTodayOutlined, Person } from "@mui/icons-material";
import type { IUsuario } from "../../../types/IUsuario";
import type React from "react";

interface HeaderUserInfoProps {
  nomeUsuario: IUsuario;
  tituloSistema: string;
  data: Date;
}
//Mock data do usuário - depois virá de contexto/estado global

export const HeaderUserInfo = ({ nomeUsuario, tituloSistema, data }: HeaderUserInfoProps) => {
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
          backgroundColor: "#cde3f9",
          width: 45,
          height: 45,
          color: "oklch(.546 .245 262.881)"
        }}
      >
        <Person />
      </Avatar>

      <div className={styles.textContainer}>
        <h3 className={styles.titulo}>{tituloSistema}</h3>
        <p className={styles.nome}>{nomeUsuario.nomeUsuario}</p>
      </div>

      <div className={styles.dateContainer}>
        <CalendarTodayOutlined sx={{ color: "#666", fontSize: 20 }} />
        <span>{formatDate(data)}</span>
      </div>
    </div>
  );
};
