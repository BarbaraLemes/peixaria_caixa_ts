import type { IProdutoCard } from '../../types/IProduto';
import styles from './Produtos.module.css';

export const ProdutoCard = ({ produto, onProdutoClick }: IProdutoCard) => {
  const handleClick = () => {
    if (onProdutoClick) {
      onProdutoClick(produto);
    }
  };

  return (
    <div 
      className={styles.produtoCard}
      onClick={handleClick}
      style={{ backgroundColor: produto.cor }}
    >
      <div className={styles.produtoNome}>
        {produto.nome}
      </div>
      
      <div className={styles.produtoPreco}>
        {`R$ ${produto.preco.toFixed(2)}`}
      </div>
    </div>
  );
};