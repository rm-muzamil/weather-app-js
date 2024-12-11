import React, { useState } from "react";
import "./App.css";

const API_KEY = "135f82dfd6a2a2217651464425566c59"; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      console.log(data);
      
      setWeather({
        temperature: data.main.temp,
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        city: data.name,
        country: data.sys.country,
        feels_like : data.main.feels_like,
        humidity: data.main.humidity

      });
      setCity(""); // Clear input
    } catch (error) {
      setWeather(null);
      setError("City not found. Please try again.");
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>
            {weather.city}, {weather.country}
          </h2>
          <img src={weather.icon} alt={weather.description} />
          <p>{weather.description}</p>
          <p>{weather.temperature}°C</p>
          <p>{weather.feels_like}</p>
          <p>{weather.humidity}</p>
        </div>
      )}
    </div>
  );
}

export default App;
