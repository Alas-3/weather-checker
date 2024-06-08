// components/WeatherCard.js
import React from 'react';
import { FaWind, FaTint, FaTachometerAlt } from 'react-icons/fa'; // Importing icons

const WeatherCard = ({ weather, country }) => {
  return (
    <div className="p-4 bg-slate-800 backdrop-blur-lg text-white rounded-md shadow-md flex flex-col space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl text-emerald-600 font-semibold">{weather.location.name}, {country}</h2>
          <p className="text-sky-50/75">{weather.current.condition.text}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl text-emerald-600 font-bold">{weather.current.temp_c}°C</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <FaWind className="inline-block text-emerald-600" size={24} /> {/* Icon for Wind Speed */}
          <p className="text-lg font-semibold">Wind Speed</p>
          <p className="text-sky-50/75">{weather.current.wind_kph} kph</p>
        </div>
        <div>
          <FaTint className="inline-block text-emerald-600" size={24} /> {/* Icon for Humidity */}
          <p className="text-lg font-semibold">Humidity</p>
          <p className="text-sky-50/75">{weather.current.humidity}%</p>
        </div>
        <div>
          <FaTachometerAlt className="inline-block text-emerald-600" size={24} /> {/* Icon for Pressure */}
          <p className="text-lg font-semibold">Pressure</p>
          <p className="text-sky-50/75">{weather.current.pressure_mb} mb</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
