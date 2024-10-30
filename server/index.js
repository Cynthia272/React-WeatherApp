const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); 

const app = express();
const PORT = 5000;

app.use(cors()); // Enable CORS for cross-origin requests

// Route to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    console.log(`Requesting weather data for city: ${city}`);
    console.log(`API URL: ${url}`); // Log the URL being used

    try {
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.response ? error.response.data : error.message); // Log the error
        res.status(500).json({ message: 'Error fetching weather data' });
    }

});
