import { useState } from 'react';
import { ModalProduto } from './components/ModalProduto';
import type { Produto, CategoriaType } from '../../types/produtos';
import styles from './GestaoProdutos.module.css';

interface ProdutosState {
  bebidas: Produto[];
  pratos: Produto[];
  sobremesas: Produto[];
}

export const GestaoProdutos = () => {
  const [activeTab, setActiveTab] = useState<CategoriaType>('bebidas');
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);

  //Estado para produtos (depois virá de uma API ou contexto)
  const [produtos, setProdutos] = useState<ProdutosState>({
    bebidas: [
      { id: 1, nome: 'Refrigerante', preco: 'R$ 5,00', cor: '#ff6b35', categoria: 'bebidas' },
      { id: 2, nome: 'Suco', preco: 'R$ 6,00', cor: '#f39c12', categoria: 'bebidas' },
      { id: 3, nome: 'Cerveja', preco: 'R$ 10,00', cor: '#27ae60', categoria: 'bebidas' },
      { id: 4, nome: 'Água', preco: 'R$ 3,00', cor: '#3498db', categoria: 'bebidas' }
    ],
    pratos: [
      { id: 5, nome: 'Peixe Grelhado', preco: 'R$ 25,00', cor: '#e74c3c', categoria: 'pratos' },
      { id: 6, nome: 'Camarão', preco: 'R$ 35,00', cor: '#9b59b6', categoria: 'pratos' },
      { id: 7, nome: 'Lula', preco: 'R$ 20,00', cor: '#34495e', categoria: 'pratos' },
      { id: 8, nome: 'Moqueca', preco: 'R$ 30,00', cor: '#e67e22', categoria: 'pratos' }
    ],
    sobremesas: [
      { id: 9, nome: 'Pudim', preco: 'R$ 8,00', cor: '#f1c40f', categoria: 'sobremesas' },
      { id: 10, nome: 'Sorvete', preco: 'R$ 6,00', cor: '#1abc9c', categoria: 'sobremesas' },
      { id: 11, nome: 'Torta', preco: 'R$ 12,00', cor: '#e91e63', categoria: 'sobremesas' },
      { id: 12, nome: 'Mousse', preco: 'R$ 10,00', cor: '#673ab7', categoria: 'sobremesas' }
    ]
  });

  const counters = {
    bebidas: produtos.bebidas.length,
    pratos: produtos.pratos.length,
    sobremesas: produtos.sobremesas.length
  };

  const produtosAtivos = produtos[activeTab];

  //Funções CRUD que serão utilizadas no Modal
  const handleNovoProduto = () => {
    setProdutoEditando(null);
    setModalOpen(true);
  };

  const handleEditarProduto = (produto: Produto) => {
    setProdutoEditando(produto);
    setModalOpen(true);
  };

  const handleExcluirProduto = (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(p => p.id !== id)
      }));
    }
  };

  const handleSalvarProduto = (produto: Produto) => {
    //Editando produto existente
    setProdutos(prev => {
      if (produtoEditando) {
        return {
          ...prev,
          [produto.categoria]: prev[produto.categoria as CategoriaType]
            .map(p => p.id === produto.id ? produto : p)
        };
      }
      //Adicionando novo produto
      return {
        ...prev,
        [produto.categoria]: [...prev[produto.categoria as CategoriaType], produto]
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Gestão de Produtos</h1>
        <button className={styles.newProductButton} onClick={handleNovoProduto}>
          ＋ Novo Produto
        </button>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${styles.bebidasTab} ${activeTab === 'bebidas' ? styles.active : ''}`}
          onClick={() => setActiveTab('bebidas')}
        >
          Bebidas ({counters.bebidas})
        </button>
        <button 
          className={`${styles.tab} ${styles.pratosTab} ${activeTab === 'pratos' ? styles.active : ''}`}
          onClick={() => setActiveTab('pratos')}
        >
          Pratos ({counters.pratos})
        </button>
        <button 
          className={`${styles.tab} ${styles.sobremesasTab} ${activeTab === 'sobremesas' ? styles.active : ''}`}
          onClick={() => setActiveTab('sobremesas')}
        >
          Sobremesas ({counters.sobremesas})
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Cor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtosAtivos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>{produto.preco}</td>
              <td>
                <div 
                  className={styles.colorPreview} 
                  style={{ backgroundColor: produto.cor }}
                />
              </td>
              <td>
                <div className={styles.actions}>
                  <button 
                    className={`${styles.actionButton} ${styles.editButton}`}
                    onClick={() => handleEditarProduto(produto)}
                  >
                    ✎
                  </button>
                  <button 
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    onClick={() => handleExcluirProduto(produto.id)}
                  >
                    🗑
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalProduto
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        produto={produtoEditando}
        categoria={activeTab}
        onSave={handleSalvarProduto}
      />
    </div>
  );
};