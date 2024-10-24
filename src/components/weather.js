import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './weather.css';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherData(latitude, longitude);
        },
        (error) => {
          setError("Geolocation is not enabled or allowed.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  const getWeatherData = async (lat, lon) => {
    const apiKey = 'bfed256241434104e6f4c30fba35fb32';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
    } catch (error) {
      setError("Failed to fetch weather data.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const weatherIcon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

  return (
    <div className="weather-widget">
      <h3>Current Weather</h3>
      <p className="location">{weatherData.name}</p>
      <img className="icon" src={weatherIcon} alt="Weather Icon" />
      <p className="temperature">{weatherData.main.temp}°C</p>
      <p className="condition">{weatherData.weather[0].description}</p>
    </div>
  );
};

export default WeatherWidget;
