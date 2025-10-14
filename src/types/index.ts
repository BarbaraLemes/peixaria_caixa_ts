export interface IUsuario {
  nome: string;
  vendas?: number;
  pedidos?: number;
}

export interface IHeaderProps {
  usuario?: IUsuario;
  onLogout?: () => void;
}
