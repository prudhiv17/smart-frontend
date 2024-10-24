import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './header';
import './home.css';

import diseaseImage from '../assets/disease.jpg'; 
import cropImage from '../assets/crop.jpg'; 
import fertilizerImage from '../assets/fertilizer.jpg'; 
import expertFarmersImage from '../assets/expertfarmer.jpg'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='head'>
      <Header/>
      <div className="home-container">
        <div className="content-section">
          <h1 className="title">Welcome to Precision Agriculture</h1>
          <p className="subtitle">Revolutionizing farming with technology for higher yields and sustainability.</p>
        </div>

        <div className="module-wrapper">
          <div className="module-box" onClick={() => navigate('/image-upload')}>
            <img src={diseaseImage} alt="Disease Detection" className="module-image" />
            <div className="module-description">
              <h3 className="module-title">Disease Detection</h3>
              <p className="module-text">Detect crop diseases early using advanced AI to ensure healthy growth and prevent losses.</p>
            </div>
          </div>

          <div className="module-box" onClick={() => navigate('/crop')}>
            <img src={cropImage} alt="Crop Recommendation" className="module-image" />
            <div className="module-description">
              <h3 className="module-title">Crop Recommendation</h3>
              <p className="module-text">Personalized recommendation based on soil health & climate conditions.</p>
            </div>
          </div>

          <div className="module-box" onClick={() => navigate('/fer')}>
            <img src={fertilizerImage} alt="Fertilizer Calculator" className="module-image" />
            <div className="module-description">
              <h3 className="module-title">Fertilizer Calculator</h3>
              <p className="module-text">Calculate optimal fertilizer requirements for your crops to enhance yield & minimize costs.</p>
            </div>
          </div>

          <div className="module-box" onClick={() => navigate('/predict')}>
            <img src={expertFarmersImage} alt="Expert Farmers" className="module-image" />
            <div className="module-description">
              <h3 className="module-title">Disease Prevention</h3>
              <p className="module-text">Safeguard crops based on environmental factors</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
