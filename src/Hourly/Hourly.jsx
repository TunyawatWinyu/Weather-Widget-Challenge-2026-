import { useState } from "react";

const Hourly = ({ hourly, weatherIcons }) => {
  const itemsPerPage = 5; // indica numero massimo di items che può contenere il contenitore
  const [page, setPage] = useState(0); // lo state che indica la pagina corrente che l’utente sta guardando
  const totalPages = 5; // indica il numero totale di pagine disponibili

  // mostra solo gli elementi della pagina corrente dall’array
  const currentItems = hourly.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  return (
    <>
      <div className="hour-weather my-8 w-120">
        <div className="flex flex-col shadow-sm px-9 py-9 rounded-4xl">
          {/* riga degli orari */}
          <div className="flex flex-row justify-between mb-4">
            {currentItems.slice(0, 5).map((h, i) => (
              <div key={i} className="flex flex-col items-center">
                <p className="font-medium">{h.temp}°</p>
                <p className="text-3xl my-2">{weatherIcons[h.code]}</p>
                <p className="font-medium">{h.time.split("T")[1]}</p>
                <p className="text-gray-400 text-xs">
                  {h.time.split("T")[1] < "12:00" ? "AM" : "PM"}
                </p>
              </div>
            ))}
          </div>

          {/* indicatori a cerchio */}
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-3 h-1 rounded-full cursor-pointer ${i === page ? "bg-gray-800" : "bg-gray-300"}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hourly;
