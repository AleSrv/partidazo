import { useState } from "react";
import { usePlayerContext } from "../Hooks/usePlayerContext";

const MainComponents = () => {
  const { addPlayer } = usePlayerContext();

  // Función para generar una imagen aleatoria
  const generateRandomImage = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://robohash.org/${randomSeed}?set=set1`;
  };

  // Estados
  const [nombre, setNombre] = useState("");
  const [puntaje, setPuntaje] = useState(1);
  const [imagen, setImagen] = useState(generateRandomImage()); 
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [error, setError] = useState(false); 

  // Manejar el refresco de la imagen
  const handleImageRefresh = () => {
    const imageUrl = generateRandomImage();
    const newImage = new Image();

    setIsImageLoaded(false); 
    setError(false); 
    newImage.src = imageUrl;
    newImage.onload = () => {
      setImagen(imageUrl);
      setIsImageLoaded(true);
    };
    newImage.onerror = () => {
      console.error("Error al cargar la imagen.");
      setError(true); 
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
    <div className="flex items-center justify-center w-full h-full bg-lime-800 text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-fuchsia-300 text-black p-6  shadow-lg max-w-lg w-full"
      >
        {/* Campo de nombre */}
        <div className="flex flex-col">
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

        {/* Cuadrados para seleccionar el puntaje */}
        <div className="flex flex-wrap gap-2 mt-4">
          {Array.from({ length: 19 }, (_, i) => 1 + i * 0.5).map((value) => (
            <div
              key={value}
              onClick={() => setPuntaje(value)}
              className={`cursor-pointer w-12 h-12 flex items-center justify-center rounded border transition-colors ${
                puntaje === value
                  ? "bg-blue-500 text-white hover:bg-blue-600 font-bold"
                  : "bg-white text-black hover:bg-gray-200 hover:text-black font-semibold"
              }`}
            >
              {value}
            </div>
          ))}
        </div>

        {/* Imagen y botón de refrescar */}
        <div className="flex flex-col items-center mt-4">
          {error && (
            <p className="text-red-500 mb-2">Error al cargar la imagen. Intenta nuevamente.</p>
          )}
          <button
            type="button"
            className="flex items-center justify-center cursor-pointer border-4 border-gray-300 rounded p-2 hover:bg-gray-200"
            onClick={handleImageRefresh}
          >
            <img
              src={imagen}
              alt="Imagen aleatoria de robot"
              className="w-16 h-16 rounded"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(false)}
            />
            <p>REFRESCAR <span className="w-8 h-8 rounded">🔄</span></p>
          </button>
        </div>

        {/* Botón de envío */}
        <div className="mt-4">
          <input
            type="submit"
            className={`uppercase font-bold bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded w-full ${
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