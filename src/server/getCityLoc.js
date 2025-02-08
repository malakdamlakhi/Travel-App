const axios = require("axios");

const getCityLoc = async (city, MalakDamlakhi) => {
    if (!MalakDamlakhi) {
        throw new Error("GeoNames username is required");
    }

    try {
        console.log(`Requesting city: ${city} using username: ${MalakDamlakhi}`);
        
        const { data } = await axios.get(`https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${MalakDamlakhi}`);
        
        console.log('API Response:', data);  // عرض استجابة API

        if (!data.geonames || data.geonames.length === 0) {
            return {
                message: "No city with that name. Please make sure of your spelling",
                error: true
            };
        }

        return data.geonames[0];  // Return the first result
    } catch (error) {
        console.error("Error fetching city location:", error.message);
        if (error.response) {
            console.error("API Response Error:", error.response.data);
        }
        return {
            message: "An error occurred while fetching city data.",
            error: true
        };
    }
};

module.exports = { getCityLoc };

