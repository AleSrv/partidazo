// filepath: c:\Users\corre\inicioReact\Partidazos\src\Provider\PlayerProvider.tsx
import { useState, ReactNode } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Player } from "../types/Player";
import { supabase } from "../supabaseClient"; // Importa el cliente de Supabase

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = async (player: Player) => {
    // Guarda el jugador en la base de datos de Supabase
    const { data, error } = await supabase.from("players").insert(player);

    if (error) {
      console.error("Error al guardar el jugador en Supabase:", error.message);
      return;
    }

    // Actualiza el estado local solo si la inserción fue exitosa
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};