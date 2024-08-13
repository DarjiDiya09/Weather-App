import hotBg from './assests/hot.jpg';
import coldBg from './assests/cold.jpg';
import './App.css';
import Descriptions from './components/Descriptions';
import { useEffect, useState } from 'react';
import { getFormattedWeatherData } from './weatherService';

function App() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      if (data) {
        setWeather(data);
        setError(null);

        const threshold = units === 'metric' ? 20 : 60;
        if (data.temp <= threshold) {
          setBg(coldBg);
        } else {
          setBg(hotBg);
        }
      } else {
        setError("Sorry, the city you entered is invalid.");
        setWeather(null);
      }
    };

    fetchWeatherData();
  }, [units, city]); 

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    
    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? '°F' : '°C';
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        <div className="container">
          <div className="section section__inputs">
            <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City..." />
            <button onClick={(e) => handleUnitsClick(e)}>°F</button>
          </div>
          {error && <div className="error">{error}</div>}
          {weather && (
            <div>
              <div className="section section__temperature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt='weatherIcon' />
                  <h3>{weather.description}</h3>
                </div>
                <div className='temperature'>
                  <h1>{`${weather.temp.toFixed()} °${units === "metric" ? "C" : "F"}`}</h1>
                </div>
              </div>
              <Descriptions weather={weather} units={units} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
