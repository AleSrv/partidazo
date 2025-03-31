import { useState } from "react";
import { usePlayerContext } from "../Hooks/usePlayerContext";

const MainComponents = () => {
  const { addPlayer } = usePlayerContext();
  const [name, setName] = useState("");
  const [score, setScore] = useState(1);
  const [imageUrl, setImageUrl] = useState(() => {
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://robohash.org/${randomSeed}?set=set1`;
  });
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Estado para controlar si la imagen está cargada

  const handleImageRefresh = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    setImageUrl(`https://robohash.org/${randomSeed}?set=set1`);
    setIsImageLoaded(false); // Marca la imagen como no cargada
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && isImageLoaded) {
      await addPlayer({ name, score, imageUrl }); // Guarda el jugador en Supabase
      setName(""); // Limpia el campo de nombre
      setScore(1); // Restablece el puntaje
      handleImageRefresh(); // Genera una nueva imagen para el siguiente jugador
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="form flex flex-row gap-4 bg-fuchsia-300 text-black p-4 rounded-lg items-center"
      >
        <label htmlFor="name" className="uppercase text-left">JUGADOR:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-1/4 min-w-60 text-center rounded border border-gray-300"
        />
        <label htmlFor="puntuacion" className="uppercase text-left">PUNTUACIÓN:</label>
        <select
          id="puntuacion"
          name="puntuacion"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-12 text-center rounded border border-gray-300"
          required
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
        <div
          className="flex items-center gap-2 border-black border-2 rounded p-2 cursor-pointer"
          onClick={handleImageRefresh}
        >
          <img
            src={imageUrl}
            alt="Imagen aleatoria de robot"
            className="w-8 h-8 rounded"
            onLoad={() => setIsImageLoaded(true)} // Marca la imagen como cargada cuando se carga
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