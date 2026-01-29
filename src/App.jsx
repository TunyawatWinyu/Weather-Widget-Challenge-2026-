import { useEffect, useState } from "react";
import Hourly from "./Hourly/Hourly";
import Weekly from "./Weekly/Weekly";
import Current from "./Current/Current";

// Codici per le icone del tempo
const weatherIcons = {
  0: "☀️", // cielo sereno
  1: "🌤️", // poco nuvoloso
  2: "⛅", // nuvoloso
  3: "☁️", // coperto
  45: "🌫️", // nebbia
  61: "🌧️", // pioggia leggera
  63: "🌦️", // pioggia moderata
  71: "❄️", // neve
  80: "🌦️", // pioggia temporale
};

function App() {
  const [location, setLocation] = useState(""); // State per il location
  const [hourly, setHourly] = useState([]); // State per la sezione hourly
  const [daily, setDaily] = useState([]); // State per la sezione weekly
  const lat = 41.9;
  const lon = 12.5;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Chiamo Api per quanto riguarda la località
        const geoRes = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=it`,
        );
        const geoData = await geoRes.json();
        setLocation(`${geoData.city}, ${geoData.countryName}`);

        // Chiamo Api per quanto riguarda le previsione del tempo di ogni ora
        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weathercode,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode`,
        );
        const weatherData = await weatherRes.json();

        // vado a creare per ogni ora un oggetto che include orario, la temperatura e i codici per le icone
        setHourly(
          weatherData.hourly.time.map((time, i) => ({
            time,
            temp: weatherData.hourly.temperature_2m[i],
            code: weatherData.hourly.weathercode[i],
          })),
        );

        // vado a creare per ogni giorno un oggetto che include temperatura minima, temperatura massima e i codici per le icone
        setDaily(
          weatherData.daily.time.map((date, i) => ({
            date,
            tempMax: weatherData.daily.temperature_2m_max[i],
            tempMin: weatherData.daily.temperature_2m_min[i],
            code: weatherData.daily.weathercode[i],
          })),
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="app flex justify-center items-center flex-col my-14">
      {/* current weather*/}

      <Current
        hourly={hourly}
        weatherIcons={weatherIcons}
        location={location}
      />

      {/* hour weather*/}

      <Hourly
        hourly={hourly}
        setHourly={setHourly}
        weatherIcons={weatherIcons}
      />

      {/* Weekly weather */}
      <Weekly daily={daily} weatherIcons={weatherIcons} />
    </div>
  );
}

export default App;
