import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
    const [weather, setWeather] = useState({ location: '', temperature: '' });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const apiKey = 'bfed256241434104e6f4c30fba35fb32';
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWeather = async (lat, lon) => {
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                
                const response = await fetch(url);
                const data = await response.json();
                
                setWeather({
                    location: data.name,
                    temperature: data.main.temp
                });
                setLoading(false);
            } catch (error) {
                setError('Error fetching weather data.');
                setLoading(false);
            }
        };

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeather(latitude, longitude);
                    },
                    (error) => {
                        setError('Error getting location.');
                        setLoading(false);
                    }
                );
            } else {
                setError('Geolocation is not supported by this browser.');
                setLoading(false);
            }
        };

        getLocation();
    }, [apiKey]);

    const handleLogout = () => {
        console.log('Logout button clicked');
    };

    const handleAboutUsClick = () => {
        navigate('/about');
    };

    const handleHomeClick = () => {
        navigate('/home'); // Redirect to the home page
    };

    return (
        <header className="header">
            <div className="header-left">
                <img 
                    src="/images/logo.jpg" 
                    alt="Logo" 
                    className="logo" 
                />
                <h1 className="home-title" onClick={handleHomeClick}>Home</h1> {/* Home text added */}
            </div>
            <div className="header-right">
                <button onClick={handleHomeClick} className="home-button">Home</button> {/* Home button added here */}
                <button onClick={handleAboutUsClick}>Who Are We</button>
                <button>My Profile</button>
                {loading && <span>Loading weather...</span>}
                {error && <span className="error-message">{error}</span>}
                {!loading && !error && (
                    <div className="weather-info">
                        <span className="location">{weather.location}</span>
                        <span className="temperature">{weather.temperature}°C</span>
                    </div>
                )}
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </header>
    );
};

export default Header;
