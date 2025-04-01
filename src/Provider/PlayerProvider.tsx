// filepath: c:\Users\corre\inicioReact\Partidazos\src\Provider\PlayerProvider.tsx
import { useState, useEffect, ReactNode } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Jugador } from "../types/Player";
import { supabase } from "../supabaseClient";

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Jugador[]>([]);
  const [loading, setLoading] = useState(false);

  // Función para cargar jugadores desde Supabase
  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("players").select("*");
      if (error) {
        console.error("Error al cargar jugadores desde Supabase:", error.message);
      } else if (data) {
        setPlayers(data); // Actualiza el estado con los jugadores cargados        
      }
    } catch (err) {
      console.error("Error inesperado al cargar jugadores:", err);
    } finally {
      setLoading(false);
    }
  };

  // Llamar a fetchPlayers al montar el componente
  useEffect(() => {
    fetchPlayers();
  }, []);

  // Función para agregar un jugador
  const addPlayer = async (jugador: Jugador) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("players").insert(jugador).select();
      if (error) {
        console.error("Error al guardar el jugador en Supabase:", error.message);
        return;
      }
      if (data) {
        setPlayers((prevPlayers) => [...prevPlayers, ...data]); // Actualiza el estado local
      }
    } catch (err) {
      console.error("Error inesperado al guardar el jugador:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, loading }}>
      {children}
    </PlayerContext.Provider>
  );
};