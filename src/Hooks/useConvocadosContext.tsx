import { useContext } from "react";
import { ConvocadosContext } from "../context/ConvocadosContext";

export const useConvocadosContext = () => {
  const context = useContext(ConvocadosContext);
  if (!context) {
    throw new Error("useConvocadosContext debe usarse dentro de un ConvocadosProvider");
  }
  return context;
};