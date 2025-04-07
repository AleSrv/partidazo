import { createContext } from "react";
import { Convocado } from "../types/Jugador";

export interface ConvocadosContextType {
  convocados: Convocado[];
  agregarConvocado: (convocado: Omit<Convocado, "id">) => Promise<void>;
  agregarConvocados: (convocados: Omit<Convocado, "id">[]) => Promise<void>;
  eliminarConvocado: (id: string) => Promise<void>;
  quitarConvocado: (id: string) => void; 
}


export const ConvocadosContext = createContext<ConvocadosContextType | undefined>(undefined);