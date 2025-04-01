import { usePlayerContext } from "../Hooks/usePlayerContext";

const SidebarComponents = () => {
  const { players, loading } = usePlayerContext();

  return (
    <nav className="p-4">
      <h2 className="text-lg font-bold mb-4">Lista de Jugadores</h2>
      {loading ? (
        <p className="text-center text-gray-500">Cargando jugadores...</p>
      ) : (
        <ul className="space-y-2">
          {players.length === 0 ? (
            <p className="text-center text-gray-500">Falta cargar jugadores...</p>
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
    </nav>
  );
};

export default SidebarComponents;