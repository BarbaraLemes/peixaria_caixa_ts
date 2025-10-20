export interface IAtendente {
  id: string;
  nome: string;
  ativo?: boolean;
}

export interface IAtendentePicker {
  atendentes?: IAtendente[];
  atendenteSelecionado?: IAtendente;
  onAtendenteChange?: (atendente: IAtendente) => void;
  label?: string;
}
