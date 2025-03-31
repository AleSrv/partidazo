import { PlayerProvider } from "./context/PlayerContext";
import Layout from "./Layout";
import HeaderComponents from "./components/HeaderComponents";
import SidebarComponents from "./components/SidebarComponents";
import MainComponents from "./components/MainComponents";
import FooterComponents from "./components/FooterComponents";

const App: React.FC = () => {
  return (
    <PlayerProvider>
      <Layout
        header={<HeaderComponents />}
        aside={<SidebarComponents />}
        main={<MainComponents />}
        footer={<FooterComponents />}
      />
    </PlayerProvider>
  );
};

export default App;