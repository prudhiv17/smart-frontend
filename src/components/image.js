import React, { useState } from 'react';
import axios from 'axios';
import Header from './header';
import {
    Container,
    Box,
    Button,
    CircularProgress,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Paper,
    Divider,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Alert
} from '@mui/material';
import { styled } from '@mui/system';
import './ImageUpload.css';

const Input = styled('input')({
    display: 'none',
});

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [prediction, setPrediction] = useState('');
    const [confidence, setConfidence] = useState('');
    const [causes, setCauses] = useState([]);
    const [treatments, setTreatments] = useState([]);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [modelType, setModelType] = useState('potato');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setImagePreview(URL.createObjectURL(file));
            setError('');
        } else {
            setError('Please select a valid image file.');
        }
    };

    const handleModelChange = (event) => {
        setModelType(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedFile) {
            setError('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        setLoading(true);
        setError('');

        try {
            const response = await axios.post(`http://localhost:8000/predict?model_type=${modelType}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPrediction(response.data.class);
            setConfidence(response.data.confidence);
            setCauses(response.data.causes);
            setTreatments(response.data.treatments);
        } catch (error) {
            setError('Error uploading file. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <Header />
        <Container maxWidth="md" className="container">
            <Paper elevation={3} className="paper">
                <Typography variant="h4" component="h1" gutterBottom>
                    Image Upload and Prediction
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="model-select-label">Select Model</InputLabel>
                        <Select
                            labelId="model-select-label"
                            value={modelType}
                            onChange={handleModelChange}
                            fullWidth
                        >
                            <MenuItem value="potato">Potato</MenuItem>
                            <MenuItem value="corn">Corn</MenuItem>
                            <MenuItem value="apple">Apple</MenuItem>
                        </Select>
                    </FormControl>
                    <label htmlFor="file-upload">
                        <Input
                            accept="image/*"
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                        />
                        <Button
                            variant="contained"
                            component="span"
                        >
                            Select File
                        </Button>
                    </label>
                    {imagePreview && (
                        <Card>
                            <CardMedia
                                component="img"
                                image={imagePreview}
                                alt="Uploaded Preview"
                            />
                            <CardContent>
                                <Typography variant="body2">{selectedFile.name}</Typography>
                            </CardContent>
                        </Card>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={!selectedFile || loading}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Upload and Predict'}
                    </Button>
                    {error && (
                        <Alert severity="error">
                            {error}
                        </Alert>
                    )}
                </Box>
                {prediction && (
                    <Box>
                        <Divider />
                        <Typography variant="h6">Prediction: {prediction}</Typography>
                        <Typography variant="body1">Confidence: {confidence}</Typography>
                        <Typography variant="h6">Causes:</Typography>
                        <ul>
                            {causes.map((cause, index) => (
                                <li key={index}>{cause}</li>
                            ))}
                        </ul>
                        <Typography variant="h6">Treatments:</Typography>
                        <ul>
                            {treatments.map((treatment, index) => (
                                <li key={index}>{treatment}</li>
                            ))}
                        </ul>
                    </Box>
                )}
            </Paper>
        </Container>
        </>
    );
};

export default ImageUpload;
