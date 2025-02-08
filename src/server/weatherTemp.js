const axios = require("axios");

const weatherTemp = async (longitude, latitude, daysRemaining, apiKey) => {
    // التحقق من أن التاريخ ليس في الماضي
    if (daysRemaining < 0) {
        return {
            message: "Date cannot be in the past",
            error: true
        };
    }

    try {
        let weatherData;

        if (daysRemaining > 0 && daysRemaining <= 7) {
            // جلب الطقس الحالي
            const response = await axios.get(`https://api.weatherbit.io/v2.0/current`, {
                params: {
                    lat: latitude,
                    lon: longitude,
                    units: "M",
                    key: apiKey
                }
            });

            console.log("***************************************");
            const latestWeather = response.data.data.slice(-1)[0];
            weatherData = {
                description: latestWeather.weather.description,
                temperature: latestWeather.temp
            };
        } else {
            // جلب توقعات الطقس للأيام القادمة
            const response = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily`, {
                params: {
                    lat: latitude,
                    lon: longitude,
                    units: "M",
                    days: daysRemaining,
                    key: apiKey
                }
            });

            console.log("***************************************");
            const latestForecast = response.data.data.slice(-1)[0];
            weatherData = {
                description: latestForecast.weather.description,
                temperature: latestForecast.temp,
                maxTemperature: latestForecast.app_max_temp,
                minTemperature: latestForecast.app_min_temp
            };
        }

        console.log("Weather Data Retrieved:", weatherData);
        console.log("***************************************");
        return weatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        return {
            message: "Failed to retrieve weather information.",
            error: true
        };
    }
};

module.exports = { weatherTemp };

