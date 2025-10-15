import { useState, useMemo, useCallback } from 'react';
import type { Produto, Categoria } from '../../types';

// Mock data baseado na imagem
const PRODUTOS_MOCK: Produto[] = [
  // Bebidas
  { id: '1', nome: 'Refrigerante', preco: 5.00, categoria: 'bebidas', cor: '#FF8C00', disponivel: true },
  { id: '2', nome: 'Suco', preco: 6.00, categoria: 'bebidas', cor: '#FFD700', disponivel: true },
  { id: '3', nome: 'Cerveja', preco: 10.00, categoria: 'bebidas', cor: '#228B22', disponivel: true },
  { id: '4', nome: 'Água', preco: 3.00, categoria: 'bebidas', cor: '#4169E1', disponivel: true },
  
  // Pratos (exemplo - não visíveis na imagem mas para completar)
  { id: '5', nome: 'Peixe Grelhado', preco: 25.00, categoria: 'pratos', cor: '#DC143C', disponivel: true },
  { id: '6', nome: 'Camarão', preco: 30.00, categoria: 'pratos', cor: '#FF6347', disponivel: true },
  { id: '7', nome: 'Filé de Peixe', preco: 22.00, categoria: 'pratos', cor: '#32CD32', disponivel: true },
  
  // Sobremesas (exemplo - não visíveis na imagem mas para completar)
  { id: '8', nome: 'Pudim', preco: 8.00, categoria: 'sobremesas', cor: '#DDA0DD', disponivel: true },
  { id: '9', nome: 'Sorvete', preco: 6.00, categoria: 'sobremesas', cor: '#FFB6C1', disponivel: true },
  { id: '10', nome: 'Torta', preco: 12.00, categoria: 'sobremesas', cor: '#F0E68C', disponivel: true },
];

export const useProdutos = () => {
  const [produtos] = useState<Produto[]>(PRODUTOS_MOCK);
  const [categoriaAtiva, setCategoriaAtiva] = useState<Categoria>('bebidas');
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  // Filtrar produtos pela categoria ativa
  const produtosFiltrados = useMemo(() => {
    return produtos.filter(produto => produto.categoria === categoriaAtiva && produto.disponivel);
  }, [produtos, categoriaAtiva]);

  // Handler para mudança de categoria
  const handleCategoriaChange = useCallback((categoria: Categoria) => {
    setCategoriaAtiva(categoria);
  }, []);

  // Handler para seleção de produto
  const handleProdutoClick = useCallback((produto: Produto) => {
    setProdutoSelecionado(produto);
  }, []);

  return {
    produtos: produtosFiltrados,
    categoriaAtiva,
    produtoSelecionado,
    handleCategoriaChange,
    handleProdutoClick,
  };
};