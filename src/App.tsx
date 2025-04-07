import { useState, useEffect } from "react";
import Layout from "./Layout";
import HeaderComponents from "./components/HeaderComponents";
import SidebarComponents from "./components/SidebarComponents";
import MainComponents from "./components/MainComponents";
import FooterComponents from "./components/FooterComponents";
import Convocados from "./components/Convocados";
import { ConvocadosProvider } from "./Provider/ConvocadosProvider";
import { JugadoresProvider } from "./Provider/JugadoresProvider";
import { Toaster } from "react-hot-toast";



const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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
    <JugadoresProvider>
      <ConvocadosProvider>
        <div className="relative">
          <Toaster position="top-right" />
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
            main={isFormOpen ? <MainComponents /> : null}
            footer={<FooterComponents />}
          />
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={closeSidebar}
            ></div>
          )}
        </div>
      </ConvocadosProvider>
    </JugadoresProvider>
  );
};

export default App;