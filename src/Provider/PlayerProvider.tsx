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
        // Asegúrate de enviar los datos en el formato correcto
        const { error } = await supabase.from("convocados").insert({
          id: player.id, // UUID del jugador
          nombre: player.nombre, // Nombre del jugador
          puntaje: player.puntaje, // Puntaje del jugador
          imagen: player.imagen, // URL de la imagen del jugador
        });
        if (error) {
          console.error("Error al agregar jugador a convocados:", error.message);
        }
      } catch (error) {
        console.error("Error inesperado al agregar jugador a convocados:", error);
      }
    }
  };
  return (
    <PlayerContext.Provider value={{ players, addPlayer, loading, selectedPlayers, togglePlayerSelection }}>
      {children}
    </PlayerContext.Provider>
  );
};