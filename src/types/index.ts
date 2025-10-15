export interface IUsuario {
  nome: string;
  vendas?: number;
  pedidos?: number;
}

export interface IHeaderProps {
  usuario?: IUsuario;
  onLogout?: () => void;
}

// Tipos para Mesa
export type StatusMesa = 'livre' | 'ocupada' | 'selecionada';

export interface Mesa {
  id: string;
  numero: number;
  status: StatusMesa;
  valor?: number;
  tempoOcupada?: number; // em minutos
  inicioOcupacao?: Date;
}

export interface MesaCardProps {
  mesa: Mesa;
  onMesaClick?: (mesa: Mesa) => void;
}

export interface ControleMesasProps {
  mesas?: Mesa[];
  onMesaSelect?: (mesa: Mesa) => void;
}
