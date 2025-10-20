export type CategoriaType = 'bebidas' | 'pratos' | 'sobremesas';

export interface IProduto {
  id: number;
  nome: string;
  preco: string;
  cor: string;
  categoria: CategoriaType;
  disponivel?: boolean;
}

export interface IProdutoCard {
  produto: IProduto;
  onProdutoClick?: (produto: IProduto) => void;
}