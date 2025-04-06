import { useState, useEffect } from "react";
import { PlayerProvider } from "./Provider/PlayerProvider";
import Layout from "./Layout";
import HeaderComponents from "./components/HeaderComponents";
import SidebarComponents from "./components/SidebarComponents";
import MainComponents from "./components/MainComponents";
import FooterComponents from "./components/FooterComponents";
import Convocados from "./components/Convocados";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // Estado para el formulario

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev); // Alternar visibilidad del formulario
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Cerrar el sidebar al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <PlayerProvider>
      <div className="relative">
        <Layout
          header={
            <div className="flex justify-between items-center">
              <HeaderComponents toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={toggleForm}
              >
                {isFormOpen ? "Cerrar Formulario" : "Agregar Jugador"}
              </button>
            </div>
          }
          aside={
            isSidebarOpen ? (
              <SidebarComponents isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            ) : (
              <Convocados />
            )
          }
          main={isFormOpen ? <MainComponents /> : null} // Mostrar el formulario solo si está abierto
          footer={<FooterComponents />}
        />
        {/* Overlay para cerrar el sidebar al hacer clic fuera */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={closeSidebar}
          ></div>
        )}
      </div>
    </PlayerProvider>
  );
};

export default App;