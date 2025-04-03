import { usePlayerContext } from "../Hooks/usePlayerContext";

const SidebarComponents: React.FC<{ isOpen: boolean; closeSidebar: () => void }> = ({ isOpen, closeSidebar }) => {
  const { players, loading } = usePlayerContext();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-lime-800 text-white p-4 border-r-4 border-white transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-20`}
    >
      <button
        className="text-white bg-red-500 px-4 py-2 rounded mb-4"
        onClick={closeSidebar}
      >
        Cerrar
      </button>
      <h2 className="text-lg font-bold mb-4">Lista de Jugadores</h2>
      {loading ? (
        <p className="text-center text-gray-500">Cargando jugadores...</p>
      ) : (
        <ul className="space-y-2">
          {players.length === 0 ? (
            <li>
              <p className="text-center text-gray-500">No hay jugadores disponibles.</p>
            </li>
          ) : (
            players.map((player, index) => (
              <li key={index} className="flex items-center gap-2">
                <img
                  src={player.imagen}
                  alt={`Avatar de ${player.nombre}`}
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                />
                <span>{player.nombre} - {player.puntaje} pts.</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SidebarComponents;