import { useState, useEffect } from "react";
import type { Produto, CategoriaType } from "../../../types/produtos";
import styles from "./ModalProduto.module.css";

interface ModalProdutoProps {
  open: boolean;
  onClose: () => void;
  produto?: Produto | null;
  categoria: CategoriaType;
  onSave: (produto: Produto) => void;
}

export function ModalProduto({ 
  open, 
  onClose, 
  produto = null, 
  categoria,
  onSave 
}: ModalProdutoProps) {
  const [formData, setFormData] = useState<{
    nome: string;
    preco: string;
    cor: string;
    categoria: CategoriaType;
  }>({
    nome: '',
    preco: '',
    cor: '#3498db',
    categoria: categoria
  });

  //Atualizar formulário quando produto muda (edição)
  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome,
        preco: produto.preco.replace('R$ ', '').replace(',', '.'),
        cor: produto.cor,
        categoria: categoria
      });
    } else {
      setFormData({
        nome: '',
        preco: '',
        cor: '#3498db',
        categoria: categoria
      });
    }
  }, [produto, categoria]);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (field === 'preco') {
        //Remove tudo que não é número
      const apenasNumeros = event.target.value.replace(/\D/g, '');

      //Converte para centavos e depois para formato monetário
      const valorEmCentavos = parseInt(apenasNumeros) || 0;
      const valorFormatado = (valorEmCentavos / 100).toFixed(2);
      
      setFormData({
        ...formData,
        [field]: valorFormatado
      });
    } else {
      setFormData({
        ...formData,
        [field]: event.target.value
      });
    }
  };

  //Função para exibir o valor formatado no input
  const formatarValorExibicao = (valor: string) => {
    if (!valor || valor === '0.00') return '';
    const numeroFormatado = parseFloat(valor).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return numeroFormatado;
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.preco) return;

    const produtoFormatado = {
      ...formData,
      id: produto?.id || Date.now(),
      preco: `R$ ${parseFloat(formData.preco).toFixed(2).replace('.', ',')}`
    };

    onSave(produtoFormatado);
    onClose();
  };

  if (!open) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            {produto ? 'Editar Produto' : 'Adicionar Novo Produto'}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nome do Produto</label>
            <input
              className={styles.input}
              placeholder="Digite o nome do produto"
              value={formData.nome}
              onChange={handleChange('nome')}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Preço</label>
            <input
              className={styles.input}
              placeholder="Ex: 15,90"
              value={formatarValorExibicao(formData.preco)}
              onChange={handleChange('preco')}
              type="text"
              inputMode="numeric"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Categoria</label>
            <select
              className={styles.select}
              value={formData.categoria}
              onChange={handleChange('categoria')}
            >
              <option value="bebidas">Bebidas</option>
              <option value="pratos">Pratos</option>
              <option value="sobremesas">Sobremesas</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Cor do Botão</label>
            <div className={styles.colorSection}>
              <div
                className={styles.colorPreview}
                style={{ backgroundColor: formData.cor }}
                onClick={() => document.getElementById('color-picker')?.click()}
              />
              
              <input
                id="color-picker"
                type="color"
                value={formData.cor}
                onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                style={{ display: 'none' }}
              />
              
              <input
                className={`${styles.input} ${styles.colorInput}`}
                value={formData.cor.toUpperCase()}
                onChange={(e) => {
                  const valor = e.target.value;
                  if (/^#[0-9A-F]{0,6}$/i.test(valor) || valor === '') {
                    setFormData({ ...formData, cor: valor.toLowerCase() });
                  }
                }}
                placeholder="#3498db"
              />
            </div>

            <div className={styles.quickColors}>
              <p className={styles.quickColorsTitle}>Cores rápidas:</p>
              <div className={styles.colorGrid}>
                {['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#ff6b35', '#34495e', '#1abc9c']
                  .map((cor) => (
                    <div
                      key={cor}
                      className={`${styles.colorOption} ${formData.cor === cor ? styles.colorOptionSelected : ''}`}
                      style={{ backgroundColor: cor }}
                      onClick={() => setFormData({ ...formData, cor })}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button className={`${styles.button} ${styles.cancelButton}`} onClick={onClose}>
            Cancelar
          </button>
          <button
            className={`${styles.button} ${styles.saveButton}`}
            onClick={handleSubmit}
            disabled={!formData.nome || !formData.preco}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}