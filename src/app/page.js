// pages/index.js
"use client"
import React, { useState, useEffect, useRef } from 'react';
import WeatherCard from './components/WeatherCard';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const apiKey = '5efe5db47da948f8a0a45048240806';
  const inputRef = useRef(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
      );
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      const data = await response.json();
      setWeatherData(data);
      setCountry(data.location.country); // Set country from the weather data
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('Weather data not found');
    }
  };

  const fetchCitySuggestions = async () => {
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${city}`
      );
      if (!response.ok) {
        throw new Error('City suggestions not found');
      }
      const data = await response.json();
      const modifiedSuggestions = data.map((item) => ({
        id: item.id,
        name: `${item.name}, ${item.country}`,
      }));
      setSuggestions(modifiedSuggestions);
    } catch (error) {
      console.error('Error fetching city suggestions:', error);
      setSuggestions([]);
    }
  };

  useEffect(() => {
    if (city.length > 2) {
      fetchCitySuggestions();
    } else {
      setSuggestions([]);
    }
  }, [city]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-slate-950">
      <div className="max-w-md w-full bg-slate-800/75 rounded-lg shadow-md overflow-hidden backdrop-blur-lg bg-opacity-80">
        <h1 className="text-3xl text-emerald-600 font-semibold p-4 text-center">Weather Checker</h1>
        {weatherData && (
          <div className="p-4 bg-slate-800/75">
            <WeatherCard weather={weatherData} country={country} />
          </div>
        )}
        <div className="flex flex-col items-center p-4 relative">
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setShowSuggestions(true);
            }}
            className="p-2 mb-4 text-white border border-gray-300/50 bg-transparent rounded-md"
            ref={inputRef}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute w-full mt-10 bg-slate-800/75 rounded-b-lg shadow-md overflow-hidden backdrop-blur-lg bg-opacity-80">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="p-2 bg-slate-700 hover:bg-slate-600 cursor-pointer" onClick={() => {
                  setCity(suggestion.name);
                  setShowSuggestions(false);
                }}>
                  <p className="text-white">{suggestion.name}</p>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={fetchWeather}
            className="px-4 py-2 text-emerald-600 bg-slate-800 rounded-md"
          >
            Get Weather
          </button>
        </div>
        {error && <div className="p-4 bg-slate-800/75 text-rose-600">{error}</div>}
      </div>
    </div>
  );
};

export default Home;
