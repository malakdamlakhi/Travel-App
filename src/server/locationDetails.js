const axios = require("axios");

const locationDetails = async (city, MalakDamlakhi) => {
    if (!MalakDamlakhi) {
        throw new Error("GeoNames API username is required.");
    }

    try {
        console.log(`Searching for city: ${city} using username: ${MalakDamlakhi}`);
        
        const url = `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(city)}&maxRows=1&username=${MalakDamlakhi}`;
        const response = await axios.get(url);
        const data = response.data;
        
        console.log("GeoNames API Response:", data);

        if (!data.geonames || data.geonames.length === 0) {
            return {
                message: "City not found. Please verify the name and try again.",
                error: true
            };
        }

        return data.geonames[0];
    } catch (error) {
        console.error("Failed to retrieve city data:", error.message);
        return {
            message: "An error occurred while retrieving city information.",
            error: true
        };
    }
};

module.exports = { locationDetails };  
