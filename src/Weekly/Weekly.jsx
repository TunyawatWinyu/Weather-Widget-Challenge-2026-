import { useState } from "react";

const Weekly = ({ daily, weatherIcons }) => {
  const days = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"]; //Giorni della settimana

  const itemsPerPage = 5; // indica numero massimo di items che può contenere il contenitore
  const [page, setPage] = useState(0); // lo state che indica la pagina corrente che l’utente sta guardando
  const totalPages = Math.ceil(daily.length / itemsPerPage); // indica il numero totale di pagine disponibili

  // mostra solo gli elementi della pagina corrente dall’array
  const currentItems = daily.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );
  return (
    <>
      <div className="weekly-weather my-4 w-120">
        <div className="flex flex-col w-120 h-55 shadow-sm px-9 py-9 rounded-4xl">
          {/* riga dei giorni */}
          <div className="flex w-full justify-start gap-12.5 mb-4">
            {currentItems.slice(0, 5).map((d, i) => {
              const dayIndex = days[new Date(d.date).getDay()];
              return (
                <div key={i} className="flex flex-col items-center">
                  <p className="font-medium">
                    {d.tempMin}° - <br />
                    {d.tempMax}°
                  </p>
                  <p className="text-3xl my-2">{weatherIcons[d.code]}</p>
                  <p className="font-medium">{dayIndex}</p>
                </div>
              );
            })}
          </div>

          {/* indicatori a cerchio*/}
          <div className="flex justify-center gap-2 my-5">
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

export default Weekly;
