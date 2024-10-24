import React, { useState } from 'react';
import Header from './header.js'; 
import './fertilizer.css';

const FertilizerCalculator = () => {
    const [nitrogen, setNitrogen] = useState(0);
    const [phosphorus, setPhosphorus] = useState(0);
    const [potassium, setPotassium] = useState(0);
    const [crop, setCrop] = useState('wheat'); 
    const [area, setArea] = useState(0);
    const [areaUnit, setAreaUnit] = useState('hectare'); 
    const [bagWeight, setBagWeight] = useState(50); 
    const [recommendations, setRecommendations] = useState(null);
    const [requirements, setRequirements] = useState(null);
    const [missingNutrients, setMissingNutrients] = useState(null);

    const calculateFertilizer = () => {
        const cropRequirements = {
            wheat: { N: 120, P: 60, K: 40 },
            corn: { N: 150, P: 70, K: 50 },
            rice: { N: 100, P: 50, K: 30 }
        };

        const cropData = cropRequirements[crop.toLowerCase()];
        if (!cropData) return;

        // Convert area to hectares if necessary
        const areaInHectares = areaUnit === 'acre' ? area * 0.404686 : area;

        const nitrogenNeededPerHa = cropData.N;
        const phosphorusNeededPerHa = cropData.P;
        const potassiumNeededPerHa = cropData.K;

        const nitrogenNeeded = Math.max(0, nitrogenNeededPerHa * areaInHectares - nitrogen);
        const phosphorusNeeded = Math.max(0, phosphorusNeededPerHa * areaInHectares - phosphorus);
        const potassiumNeeded = Math.max(0, potassiumNeededPerHa * areaInHectares - potassium);

       
        const fertilizerNContent = 0.46; // Urea
        const fertilizerPContent = 0.18; // DAP
        const fertilizerKContent = 0.60; // MOP

        const nitrogenBags = (nitrogenNeeded / (bagWeight * fertilizerNContent)).toFixed(2);
        const phosphorusBags = (phosphorusNeeded / (bagWeight * fertilizerPContent)).toFixed(2);
        const potassiumBags = (potassiumNeeded / (bagWeight * fertilizerKContent)).toFixed(2);

        setRecommendations({
            nitrogenNeeded: areaUnit === 'acre' ? nitrogenNeeded / 0.404686 : nitrogenNeeded,
            phosphorusNeeded: areaUnit === 'acre' ? phosphorusNeeded / 0.404686 : phosphorusNeeded,
            potassiumNeeded: areaUnit === 'acre' ? potassiumNeeded / 0.404686 : potassiumNeeded,
            nitrogenBags,
            phosphorusBags,
            potassiumBags,
            areaUnit
        });

        setRequirements({
            nitrogen: cropData.N * areaInHectares,
            phosphorus: cropData.P * areaInHectares,
            potassium: cropData.K * areaInHectares
        });

        setMissingNutrients({
            nitrogenMissing: Math.max(0, cropData.N * areaInHectares - nitrogen),
            phosphorusMissing: Math.max(0, cropData.P * areaInHectares - phosphorus),
            potassiumMissing: Math.max(0, cropData.K * areaInHectares - potassium)
        });
    };

    return (
        <div className="fertilizer-calculator-page">
            <Header />
            <div className="content">
                <div className="select-crop">
                    <h2>Select Crop</h2>
                </div>
                <div className="crop-images">
                    <div className="crop-item" onClick={() => setCrop('wheat')}>
                        <img src="/images/whe.png" alt="Wheat" className="crop-image" />
                        <p>Wheat</p>
                    </div>
                    <div className="crop-item" onClick={() => setCrop('corn')}>
                        <img src="/images/corn.png" alt="Corn" className="crop-image" />
                        <p>Corn</p>
                    </div>
                    <div className="crop-item" onClick={() => setCrop('rice')}>
                        <img src="/images/rice.png" alt="Rice" className="crop-image" />
                        <p>Rice</p>
                    </div>
                </div>
                <div className="button-group">
                    <button className="default-button">Default</button>
                    <button className="list-button">List-view</button>
                </div>
            </div>
            <hr className="divider" />
            <div className="fertilizer-inputs">
                <div className="input-group">
                    <label>
                        Soil Nitrogen Level:
                        <input type="number" value={nitrogen} onChange={e => setNitrogen(parseFloat(e.target.value))} />
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Soil Phosphorus Level:
                        <input type="number" value={phosphorus} onChange={e => setPhosphorus(parseFloat(e.target.value))} />
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Soil Potassium Level:
                        <input type="number" value={potassium} onChange={e => setPotassium(parseFloat(e.target.value))} />
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Crop Type:
                        <select value={crop} onChange={e => setCrop(e.target.value)}>
                            <option value="wheat">Wheat</option>
                            <option value="corn">Corn</option>
                            <option value="rice">Rice</option>
                        </select>
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Area of Land:
                        <input type="number" value={area} onChange={e => setArea(parseFloat(e.target.value))} />
                    </label>
                    <label>
                        Unit:
                        <select value={areaUnit} onChange={e => setAreaUnit(e.target.value)}>
                            <option value="hectare">Hectare</option>
                            <option value="acre">Acre</option>
                        </select>
                    </label>
                </div>
                <div className="input-group">
                    <label>
                        Bag Weight (kg):
                        <input type="number" value={bagWeight} onChange={e => setBagWeight(parseFloat(e.target.value))} />
                    </label>
                </div>
                <button type="button" className="calculate-button" onClick={calculateFertilizer}>Calculate</button>
            </div>
            {recommendations && (
                <div className="fertilizer-recommendations">
                    <h3>Fertilizer Recommendations</h3>
                    <div className="card-container">
                        <div className="card">
                            <h4>Urea (46% N)</h4>
                            <p>Bags Needed: {recommendations.nitrogenBags}</p>
                        </div>
                        <div className="card">
                            <h4>DAP (18% P)</h4>
                            <p>Bags Needed: {recommendations.phosphorusBags}</p>
                        </div>
                        <div className="card">
                            <h4>MOP (60% K)</h4>
                            <p>Bags Needed: {recommendations.potassiumBags}</p>
                        </div>
                    </div>
                </div>
            )}
            {requirements && (
                <div className="required-nutrients">
                    <h3>Required Nutrient Amounts</h3>
                    <div className="card-container">
                        <div className="card">
                            <h4>Nitrogen</h4>
                            <p>{requirements.nitrogen} kg</p>
                        </div>
                        <div className="card">
                            <h4>Phosphorus</h4>
                            <p>{requirements.phosphorus} kg</p>
                        </div>
                        <div className="card">
                            <h4>Potassium</h4>
                            <p>{requirements.potassium} kg</p>
                        </div>
                    </div>
                </div>
            )}
            {missingNutrients && (
                <div className="missing-nutrients">
                    <h3>Missing Nutrients</h3>
                    <div className="card-container">
                        <div className="card">
                            <h4>Nitrogen</h4>
                            <p>Missing: {missingNutrients.nitrogenMissing} kg</p>
                        </div>
                        <div className="card">
                            <h4>Phosphorus</h4>
                            <p>Missing: {missingNutrients.phosphorusMissing} kg</p>
                        </div>
                        <div className="card">
                            <h4>Potassium</h4>
                            <p>Missing: {missingNutrients.potassiumMissing} kg</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FertilizerCalculator;
