const axios = require("axios");

const cityWeather = async (longitude, latitude, daysAhead, apiKey) => {
    if (daysAhead < 0) {
        return { message: "❌ Date cannot be in the past", error: true };
    }

    try {
        let weatherInfo;
        if (daysAhead > 0 && daysAhead <= 7) {
            const response = await axios.get("https://api.weatherbit.io/v2.0/current", {
                params: {
                    lat: latitude,
                    lon: longitude,
                    units: "M",
                    key: apiKey
                }
            });
            
            console.log("🌤️ Current Weather Data:", response.data);
            const { description } = response.data.data[0].weather;
            const { temp } = response.data.data[0];
            weatherInfo = { description, temp };
        } else {
            const response = await axios.get("https://api.weatherbit.io/v2.0/forecast/daily", {
                params: {
                    lat: latitude,
                    lon: longitude,
                    units: "M",
                    days: daysAhead,
                    key: apiKey
                }
            });
            
            console.log("📅 Forecast Weather Data:", response.data);
            const latestData = response.data.data.pop();
            const { description } = latestData.weather;
            const { temp, app_max_temp, app_min_temp } = latestData;
            weatherInfo = { description, temp, app_max_temp, app_min_temp };
        }
        
        return weatherInfo;
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return { message: "Failed to retrieve weather data", error: true };
    }
};

module.exports = { cityWeather };
