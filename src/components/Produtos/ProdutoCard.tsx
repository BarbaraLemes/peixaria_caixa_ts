import type { ProdutoCardProps } from '../../types';
import styles from './Produtos.module.css';

export const ProdutoCard = ({ produto, onProdutoClick }: ProdutoCardProps) => {
  const handleClick = () => {
    if (onProdutoClick) {
      onProdutoClick(produto);
    }
  };

  const formatarPreco = (preco: number): string => {
    return `R$ ${preco.toFixed(2).replace('.', ',')}`;
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
        {formatarPreco(produto.preco)}
      </div>
    </div>
  );
};