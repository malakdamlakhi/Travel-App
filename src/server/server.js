const express = require("express");
const cors = require("cors");
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 8001;

// إعدادات السيرفر
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

// استيراد الوظائف المساعدة
const { locationDetails } = require("./locationDetails");
const { cityWeather } = require("./cityWeather");
const { cityImage } = require("./cityImage");

// تحميل مفاتيح API من .env أو تعيين قيم افتراضية
const GEO_USERNAME = "MalakDamlakhi";
const WEATHER_API_KEY = process.env.WEATHER_KEY || "fda4314c2e6f47e698dd4f32bf41f7a8";
const PIXABAY_API_KEY = process.env.PIXABAY_KEY || "48705890-256175c2d30e01e89e3bfc758";

// التحقق من تحميل القيم
console.log("✅ GeoNames Username:", GEO_USERNAME);
console.log("✅ Weather API Key:", WEATHER_API_KEY);
console.log("✅ Pixabay API Key:", PIXABAY_API_KEY);

// تسجيل جميع الطلبات الواردة
app.use((req, res, next) => {
    console.log(`📩 Request: ${req.method} ${req.url}`);
    console.log("📋 Request Body:", req.body);
    next();
});

// المسار الرئيسي
app.get("/", (req, res) => {
    console.log("🏠 Serving index.html from dist/");
    res.sendFile("index.html", { root: "dist" }, (err) => {
        if (err) {
            console.error("❌ Error serving index.html:", err);
            res.status(500).send("Error loading the page.");
        }
    });
});

// مسار لجلب معلومات المدينة
app.post("/locationDetails", async (req, res) => {
    const { city } = req.body;
    console.log(`🏙️ Requested City: ${city}`);

    if (!city) {
        console.warn("⚠️ City name is missing!");
        return res.status(400).json({ error: "City name is required." });
    }

    try {
        const location = await locationDetails(city, GEO_USERNAME);
        console.log("✅ City Location Data:", location);
        res.json(location);
    } catch (error) {
        console.error("❌ Error fetching city location:", error);
        res.status(500).json({ error: "Failed to retrieve city data." });
    }
});

// مسار لجلب الطقس
app.post("/cityWeather", async (req, res) => {
    const { lng, lat, remainingDays } = req.body;
    console.log(`🌦️ Weather Request: lng=${lng}, lat=${lat}, days=${remainingDays}`);

    if (!lng || !lat) {
        console.warn("⚠️ Missing coordinates!");
        return res.status(400).json({ error: "Coordinates are required." });
    }

    try {
        const weather = await cityWeather(lng, lat, remainingDays, WEATHER_API_KEY);
        console.log("✅ Weather Data:", weather);
        res.json(weather);
    } catch (error) {
        console.error("❌ Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to retrieve weather data." });
    }
});

// مسار لجلب صورة المدينة
app.post("/cityImage", async (req, res) => {
    const { city_name } = req.body;
    console.log(`🖼️ Requested City Picture: ${city_name}`);

    if (!city_name) {
        console.warn("⚠️ City name is missing for picture request!");
        return res.status(400).json({ error: "City name is required." });
    }

    try {
        const picture = await cityImage(city_name, PIXABAY_API_KEY);
        console.log("✅ City Picture Data:", picture);
        res.json(picture);
    } catch (error) {
        console.error("❌ Error fetching city picture:", error);
        res.status(500).json({ error: "Failed to retrieve city picture." });
    }
});

app.get("/service-worker.js", (req, res) => {
    res.sendFile("service-worker.js", { root: "dist" });
});

// معالج الخطأ العام
app.use((err, req, res, next) => {
    console.error("🔥 Unexpected error:", err);
    res.status(500).json({ error: "Internal server error." });
});

// مسار للطلبات غير الموجودة (404)
app.use((req, res) => {
    console.warn(`🚨 404 Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ error: "Not Found" });
});

// تشغيل السيرفر
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
