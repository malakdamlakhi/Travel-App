import axios from "axios";

const form = document.querySelector("form");
const cityInput = document.querySelector("#city");
const flightDateInput = document.querySelector("#flightDate");

const cityError = document.querySelector("#city_error");
const dateError = document.querySelector("#date_error");

const handleSubmit = async (event) => {
  event.preventDefault();

  console.log("Form submitted ✅");

  if (!validateInputs()) {
    return;
  }

  const cityDetails = await fetchCityDetails();
  if (cityDetails && cityDetails.error) {
    displayError(cityError, cityDetails.message);
    return;
  } else if (cityDetails && !cityDetails.error) {
    const { lng, lat, name } = cityDetails;
    const selectedDate = flightDateInput.value;

    if (!selectedDate) {
      displayError(dateError, "Please provide a valid date 📅");
      return;
    }

    const remainingDays = calculateRemainingDays(selectedDate);
    const weatherData = await fetchWeatherData(lng, lat, remainingDays);

    if (weatherData && weatherData.error) {
      displayError(dateError, weatherData.message);
      return;
    }

    const cityImage = await fetchCityImage(name);
    updateUI(remainingDays, name, cityImage, weatherData);
  }
};

const validateInputs = () => {
  clearErrors();

  if (!cityInput.value.trim()) {
    displayError(cityError, "City name is required 🏙️");
    return false;
  }

  if (!flightDateInput.value.trim()) {
    displayError(dateError, "Flight date is required 📅");
    return false;
  }

  if (calculateRemainingDays(flightDateInput.value) < 0) {
    displayError(dateError, "The date cannot be in the past ⏳");
    return false;
  }

  return true;
};

const fetchCityDetails = async () => {
  if (cityInput.value.trim()) {
    try {
      const response = await axios.post("http://localhost:8001/locationDetails", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      displayError(cityError, "Failed to fetch city details 🚫");
      return { error: true };
    }
  } else {
    displayError(cityError, "City input cannot be empty 🚫");
    return { error: true };
  }
};

const fetchWeatherData = async (longitude, latitude, remainingDays) => {
  try {
    const response = await axios.post("http://localhost:8001/cityWeather", {
      lng: longitude,
      lat: latitude,
      remainingDays,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: "Failed to fetch weather data 🌩️" };
  }
};

const calculateRemainingDays = (date) => {
  const currentDate = new Date();
  const targetDate = new Date(date);
  const differenceInTime = targetDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};

const fetchCityImage = async (cityName) => {
  try {
    const response = await axios.post("http://localhost:8001/cityImage", {
      city_name: cityName,
    });
    return response.data.image;
  } catch (error) {
    return "default-image.jpg"; // Provide a default image in case of failure
  }
};

const updateUI = (daysLeft, cityName, cityImage, weather) => {
  document.querySelector("#Rdays").textContent = `Your trip starts in ${daysLeft} days! ✈️`;
  document.querySelector(".cityName").textContent = `Destination: ${cityName} 🌍`;
  document.querySelector(".weather").textContent =
    daysLeft > 7
      ? `Expected Weather: ${weather.description} 🌤️`
      : `Current Weather: ${weather.description} 🌧️`;
  document.querySelector(".temp").textContent =
    daysLeft > 7
      ? `Forecast Temperature: ${weather.temp}°C 🌡️`
      : `Temperature: ${weather.temp}°C 🥶`;
  document.querySelector(".max-temp").textContent =
    daysLeft > 7 ? `Max Temp: ${weather.app_max_temp}°C 🔥` : "";
  document.querySelector(".min-temp").textContent =
    daysLeft > 7 ? `Min Temp: ${weather.app_min_temp}°C 🥶` : "";
  document.querySelector(".cityPic").innerHTML = `
    <img 
      src="${cityImage}" 
      alt="View of ${cityName} 📸"
    >
  `;
  document.querySelector(".flight_data").style.display = "block";
};

const clearErrors = () => {
  cityError.style.display = "none";
  dateError.style.display = "none";
};

const displayError = (errorElement, message) => {
  errorElement.innerHTML = `<i class="bi bi-exclamation-circle-fill me-2"></i>${message}`;
  errorElement.style.display = "block";
};

export { handleSubmit };
