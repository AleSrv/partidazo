// filepath: c:\Users\corre\inicioReact\Partidazos\src\context\PlayerContext.tsx
import { createContext } from "react";
import { Jugador } from "../types/Player";

interface PlayerContextProps {
  players: Jugador[];
  addPlayer: (jugador: Jugador) => Promise<void>;
  loading: boolean;
}

export const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);