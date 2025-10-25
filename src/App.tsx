import { useNavigate } from 'react-router-dom';
import Header from "./components/Header"
import { Navbar } from "./components/Navbar"
import { RoutesApp } from "./RoutesApp"
import { CaixaProvider, useCaixa } from './contexts/CaixaContext';
import { AtendenteProvider, useAtendente } from './contexts/AtendenteContext';
import { VendasProvider } from './contexts/VendasContext';

function AppContent() {
  const navigate = useNavigate();
  const { caixaAberto, abrirCaixa, fecharCaixa } = useCaixa();
  const { atendenteSelecionado } = useAtendente();

  const handleNavigation = (section: string) => {
    console.log(`Navegando para: ${section}`);
    navigate(`/${section}`);
  };

  return (
    <>
      <Header nomeUsuario={{ nomeUsuario: atendenteSelecionado.nome }} />
      <Navbar 
        onNavigate={handleNavigation}
        onOpenCaixa={abrirCaixa}
        onCloseCaixa={fecharCaixa}
        caixaAberto={caixaAberto}
      />
      <main>
        <RoutesApp />
      </main>
    </>
  );
}

function App() {
  return (
    <CaixaProvider>
      <AtendenteProvider>
        <VendasProvider>
          <AppContent />
        </VendasProvider>
      </AtendenteProvider>
    </CaixaProvider>
  );
}

export default App;
