import { useState, useEffect } from "react";
import Layout from "./Layout";
import HeaderComponents from "./components/HeaderComponents";
import SidebarComponents from "./components/SidebarComponents";
import MainComponents from "./components/MainComponents";
import FooterComponents from "./components/FooterComponents";
// import Convocados from "./components/Convocados";
import { ConvocadosProvider } from "./Provider/ConvocadosProvider";
import { JugadoresProvider } from "./Provider/JugadoresProvider";
import { Toaster } from "react-hot-toast";
import Convocados from "./components/Convocados";



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
              <div className="relative w-64 min-w-64 h-full">
                {/* Convocados (visible cuando el sidebar está cerrado) */}
                {!isSidebarOpen && (
                  <div className="h-full  bg-lime-800 text-white shadow-md transition-opacity duration-500">
                    <Convocados />
                  </div>
                )}

                {/* Sidebar (animado desde la izquierda) */}
                <div
                  className={`
                    absolute inset-0 z-20  bg-lime-800 text-white shadow-md h-full w-full
                    transform transition-transform duration-500
                   ${isSidebarOpen ? "translate-x-0" : "-translate-x-[110%]"}
                  `}
                >
                  <SidebarComponents isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
                </div>
              </div>
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