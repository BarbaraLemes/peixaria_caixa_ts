export type IMesaStatus = 'livre' | 'ocupada' | 'selecionada';

import type { IProduto } from './IProduto';

export interface IMesa {
  id: string;
  numero: number;
  status: IMesaStatus;
  valor?: number;
  tempoOcupada?: number; // em minutos
  inicioOcupacao?: Date;
  itensPedido?: Array<{ produto: IProduto; quantidade: number }>;
}

export interface IMesaCard {
    mesa: IMesa;
    onMesaClick?: (mesa: IMesa) => void;
}
