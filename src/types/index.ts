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

// Tipos para Atendente
export interface Atendente {
  id: string;
  nome: string;
  ativo?: boolean;
}

export interface AtendentePickerProps {
  atendentes?: Atendente[];
  atendenteSelecionado?: Atendente;
  onAtendenteChange?: (atendente: Atendente) => void;
  label?: string;
}

// Tipos para Produtos
export type Categoria = 'bebidas' | 'pratos' | 'sobremesas';

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: Categoria;
  cor: string;
  disponivel?: boolean;
}

export interface ProdutoCardProps {
  produto: Produto;
  onProdutoClick?: (produto: Produto) => void;
}

export interface ProdutosProps {
  produtos?: Produto[];
  onProdutoSelect?: (produto: Produto) => void;
}
