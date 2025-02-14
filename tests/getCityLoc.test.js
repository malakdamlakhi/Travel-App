const axios = require("axios");
const { getCityLoc } = require("../src/server/getCityLoc"); // تأكد من المسار الصحيح لـ getCityLoc

jest.mock("axios");

describe("getCityLoc", () => {
    it("يجب أن تُرجع بيانات المدينة عند تقديم اسم مدينة لندن", async () => {
        const city = "London";
        const MalakDamlakhi = "yourGeoNamesUsername";  // قم بتحديثه إلى اسم المستخدم الصحيح
        const mockData = {
            geonames: [
                {
                    name: "London",
                    lat: 51.5074,
                    lng: -0.1278
                }
            ]
        };

        // محاكاة استجابة API ناجحة للمدينة لندن
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getCityLoc(city, MalakDamlakhi);

        expect(result).toHaveProperty("name", "London");
        expect(result).toHaveProperty("lat", 51.5074);
        expect(result).toHaveProperty("lng", -0.1278);
    });

    it("يجب أن تُرجع رسالة خطأ إذا كانت المدينة غير موجودة في API", async () => {
        const city = "UnknownCity";
        const MalakDamlakhi = "yourGeoNamesUsername";  // قم بتحديثه إلى اسم المستخدم الصحيح
        const mockData = {
            geonames: []
        };

        // محاكاة استجابة API بدون نتائج
        axios.get.mockResolvedValue({ data: mockData });

        const result = await getCityLoc(city, MalakDamlakhi);

        expect(result).toHaveProperty("message", "No city with that name. Please make sure of your spelling");
        expect(result).toHaveProperty("error", true);
    });

    it("يجب أن تُرجع رسالة خطأ إذا لم يتم تمرير اسم المستخدم", async () => {
        const city = "London";
        const MalakDamlakhi = ""; // اسم المستخدم مفقود

        await expect(getCityLoc(city, MalakDamlakhi)).rejects.toThrow("GeoNames username is required");
    });

    it("يجب أن تُرجع رسالة خطأ في حال حدوث خطأ في الاتصال بـ API", async () => {
        const city = "London";
        const MalakDamlakhi = "yourGeoNamesUsername";  // قم بتحديثه إلى اسم المستخدم الصحيح

        // محاكاة خطأ في الاتصال بـ API
        axios.get.mockRejectedValue(new Error("Network Error"));

        const result = await getCityLoc(city, MalakDamlakhi);

        expect(result).toHaveProperty("message", "An error occurred while fetching city data.");
        expect(result).toHaveProperty("error", true);
    });
});


