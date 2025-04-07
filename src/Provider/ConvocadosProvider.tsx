import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Convocado } from "../types/Jugador";
import { ConvocadosContext } from "../context/ConvocadosContext";

export const ConvocadosProvider = ({ children }: { children: React.ReactNode }) => {
  const [convocados, setConvocados] = useState<Convocado[]>([]);

  // inicializa el estado de convocados desde Supabase
  useEffect(() => {
    const fetchConvocados = async () => {
      const { data, error } = await supabase.from("convocados").select("*");
      if (error) console.error(error);
      else setConvocados(data || []);
    };

    fetchConvocados();
  }, []);

  // ✅ Nueva función local: quitar un jugador del array (no toca Supabase)
  const quitarConvocado = (jugadorId: string) => {
    setConvocados((prev) => prev.filter((jugador) => jugador.id !== jugadorId));
  };

  // Funcion para eliminar un convocado de la base de datos y del estado local
  const eliminarConvocado = async (id: string) => {
    const { error } = await supabase.from("convocados").delete().eq("id", id);
    if (error) console.error(error);
    else setConvocados((prev) => prev.filter((c) => c.id !== id));
  };

  // Funcion para agregar un convocado a la base de datos y al estado local
  const agregarConvocado = async (convocado: Omit<Convocado, "id">) => {
    const { data, error } = await supabase
      .from("convocados")
      .insert([convocado])
      .select()
      .single();
    if (error) console.error(error);
    else setConvocados((prev) => [...prev, data]);
  };

  // Funcion para agregar varios convocados a la base de datos y al estado local
  const agregarConvocados = async (convocados: Omit<Convocado, "id">[]) => {
    const { data, error } = await supabase
      .from("convocados")
      .insert(convocados)
      .select();
    if (error) console.error(error);
    else setConvocados((prev) => [...prev, ...(data || [])]);
  };


  return (
    <ConvocadosContext.Provider
      value={{
        convocados,
        agregarConvocado,
        agregarConvocados,
        eliminarConvocado,
        quitarConvocado, 
      }}
    >
      {children}
    </ConvocadosContext.Provider>
  );
};
