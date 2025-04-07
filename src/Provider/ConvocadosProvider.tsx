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
  const quitarConvocado = async (idJugador: string) => {
    await supabase.from("convocados").delete().eq("id_jugador", idJugador);
    setConvocados((prev) => prev.filter((j) => j.id_jugador !== idJugador));
  };


  // Funcion para eliminar un convocado de la base de datos y del estado local
  const eliminarConvocado = async (id: string) => {
    const { error } = await supabase.from("convocados").delete().eq("id", id);
    if (error) console.error(error);
    else setConvocados((prev) => prev.filter((c) => c.id !== id));
  };

  // Funcion para agregar un convocado a la base de datos y al estado local
  const agregarConvocado = async (convocado: Omit<Convocado, "id">) => {
    // 1. Verificar si ya existe en la tabla "convocados"
    const { data: existente, error: errorSelect } = await supabase
      .from("convocados")
      .select("*")
      .eq("id_jugador", convocado.id_jugador) // 👈 usa el campo que relaciona al jugador

    if (errorSelect) {
      console.error("Error al verificar si ya existe:", errorSelect);
      return;
    }

    if (existente && existente.length > 0) {
      console.warn("Jugador ya está convocado");
      return; // ❌ Ya existe, no se agrega
    }

    // 2. Si no existe, lo insertamos
    const { data, error: errorInsert } = await supabase
      .from("convocados")
      .insert([convocado])
      .select()
      .single();

    if (errorInsert) {
      console.error("Error al insertar convocado:", errorInsert);
    } else {
      setConvocados((prev) => [...prev, data]);
    }
  };


  // Funcion para agregar varios convocados a la base de datos y al estado local
  const agregarConvocados = async (nuevos: Omit<Convocado, "id">[]) => {
    for (const jugador of nuevos) {
      // Prevenir duplicados: consultar si ya existe
      const { data: existente, error } = await supabase
        .from("convocados")
        .select("*")
        .eq("id_jugador", jugador.id_jugador)
        .maybeSingle();

      if (error) {
        console.error("Error consultando convocado existente:", error);
        continue;
      }

      if (existente) {
        console.log("Jugador ya convocado:", jugador.nombre);
        continue; // ya está convocado, no lo agregamos
      }

      // Insertar nuevo convocado
      const { data, error: insertError } = await supabase
        .from("convocados")
        .insert([jugador])
        .select()
        .single(); // solo uno porque insertamos uno

      if (insertError) {
        console.error("Error al agregar convocado:", insertError);
      } else if (data) {
        setConvocados((prev) => [...prev, data]); // Actualiza el estado local
      }
    }
  }

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
