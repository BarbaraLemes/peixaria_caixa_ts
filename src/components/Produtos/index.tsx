import { ProdutoCard } from './ProdutoCard';
import { useProdutos } from './useProdutos';
import type { Categoria } from '../../types';
import styles from './Produtos.module.css';

interface ProdutosComponentProps {
  onProdutoSelect?: (produto: any) => void;
}

export const Produtos = ({ onProdutoSelect }: ProdutosComponentProps) => {
  const { produtos, categoriaAtiva, handleCategoriaChange, handleProdutoClick } = useProdutos();
  
  const categorias: { id: Categoria; label: string }[] = [
    { id: 'bebidas', label: 'Bebidas' },
    { id: 'pratos', label: 'Pratos' },
    { id: 'sobremesas', label: 'Sobremesas' },
  ];

  const handleProdutoCardClick = (produto: any) => {
    handleProdutoClick(produto);
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

      {/* Grid de produtos */}
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