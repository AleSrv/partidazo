import { createContext, useState, useEffect, ReactNode } from "react";
import { Player } from "../types/Player";
import { supabase } from "../supabaseClient";

interface PlayerContextProps {
  players: Player[];
  addPlayer: (player: Player) => Promise<void>;
  loading: boolean; // Nuevo estado para indicar si está cargando
}

export const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para cargar jugadores desde Supabase
  const fetchPlayers = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("players").select("*");
    if (error) {
      console.error("Error al cargar jugadores desde Supabase:", error.message);
    } else {
      setPlayers(data || []);
    }
    setLoading(false);
  };

  // Cargar jugadores al montar el componente
  useEffect(() => {
    fetchPlayers();
  }, []);

  const addPlayer = async (player: Player) => {
    try {
      const { data, error } = await supabase.from("players").insert(player);
      if (error) {
        console.error("Error al guardar el jugador en Supabase:", error.message);
        return;
      }
      setPlayers((prevPlayers) => [...prevPlayers, player]);
    } catch (err) {
      console.error("Error inesperado al guardar el jugador:", err);
    }
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, loading }}>
      {children}
    </PlayerContext.Provider>
  );
};