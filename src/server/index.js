const express = require("express");
const cors = require("cors");
require("dotenv").config(); // تحميل متغيرات البيئة

const app = express();
const PORT = process.env.PORT || 8000;

// إعدادات السيرفر
app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

// استيراد الوظائف المساعدة
const { getCityLoc } = require("./getCityLoc");
const { weatherTemp } = require("./weatherTemp");
const { getCityPic } = require("./getCityPic");

// تحميل مفاتيح API من .env أو تعيين قيم افتراضية
const GEO_USERNAME =  "MalakDamlakhi";
const WEATHER_API_KEY = process.env.WEATHER_KEY || "fda4314c2e6f47e698dd4f32bf41f7a8";
const PIXABAY_API_KEY = process.env.PIXABAY_KEY || "48705890-256175c2d30e01e89e3bfc758";

// التحقق من تحميل القيم
console.log("✅ GeoNames Username:", GEO_USERNAME);
console.log("✅ Weather API Key:", WEATHER_API_KEY);
console.log("✅ Pixabay API Key:", PIXABAY_API_KEY);

// المسار الرئيسي
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: "dist" });
});

// مسار لجلب معلومات المدينة
app.post("/getCity", async (req, res) => {
    const { city } = req.body;
    if (!city) return res.status(400).json({ error: "City name is required." });

    try {
        const location = await getCityLoc(city, GEO_USERNAME);
        res.json(location);
    } catch (error) {
        console.error("❌ Error fetching city location:", error);
        res.status(500).json({ error: "Failed to retrieve city data." });
    }
});

// مسار لجلب الطقس
app.post("/getWeather", async (req, res) => {
    const { lng, lat, remainingDays } = req.body;
    if (!lng || !lat) return res.status(400).json({ error: "Coordinates are required." });

    try {
        const weather = await weatherTemp(lng, lat, remainingDays, WEATHER_API_KEY);
        res.json(weather);
    } catch (error) {
        console.error("❌ Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to retrieve weather data." });
    }
});

// مسار لجلب صورة المدينة
app.post("/getCityPic", async (req, res) => {
    const { city_name } = req.body;
    if (!city_name) return res.status(400).json({ error: "City name is required." });

    try {
        const picture = await getCityPic(city_name, PIXABAY_API_KEY);
        res.json(picture);
    } catch (error) {
        console.error("❌ Error fetching city picture:", error);
        res.status(500).json({ error: "Failed to retrieve city picture." });
    }
});

// معالج الأخطاء العامة
app.use((err, req, res, next) => {
    console.error("🔥 Unexpected error:", err);
    res.status(500).json({ error: "Internal server error." });
});

// تشغيل السيرفر
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
