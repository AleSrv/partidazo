import { usePlayerContext } from "../Hooks/usePlayerContext";

function Convocados() {
  const { selectedPlayers } = usePlayerContext();

  return (
    <div className="p-4 bg-slate-600 text-black rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Jugadores Convocados</h2>
      {selectedPlayers.length === 0 ? (
        <p className="text-gray-600">No hay jugadores convocados.</p>
      ) : (
        <ul className="space-y-2">
          {selectedPlayers.map((player) => (
            <li key={player.id} className="flex items-center gap-2 p-2 rounded bg-blue-100">
              <img
                src={player.imagen}
                alt={`Avatar de ${player.nombre}`}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
              />
              <span>{player.nombre} - {player.puntaje} pts.</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Convocados;