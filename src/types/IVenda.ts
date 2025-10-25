import type { IAtendente } from './IAtendente';
import type { IProduto } from './IProduto';

export interface IVenda {
  id: string;
  numeroMesa: number;
  atendente: IAtendente;
  itens: Array<{ produto: IProduto; quantidade: number }>;
  total: number;
  tempoOcupacao: number;
  metodoPagamento: string;
  dataVenda: Date;
  formaPagamento: {
    tipo: 'cartao' | 'dinheiro';
    subtipo?: 'credito' | 'debito';
    valorRecebido?: number;
    troco?: number;
  };
}