export type IMesaStatus = 'livre' | 'ocupada' | 'selecionada';

export interface IMesa {
  id: string;
  numero: number;
  status: IMesaStatus;
  valor?: number;
  tempoOcupada?: number; // em minutos
  inicioOcupacao?: Date;
}

export interface IMesaCard {
    mesa: IMesa;
    onMesaClick?: (mesa: IMesa) => void;
}
