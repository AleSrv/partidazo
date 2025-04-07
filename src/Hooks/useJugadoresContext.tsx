import { useContext } from "react";
import { JugadoresContext } from "../context/JugadoresContext";

export const useJugadoresContext = () => {
  const context = useContext(JugadoresContext);
  if (!context) {
    throw new Error("useJugadoresContext debe usarse dentro de un JugadoresProvider");
  }
  return context;
};