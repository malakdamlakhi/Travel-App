const axios = require("axios");

const cityImage = async (cityName, apiKey) => {
    try {
        const response = await axios.get("https://pixabay.com/api/", {
            params: {
                key: apiKey,
                q: cityName,
                image_type: "photo"
            }
        });

        const imageUrl = response.data.hits.length > 0 
            ? response.data.hits[0].webformatURL 
            : "https://source.unsplash.com/random/640x480?city,morning,night&sig=1";

        return { image: imageUrl };
    } catch (error) {
        console.error("Error fetching city image:", error.message);
        return { image: "https://source.unsplash.com/random/640x480?city,morning,night&sig=1" };
    }
};

module.exports = { cityImage }; 
