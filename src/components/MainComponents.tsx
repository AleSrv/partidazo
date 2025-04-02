import { useState, useEffect } from "react";
import { usePlayerContext } from "../Hooks/usePlayerContext";

const MainComponents = () => {
  const { addPlayer } = usePlayerContext();
  const [nombre, setNombre] = useState("");
  const [puntaje, setPuntaje] = useState(1);
  const [imagen, setImagen] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Función para generar una imagen aleatoria
  const generateRandomImage = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://robohash.org/${randomSeed}?set=set1`;
  };

  // Precargar la imagen inicial al montar el componente
  useEffect(() => {
    const imageUrl = generateRandomImage();
    const newImage = new Image();

    newImage.src = imageUrl;
    newImage.onload = () => {
      setImagen(imageUrl);
      setIsImageLoaded(true); // Marca la imagen como cargada
    };
    newImage.onerror = () => {
      console.error("Error al cargar la imagen inicial.");
      setIsImageLoaded(false);
    };
  }, []);

  // Manejar el refresco de la imagen
  const handleImageRefresh = () => {
    const imageUrl = generateRandomImage();
    const newImage = new Image();

    setIsImageLoaded(false); // Marca la imagen como no cargada
    newImage.src = imageUrl;
    newImage.onload = () => {
      setImagen(imageUrl);
      setIsImageLoaded(true); // Marca la imagen como cargada
    };
    newImage.onerror = () => {
      console.error("Error al cargar la nueva imagen.");
      setIsImageLoaded(false);
    };
  };

  // Manejar el envío del formulario
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
    <div className="p-4">
      <form
        onSubmit={handleSubmit}
        className="form flex flex-wrap md:flex-row gap-4 bg-fuchsia-300 text-black p-4 rounded-lg items-center justify-between"
      >
        {/* Campo de nombre */}
        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="nombre" className="uppercase text-left mb-2">JUGADOR:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full text-center rounded border border-gray-300 p-2"
          />
        </div>

        {/* Campo de puntuación */}
        <div className="flex flex-col w-full md:w-1/4">
          <label htmlFor="puntuacion" className="uppercase text-left mb-2">PUNTUACIÓN:</label>
          <select
            id="puntuacion"
            name="puntuacion"
            value={puntaje}
            onChange={(e) => setPuntaje(Number(e.target.value))}
            className="w-full text-center rounded border border-gray-300 p-2"
            required
          >
            {Array.from({ length: 19 }, (_, i) => 1 + i * 0.5).map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Imagen y botón de refrescar */}
        <div
          className="flex items-center gap-2 border-black border-2 rounded p-2 cursor-pointer"
          onClick={handleImageRefresh}
        >
          <img
            src={imagen}
            alt="Imagen aleatoria de robot"
            className="w-16 h-16 rounded"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(false)}
          />
          <span className="w-8 h-8">🔄</span>
        </div>

        {/* Botón de envío */}
        <div className="w-full md:w-auto">
          <input
            type="submit"
            className={`bg-fuchsia-500 hover:bg-fuchsia-600 text-black py-2 px-4 rounded ${
              !isImageLoaded ? "opacity-50 cursor-not-allowed" : ""
            }`}
            value="Agregar"
            disabled={!isImageLoaded}
          />
        </div>
      </form>
    </div>
  );
};

export default MainComponents;