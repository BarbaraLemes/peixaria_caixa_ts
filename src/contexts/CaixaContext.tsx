import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface CaixaContextType {
    valorInicial: number;
    valorTotal: number;
    caixaAberto: boolean;
    abrirCaixa: (valor: number) => void;
    fecharCaixa: () => void;
    adicionarVenda: (valor: number) => void;
}

const CaixaContext = createContext<CaixaContextType | undefined>(undefined);

export function CaixaProvider({ children }: { children: ReactNode }) {
    const [valorInicial, setValorInicial] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [caixaAberto, setCaixaAberto] = useState(false);

    const abrirCaixa = (valor: number) => {
        setValorInicial(valor);
        setValorTotal(valor); // Inicialmente, o valor total é igual ao valor inicial
        setCaixaAberto(true);
    };

    const fecharCaixa = () => {
        setValorInicial(0);
        setValorTotal(0);
        setCaixaAberto(false);
    };

    const adicionarVenda = (valor: number) => {
        setValorTotal(prev => prev + valor);
    };

    return (
        <CaixaContext.Provider 
            value={{
                valorInicial,
                valorTotal,
                caixaAberto,
                abrirCaixa,
                fecharCaixa,
                adicionarVenda
            }}
        >
            {children}
        </CaixaContext.Provider>
    );
}

export function useCaixa() {
    const context = useContext(CaixaContext);
    if (context === undefined) {
        throw new Error('useCaixa must be used within a CaixaProvider');
    }
    return context;
}