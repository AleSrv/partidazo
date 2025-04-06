import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

// Define la interfaz para los jugadores convocados
interface Convocado {
  id: string;
  nombre: string;
  puntaje: number;
  imagen: string;
}

function Convocados() {
  const [convocados, setConvocados] = useState<Convocado[]>([]); // Especifica el tipo del estado

  // Cargar jugadores convocados desde Supabase
  useEffect(() => {
    const fetchConvocados = async () => {
      const { data, error } = await supabase.from("convocados").select("*");
      if (error) {
        console.error("Error al cargar convocados desde Supabase:", error.message);
      } else {
        setConvocados(data || []); // Asigna los datos al estado
      }
    };

    fetchConvocados();
  }, []);

  return (
    <div className="p-4 bg-slate-600 text-black rounded-lg shadow">
      <h2 className="text-lg font-bold mb-2">Jugadores Convocados</h2>
      {convocados.length === 0 ? (
        <p className="text-gray-600">No hay jugadores convocados.</p>
      ) : (
        <ul className="space-y-2">
          {convocados.map((player) => (
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