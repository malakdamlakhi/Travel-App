const axios = require('axios');
const { cityWeather } = require('../src/server/cityWeather');

// محاكاة axios.get
jest.mock('axios');

describe('cityWeather', () => {
    it('should return weather data correctly', async () => {
        axios.get.mockResolvedValue({
            data: {
                data: [{
                    weather: { description: 'Sunny' },
                    temp: 30
                }]
            }
        });

        const result = await cityWeather(40.7128, -74.0060, 0, 'fake-api-key');

        expect(result.description).toBe('Sunny');
        expect(result.temp).toBe(30);
    });

    it('should handle API errors', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        const result = await cityWeather(40.7128, -74.0060, 0, 'fake-api-key');

        expect(result.message).toBe('Failed to retrieve weather data');
        expect(result.error).toBe(true);
    });
});
