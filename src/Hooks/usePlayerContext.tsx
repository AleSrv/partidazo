// filepath: c:\Users\corre\inicioReact\Partidazos\src\Hooks\usePlayerContext.tsx
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayerContext debe usarse dentro de un PlayerProvider");
  }
  return context;
};