import { createContext } from "react";
import { Jugador } from "../types/Jugador";

export interface JugadoresContextType {
  jugadores: Jugador[];
  loading: boolean;
  error: string | null;
  agregarJugador: (jugador: Omit<Jugador, "id">) => Promise<void>;
  eliminarJugador: (id: string) => Promise<void>;
}

export const JugadoresContext = createContext<JugadoresContextType | undefined>(undefined);
