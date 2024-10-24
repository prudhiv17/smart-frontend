import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './header';
import './fuwe.css';

const WeatherForm = () => {
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [locationName, setLocationName] = useState('');
    const [forecastData, setForecastData] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [temperature, setTemperature] = useState(''); // MaxT
    const [minTemperature, setMinTemperature] = useState(''); // MinT
    const [humidity, setHumidity] = useState(''); // RH1
    const [humidity2, setHumidity2] = useState(''); // RH2
    const [rainfall, setRainfall] = useState(''); // RF
    const [windSpeed, setWindSpeed] = useState(''); // WS
    const [sunshineHours, setSunshineHours] = useState(''); // SSH
    const [evaporation, setEvaporation] = useState(''); // EVP
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [cropsAffected, setCropsAffected] = useState('');
    const [prevention, setPrevention] = useState([]);

    useEffect(() => {
        const fetchLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setLat(position.coords.latitude);
                        setLon(position.coords.longitude);
                    },
                    (error) => {
                        setError('Unable to retrieve location');
                        setLoading(false);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
                setLoading(false);
            }
        };

        fetchLocation();
    }, []);

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    // Fetch the 5-day weather forecast based on coordinates
    useEffect(() => {
        const fetchForecast = async () => {
            if (lat && lon) {
                try {
                    const apiKey = 'bfed256241434104e6f4c30fba35fb32';
                    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
                        params: {
                            lat: lat,
                            lon: lon,
                            units: 'metric',
                            appid: apiKey,
                        }
                    });

                    const forecast = response.data.list;

                    // Filter the forecast for 12:00:00 on each day
                    const filteredForecast = forecast.filter((item) => item.dt_txt.includes('12:00:00'));

                    setForecastData(filteredForecast);
                    setLocationName(`${response.data.city.name}, ${response.data.city.country}`);
                    setLoading(false);
                } catch (error) {
                    setError('Error fetching forecast data.');
                    setLoading(false);
                }
            }
        };

        if (lat && lon) {
            fetchForecast();
        }
    }, [lat, lon]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);

        // Find the forecast for the selected date
        const selectedForecast = forecastData.find(forecast => forecast.dt_txt.includes(selectedDate));

        if (selectedForecast) {
            setTemperature(selectedForecast.main.temp_max);  // Max temperature
            setMinTemperature(selectedForecast.main.temp_min); // Min temperature
            setHumidity(selectedForecast.main.humidity);
            setHumidity2(selectedForecast.main.humidity); // Assuming RH2 is same
            setWindSpeed(selectedForecast.wind.speed);
        }
    };

    const handleCheckForDisease = async () => {
        // Collect inputs and call disease prediction API
        const data = {
            temperature: parseFloat(temperature),
            minTemperature: parseFloat(minTemperature),
            humidity: parseFloat(humidity),
            humidity2: parseFloat(humidity2),
            rainfall: parseFloat(rainfall),
            windSpeed: parseFloat(windSpeed),
            sunshineHours: parseFloat(sunshineHours),
            evaporation: parseFloat(evaporation)
        };
        console.log('Sending data to API:', data);

        try {
            const response = await axios.post('http://localhost:5000/classify', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const { prediction, crops_affected, prevention } = response.data;
            setPrediction(prediction);
            setCropsAffected(crops_affected);
            setPrevention(prevention);
        } catch (error) {
            console.error('Error making prediction:', error);
            alert('Error making prediction: ' + (error.response?.data?.error || error.message));
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    // Generate options for the date dropdown (next 5 days)
    const dateOptions = forecastData.map((forecast) => {
        const date = forecast.dt_txt.split(' ')[0]; // Extract just the date
        return (
            <option key={date} value={date}>
                {date}
            </option>
        );
    });

    return (
        <>
        <Header />
        
        <div className="weather-form-container">
            <h2>Weather Based Pest Detection</h2>
            <form className="weather-form">
                <div className="form-group">
                    <label>Location (City, Country):</label>
                    <input type="text" value={locationName} disabled className="input-field" />
                </div>

                <div className="form-group">
                    <label>Select Date:</label>
                    <select value={selectedDate} onChange={handleDateChange} className="input-field">
                        <option value="">Select a date</option>
                        {dateOptions}
                    </select>
                </div>

                <div className="form-group">
                    <label>Max Temperature (°C):</label>
                    <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} className="input-field" />
                </div>

                <div className="form-group">
                    <label>Min Temperature (°C):</label>
                    <input type="text" value={minTemperature} onChange={(e) => setMinTemperature(e.target.value)} className="input-field" />
                </div>

                <div className="form-group">
                    <label>Humidity 1 (%):</label>
                    <input type="text" value={humidity} onChange={(e) => setHumidity(e.target.value)} className="input-field" />
                </div>

                <div className="form-group">
                    <label>Humidity 2 (%):</label>
                    <input type="text" value={humidity2} onChange={(e) => setHumidity2(e.target.value)} className="input-field" />
                </div>

                <div className="form-group">
                    <label>Rainfall (mm):</label>
                    <input type="text" value={rainfall} onChange={handleInputChange(setRainfall)} className="input-field" />
                </div>

                <div className="form-group">
                    <label>Wind Speed (kmph):</label>
                    <input type="text" value={windSpeed} onChange={handleInputChange(setWindSpeed)} className="input-field" />
                </div>

                <div className="form-group">
                    <label>Sunshine Hours (hrs):</label>
                    <input type="text" value={sunshineHours} onChange={handleInputChange(setSunshineHours)} className="input-field" />
                </div>

                <div className="form-group">
                    <label>Evaporation (mm):</label>
                    <input type="text" value={evaporation} onChange={handleInputChange(setEvaporation)} className="input-field" />
                </div>

            </form>

            <button className="check-disease-button" onClick={handleCheckForDisease}>
                Check for Disease
            </button>

            {prediction && (
                <div className="prediction-result">
                    <h3>Prediction Result</h3>
                    <p><strong>Predicted Disease:</strong> {prediction}</p>
                    <p><strong>Crops that might get affected:</strong> {cropsAffected}</p>
                    <p><strong>Prevention Measures:</strong></p>
                    <ul>
                        {prevention.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
        </>
    );
};

export default WeatherForm;
