import { useNavigate } from 'react-router-dom';
import Header from "./components/Header"
import { Navbar } from "./components/Navbar"
import { RoutesApp } from "./RoutesApp"

function App() {
  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    console.log(`Navegando para: ${section}`);
    // Navega para a rota correspondente
    navigate(`/${section}`);
  };

  return (
    <>
      <Header />
      <Navbar onNavigate={handleNavigation} />
      <main>
        <RoutesApp />
      </main>
    </>
  )
}

export default App
