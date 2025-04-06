import { Jugador } from "../types/Player";
import React from "react";

export interface PlayerContextProps {
  players: Jugador[];
  addPlayer: (jugador: Jugador) => Promise<void>;
  loading: boolean;
  selectedPlayers: Jugador[]; // Agregar esta propiedad
  togglePlayerSelection: (player: Jugador) => Promise<void>; // Agregar esta propiedad
}

export const PlayerContext = React.createContext<PlayerContextProps | undefined>(undefined);