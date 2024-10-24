import React, { useState } from "react";
import "./crop.css"; 
import Header from "./header";

function CropPredictor() {
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    pH_Value: "",
    Rainfall: "",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://farm-backend-ytut.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ features: Object.values(formData).map(Number) }),
    });

    const data = await response.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="newhead">
      <Header/ >
    
    <div className="crop">
      

      <div className="form-container">
        <div className="CropPredictor">
          <h1>Crop Recommendation</h1>
          <form onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div key={key} className="inputGroup">
                <label>{key}:</label>
                <input
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}
            <button type="submit">Recommend Crop</button>
          </form>
          {prediction && (
            <div className="prediction-container">
              <h2>Recommended Crop: {prediction}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default CropPredictor;
