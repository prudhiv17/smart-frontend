import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ImageUpload from './components/image';
import WeatherWidget from './components/weather';
import CropPredictor from './components/crop';
import FertilizerCalculator from './components/fertilizer';
import Home from './components/home';
import LoginSignUp from './components/login';
import AboutUs from './components/about';
import WeatherForm from './components/future_weather';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LoginSignUp />} />
          <Route path="/image-upload" element={<ImageUpload />} /> 
          <Route path="/weather" element={<WeatherWidget />} /> 
          <Route path="/crop" element={<CropPredictor />} /> 
          <Route path="/fer" element={<FertilizerCalculator />} /> 
          <Route path="/home" element={<Home />} /> 
          <Route path="/login" element={<LoginSignUp />} /> 
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/predict" element={<WeatherForm />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
