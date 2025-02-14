const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const { weatherTemp } = require("../src/server/weatherTemp"); // تأكد من أن المسار صحيح

// إعداد محاكي axios
const mock = new MockAdapter(axios);

describe("Testing weatherTemp function", () => {
  
    afterEach(() => {
        mock.reset(); // إعادة تعيين المحاكي بعد كل اختبار
    });

    test("should return weather data for current weather when Rdays <= 7", async () => {
        const lo = -122.43;
        const la = 37.77;
        const Rdays = 3;
        const key = "mock-api-key";

        const mockResponse = {
            data: [
                {
                    weather: { description: "clear sky" },
                    temp: 22
                }
            ]
        };

        // محاكاة استجابة من API
        mock.onGet(`https://api.weatherbit.io/v2.0/current?lat=${la}&lon=${lo}&units=M&key=${key}`).reply(200, mockResponse);

        const result = await weatherTemp(lo, la, Rdays, key);
        
        // تحقق من أن النتيجة تحتوي على البيانات المتوقعة
        expect(result.description).toBe("clear sky");
        expect(result.temp).toBe(22);
    });

    test("should return error if Rdays is less than 0", async () => {
        const lo = -122.43;
        const la = 37.77;
        const Rdays = -1;
        const key = "mock-api-key";

        const result = await weatherTemp(lo, la, Rdays, key);

        // تحقق من أن النتيجة تحتوي على رسالة الخطأ المتوقعة
        expect(result.message).toBe("❌ Date cannot be in the past");
        expect(result.error).toBe(true);
    });

    test("should return weather forecast for future days when Rdays > 7", async () => {
        const lo = -122.43;
        const la = 37.77;
        const Rdays = 10;
        const key = "mock-api-key";

        const mockResponse = {
            data: [
                {
                    weather: { description: "scattered clouds" },
                    temp: 18,
                    app_max_temp: 20,
                    app_min_temp: 15
                }
            ]
        };

        // محاكاة استجابة من API
        mock.onGet(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${la}&lon=${lo}&units=M&days=${Rdays}&key=${key}`).reply(200, mockResponse);

        const result = await weatherTemp(lo, la, Rdays, key);
        
        // تحقق من أن النتيجة تحتوي على البيانات المتوقعة
        expect(result.description).toBe("scattered clouds");
        expect(result.temp).toBe(18);
        expect(result.app_max_temp).toBe(20);
        expect(result.app_min_temp).toBe(15);
    });
});

