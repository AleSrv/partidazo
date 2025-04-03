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
    <div className="flex items-center justify-center w-full h-full  bg-lime-800 text-white ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-fuchsia-300 text-black p-6 rounded-lg shadow-lg max-w-lg w-full"
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
 {/* Cuadrados para seleccionar el puntaje */}
<div className="flex flex-wrap gap-2 mt-4">
  {Array.from({ length: 19 }, (_, i) => 1 + i * 0.5).map((value) => (
    <div
      key={value}
      onClick={() => setPuntaje(value)}
      className={`cursor-pointer w-12 h-12 flex items-center justify-center rounded border transition-colors ${
        puntaje === value
          ? "bg-blue-500 text-white"
          : "bg-white text-black hover:bg-gray-200 hover:text-black"
      }`}
    >
      {value}
    </div>
  ))}
</div>

        {/* Imagen y botón de refrescar */}
        <div
          className="flex items-center justify-center mt-4 cursor-pointer border-2 border-gray-300 rounded p-2 hover:bg-gray-200"
          onClick={handleImageRefresh}
        >
          <img
            src={imagen}
            alt="Imagen aleatoria de robot"
            className="w-16 h-16 rounded"
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setIsImageLoaded(false)}
          />
          <div
            className={`flex items-center gap-2 p-2 rounded border ${
              isImageLoaded ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            <span className="w-8 h-8">🔄</span>
            <p>CAMBIAR IMAGEN</p>
          </div>
        </div>

        {/* Botón de envío */}
        <div className="mt-4">
          <input
            type="submit"
            className={`bg-fuchsia-500 hover:bg-fuchsia-600 text-black py-2 px-4 rounded w-full ${
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