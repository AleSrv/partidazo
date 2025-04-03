import { useState, useEffect } from "react";
import HeaderComponents from "./components/HeaderComponents";
import SidebarComponents from "./components/SidebarComponents";
import { PlayerProvider } from "./Provider/PlayerProvider";
import Layout from "./Layout";
import MainComponents from "./components/MainComponents";
import FooterComponents from "./components/FooterComponents";
import Convocados from "./components/Convocados";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
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
          header={<HeaderComponents toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />}
          aside={
            isSidebarOpen ? (
              <SidebarComponents isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            ) : (
              <Convocados />
            )
          }
          main={<MainComponents />}
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