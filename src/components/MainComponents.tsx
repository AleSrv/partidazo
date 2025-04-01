import { useState, useEffect } from "react";
import { usePlayerContext } from "../Hooks/usePlayerContext";

const MainComponents = () => {
  const { addPlayer } = usePlayerContext();
  const [nombre, setNombre] = useState("");
  const [puntaje, setPuntaje] = useState(1);
  const [imagen, setImagen] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Generar una imagen aleatoria al cargar el componente
  useEffect(() => {
    const randomSeed = Math.random().toString(36).substring(7);
    setImagen(`https://robohash.org/${randomSeed}?set=set1`);
  }, []);

  const handleImageRefresh = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setImagen(`https://robohash.org/${randomSeed}?set=set1`);
    setIsImageLoaded(false); // Marca la imagen como no cargada
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nombre.trim() && isImageLoaded) {
      await addPlayer({ nombre, puntaje, imagen }); // Guarda el jugador en Supabase
      setNombre(""); // Limpia el campo de nombre
      setPuntaje(1); // Restablece el puntaje
      handleImageRefresh(); // Genera una nueva imagen para el siguiente jugador
    } else {
      console.error("La imagen no está cargada o el nombre está vacío.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="form flex flex-row gap-4 bg-fuchsia-300 text-black p-4 rounded-lg items-center"
      >
        <label htmlFor="nombre" className="uppercase text-left">JUGADOR:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-1/4 min-w-60 text-center rounded border border-gray-300"
        />
        <label htmlFor="puntuacion" className="uppercase text-left">PUNTUACIÓN:</label>
        <select
          id="puntuacion"
          name="puntuacion"
          value={puntaje}
          onChange={(e) => setPuntaje(Number(e.target.value))}
          className="w-12 text-center rounded border border-gray-300"
          required
        >
          {Array.from({ length: 19 }, (_, i) => 1 + i * 0.5).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        <div
          className="flex items-center gap-2 border-black border-2 rounded p-2 cursor-pointer"
          onClick={handleImageRefresh}
        >
          <img
            src={imagen}
            alt="Imagen aleatoria de robot"
            className="w-8 h-8 rounded"
            onLoad={() => setIsImageLoaded(true)} // Marca la imagen como cargada
            onError={() => setIsImageLoaded(false)} // Maneja errores de carga
          />
          <span className="w-8 h-8">🔄</span>
        </div>
        <input
          type="submit"
          className={`bg-fuchsia-500 hover:bg-fuchsia-600 text-black py-2 px-4 rounded ${
            !isImageLoaded ? "opacity-50 cursor-not-allowed" : ""
          }`}
          value="Agregar"
          disabled={!isImageLoaded} // Deshabilita el botón si la imagen no está cargada
        />
      </form>
    </div>
  );
};

export default MainComponents;