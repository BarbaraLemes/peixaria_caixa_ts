import { ProdutoCard } from './ProdutoCard';
import { useProdutos } from './useProdutos';
import styles from './Produtos.module.css';
import type { IProduto } from '../../types/IProduto';

export interface ProdutosProps {
  produtos?: IProduto[];
  onProdutoSelect?: (produto: IProduto) => void;
}

export const Produtos = ({ onProdutoSelect }: ProdutosProps) => {
  const { produtos, categoriaAtiva, handleCategoriaChange } = useProdutos();

  const categorias: { id: IProduto['categoria']; label: string }[] = [
    { id: 'bebidas', label: 'Bebidas' },
    { id: 'pratos', label: 'Pratos' },
    { id: 'sobremesas', label: 'Sobremesas' },
  ];

  const handleProdutoCardClick = (produto: IProduto) => {
    if (onProdutoSelect) {
      onProdutoSelect(produto);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Produtos
      </h3>

      {/* Abas de categorias */}
      <div className={styles.tabsContainer}>
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            className={`${styles.tabButton} ${categoriaAtiva === categoria.id ? styles.active : ''}`}
            onClick={() => handleCategoriaChange(categoria.id)}
          >
            {categoria.label}
          </button>
        ))}
      </div>

      {/* Grid de produtos
          Foi adicionado o componente que irá renderizar cada produto, e feito o mapeamento dos produtos vindo do hook useProdutos, mas futuramente pode ser de uma API 
      */}
      <div className={styles.produtosGrid}>
        {produtos.map((produto) => (
          <ProdutoCard
            key={produto.id}
            produto={produto}
            onProdutoClick={handleProdutoCardClick}
          />
        ))}
      </div>
    </div>
  );
};