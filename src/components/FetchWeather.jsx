import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather } from "../features/weather/weatherSlice.js";

const WeatherModal = ({ isOpen, onClose }) => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-semibold text-center">🌤 Weather App</h2>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-lg"
        >
          ✖
        </button>

        {/* Input for City */}
        <div className="flex gap-2 my-4">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Show Loading, Error, or Weather Data */}
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p className="text-red-500">Error: {error}</p>}
        {status === "succeeded" && data && (
          <div className="text-center">
            <h3 className="text-lg font-semibold">
              {data.location.name}, {data.location.region}, {data.location.country}
            </h3>
            <p className="text-gray-500">{data.current.condition.text}</p>
            <h2 className="text-4xl font-bold">{data.current.temp_c}°C</h2>
            <p>Humidity: {data.current.humidity}%</p>
            <p>Wind: {data.current.wind_kph} Km/H</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherModal;
