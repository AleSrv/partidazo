import { useState } from "react";
import { useJugadoresContext } from "../Hooks/useJugadoresContext";
import { useConvocadosContext } from "../Hooks/useConvocadosContext";
import { Jugador } from "../types/Jugador";

const SidebarComponents: React.FC<{ isOpen: boolean; closeSidebar: () => void }> = ({
  isOpen,
  closeSidebar,
}) => {
  const { jugadores } = useJugadoresContext();
  const { agregarConvocados, quitarConvocado } = useConvocadosContext();
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  const toggleSeleccion = (jugador: Jugador) => {
    const jugadorId = jugador.id;
    if (!jugadorId) return; // Previene el error si id es undefined

    const yaSeleccionado = seleccionados.includes(jugadorId);

    if (yaSeleccionado) {
      setSeleccionados((prev) => prev.filter((id) => id !== jugadorId));
      quitarConvocado(jugadorId);
    } else {
      setSeleccionados((prev) => [...prev, jugadorId]);
      agregarConvocados([
        {
          id_jugador: jugador.id!, // Aseguramos que se pase el id del jugador
          nombre: jugador.nombre,
          puntaje: jugador.puntaje,
          imagen: jugador.imagen,
          esPortero: jugador.esPortero,
        }
      ]);
    }
  };


  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-lime-800 text-white p-4 border-r-4 border-white transform ${isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-20`}
    >
      <button
        className="text-white bg-red-500 px-4 py-2 rounded mb-4"
        onClick={closeSidebar}
      >
        Cerrar
      </button>

      <h2 className="text-lg font-bold mb-4">Lista de Jugadores</h2>

      {jugadores.length === 0 ? (
        <p className="text-center text-gray-500">No hay jugadores disponibles.</p>
      ) : (
        <ul className="space-y-2">
          {jugadores.map((jugador) => {
            const jugadorId = jugador.id;
            if (!jugadorId) return null;

            const isSelected = seleccionados.includes(jugadorId);

            return (
              <li
                key={jugadorId}
                onClick={() => toggleSeleccion(jugador)}
                className={`transition-colors duration-200 ease-in-out flex items-center gap-2 p-2 rounded cursor-pointer border-2 ${isSelected
                  ? "bg-blue-500 text-white border-blue-700"
                  : "bg-white text-black border-gray-300 hover:bg-gray-200"
                  }`}
              >
                <img
                  src={jugador.imagen}
                  alt={`Avatar de ${jugador.nombre}`}
                  className="w-8 h-8 rounded-full border-2 border-gray-300"
                />
                <span>{jugador.nombre} - {jugador.puntaje} pts.</span>
                {jugador.esPortero && <span className="text-green-500 font-bold ml-auto">(Portero)</span>}
                {isSelected && <span className="ml-auto text-white font-bold">✔</span>}
              </li>
            );
          })}

        </ul>
      )}
    </div>
  );
};

export default SidebarComponents;
