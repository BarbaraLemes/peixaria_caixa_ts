export type CategoriaType = 'bebidas' | 'pratos' | 'sobremesas';

export interface Produto {
  id: number;
  nome: string;
  preco: string;
  cor: string;
  categoria: CategoriaType;
}