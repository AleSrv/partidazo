import { createContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export interface Jugador {
  id?: string;
  nombre: string;
  puntaje: number;
  imagen: string;
}

interface JugadoresContextType {
  jugadores: Jugador[];
  agregarJugador: (jugador: Omit<Jugador, "id">) => Promise<void>;
  eliminarJugador: (id: string) => Promise<void>;
}

export const JugadoresContext = createContext<JugadoresContextType | undefined>(undefined);

export const JugadoresProvider = ({ children }: { children: React.ReactNode }) => {
  const [jugadores, setJugadores] = useState<Jugador[]>([]);

  // Cargar jugadores al iniciar la app
  useEffect(() => {
    const fetchJugadores = async () => {
      const { data, error } = await supabase.from("jugadores").select("*");
      if (error) console.error(error);
      else setJugadores(data || []);
    };

    fetchJugadores();
  }, []);

  // Agregar jugador en Supabase y en el estado
  const agregarJugador = async (jugador: Omit<Jugador, "id">) => {
    const { data, error } = await supabase.from("jugadores").insert([jugador]).select().single();
    if (error) console.error(error);
    else setJugadores((prev) => [...prev, data]);
  };

  // Eliminar jugador
  const eliminarJugador = async (id: string) => {
    const { error } = await supabase.from("jugadores").delete().eq("id", id);
    if (error) console.error(error);
    else setJugadores((prev) => prev.filter((j) => j.id !== id));
  };

  return (
    <JugadoresContext.Provider value={{ jugadores, agregarJugador, eliminarJugador }}>
      {children}
    </JugadoresContext.Provider>
  );
};
