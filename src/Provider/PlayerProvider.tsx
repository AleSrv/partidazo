import { useState, useEffect, ReactNode } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Jugador } from "../types/Player";
import { supabase } from "../supabaseClient";

export const PlayerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Jugador[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<Jugador[]>([]); // Estado para jugadores seleccionados
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

  // Función para cargar jugadores seleccionados desde Supabase
  const fetchSelectedPlayers = async () => {
    try {
      const { data, error } = await supabase.from("convocados").select("*");
      if (error) {
        console.error("Error al cargar jugadores seleccionados desde Supabase:", error.message);
      } else if (data) {
        setSelectedPlayers(data); // Actualiza el estado con los jugadores seleccionados
      }
    } catch (err) {
      console.error("Error inesperado al cargar jugadores seleccionados:", err);
    }
  };

  // Llamar a fetchPlayers y fetchSelectedPlayers al montar el componente
  useEffect(() => {
    fetchPlayers();
    fetchSelectedPlayers();
  }, []);

  // Función para agregar un jugador a la tabla "players" en Supabase
  const addPlayer = async (jugador: Jugador): Promise<void> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from("players").insert(jugador).select();
      if (error) {
        console.error("Error al agregar jugador a Supabase:", error.message);
        return;
      }
      if (data) {
        setPlayers((prevPlayers) => [...prevPlayers, ...data]); // Actualiza el estado local
      }
    } catch (err) {
      console.error("Error inesperado al agregar jugador:", err);
    } finally {
      setLoading(false);
    }
  };

  // Función para seleccionar/deseleccionar jugadores
  const togglePlayerSelection = async (player: Jugador) => {
    if (selectedPlayers.some((p) => p.id === player.id)) {
      // Deseleccionar jugador
      setSelectedPlayers((prev) => prev.filter((p) => p.id !== player.id));
      try {
        await supabase.from("convocados").delete().eq("id", player.id); // Eliminar de Supabase
      } catch (error) {
        console.error("Error al eliminar jugador de convocados:", error);
      }
    } else {
      // Seleccionar jugador
      setSelectedPlayers((prev) => [...prev, player]);
      try {
        await supabase.from("convocados").insert({
          id: player.id,
          nombre: player.nombre,
          puntaje: player.puntaje,
          imagen: player.imagen,
        }); // Agregar a Supabase
      } catch (error) {
        console.error("Error al agregar jugador a convocados:", error);
      }
    }
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, loading, selectedPlayers, togglePlayerSelection }}>
      {children}
    </PlayerContext.Provider>
  );
};