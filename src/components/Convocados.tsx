import { useConvocadosContext } from "../Hooks/useConvocadosContext";

function Convocados() {
  const { convocados } = useConvocadosContext();

  return (
    <div className="p-4 bg-slate-600 text-black rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2 bg-white p-2 rounded">
        Jugadores Convocados
      </h2>

      {convocados.length === 0 ? (
        <p >No hay jugadores convocados.</p>
      ) : (
        <ul className="space-y-2">
          {convocados.map((jugador) => (
            <li key={jugador.id} className="flex items-center gap-2 p-2 rounded bg-blue-100">
              <img
                src={jugador.imagen}
                alt={`Avatar de ${jugador.nombre}`}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
              />
              <span>{jugador.nombre} - {jugador.puntaje} pts.</span>
              {jugador.esPortero && <span className="text-green-500 font-bold ml-2">(Portero)</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Convocados;