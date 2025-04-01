import { useState } from "react";
import HeaderComponents from "./components/HeaderComponents";
import SidebarComponents from "./components/SidebarComponents";
import { PlayerProvider } from "./Provider/PlayerProvider";
import Layout from "./Layout";
import MainComponents from "./components/MainComponents";
import FooterComponents from "./components/FooterComponents";



const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <PlayerProvider>
      <Layout
        header={<HeaderComponents toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />}
        aside={<SidebarComponents isOpen={isSidebarOpen} />}
        main={<MainComponents />}
        footer={<FooterComponents />}
      />
    </PlayerProvider>
  );
};

export default App;