import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Jugador } from "../types/Jugador";
import { JugadoresContext } from "../context/JugadoresContext";
import toast from "react-hot-toast";

export const JugadoresProvider = ({ children }: { children: React.ReactNode }) => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener jugadores al iniciar
  useEffect(() => {
    const fetchJugadores = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("jugadores").select("*");
      if (error) {
        console.error(error);
        setError("Error al cargar jugadores");
        toast.error("Error al cargar jugadores");
      } else {
        setJugadores(data || []);
      }
      setLoading(false);
    };

    fetchJugadores();
  }, []);

  const agregarJugador = async (jugador: Omit<Jugador, "id">) => {
    const { data, error } = await supabase.from("jugadores").insert([jugador]).select().single();
    if (error) {
      console.error(error);
      toast.error("Error al agregar jugador");
    } else {
      setJugadores((prev) => [...prev, data]);
      toast.success("Jugador agregado");
    }
  };

  const eliminarJugador = async (id: string) => {
    const { error } = await supabase.from("jugadores").delete().eq("id", id);
    if (error) {
      console.error(error);
      toast.error("Error al eliminar jugador");
    } else {
      setJugadores((prev) => prev.filter((j) => j.id !== id));
      toast.success("Jugador eliminado");
    }
  };

  return (
    <JugadoresContext.Provider
      value={{ jugadores, loading, error, agregarJugador, eliminarJugador }}
    >
      {children}
    </JugadoresContext.Provider>
  );
};
