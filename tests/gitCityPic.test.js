const axios = require("axios");
const { getCityPic } = require("../src/server/getCityPic"); // تأكد من المسار الصحيح لـ getCityPic

jest.mock("axios");

describe("getCityPic", () => {
    it("يجب أن تُرجع صورة للمدينة بناءً على اسمها", async () => {
        const city = "London";
        const API_KEY = "48705890-256175c2d30e01e89e3bfc758";
        
        // محاكاة استجابة API
        axios.get.mockResolvedValue({
            data: {
                hits: [{ webformatURL: "https://pixabay.com/get/sample.jpg" }]
            }
        });

        // استدعاء الدالة واختبار النتيجة
        const result = await getCityPic(city, API_KEY);

        expect(result).toHaveProperty("image");
        expect(result.image).toBe("https://pixabay.com/get/sample.jpg");
    });

    it("يجب أن تُرجع صورة عشوائية إذا لم توجد نتائج", async () => {
        const city = "London";
        const API_KEY = "48705890-256175c2d30e01e89e3bfc758";
        
        // محاكاة استجابة بدون صور
        axios.get.mockResolvedValue({
            data: {
                hits: []
            }
        });

        // استدعاء الدالة واختبار النتيجة
        const result = await getCityPic(city, API_KEY);

        expect(result).toHaveProperty("image");
        expect(result.image).toBe("https://source.unsplash.com/random/640x480?city,morning,night?sig=1");
    });
});

