import Image from "next/image";

function Titulo() {
  return (
    <h1 className="text-4xl font-bold mb-4">
      Actividad 3 Sistemas Distribuidos
    </h1>
  );
}

function Parrafo() {
  return (
    <p className="text-lg mb-6">
      Mi repositorio de GitHub:
    </p>
  );
}

function BotonRepo() {
  return (
    <a
      href="https://github.com/LauStadler/SistemasDistribuidos.git"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
    >
      Ir al repo
    </a>
  );
}

function Imagen() {
  return (
  <Image
    src="/meme gato.png"
    alt="Meme de gato"
    width={300}
    height={300}
    className="mx-auto mb-2"  // menos margen abajo
  />
  );
}

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <main>
        <Titulo />
        <Imagen />
        <Parrafo />
        <BotonRepo />
      </main>
    </div>
  );
}
/*

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <main>
        <h1 className="text-4xl font-bold mb-4">
          Actividad 3 Sistemas Distribuidos
        </h1>

        <p className="text-lg mb-6">Mi repositorio de GitHub:</p>

        <a
          href="https://github.com/LauStadler/SistemasDistribuidos.git"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition"
        >
          Ir al repo
        </a>
      </main>
    </div>
  );
}
*/