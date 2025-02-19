const axios = require('axios');
const { locationDetails } = require('../src/server/locationDetails');

// محاكاة axios.get
jest.mock('axios');

describe('locationDetails', () => {
    it('should return city data when a valid city is provided', async () => {
        // محاكاة axios.get
        axios.get.mockResolvedValue({
            data: {
                geonames: [{
                    name: 'New York',
                    lat: '40.7128',
                    lon: '-74.0060',
                    countryName: 'United States'
                }]
            }
        });

        const result = await locationDetails('New York', 'MalakDamlakhi');

        expect(result.name).toBe('New York');
        expect(result.lat).toBe('40.7128');
        expect(result.lon).toBe('-74.0060');
        expect(result.countryName).toBe('United States');
    });

    it('should return an error message if no city is found', async () => {
        // محاكاة axios.get
        axios.get.mockResolvedValue({
            data: { geonames: [] }
        });

        const result = await locationDetails('Invalid City', 'MalakDamlakhi');

        expect(result.message).toBe('City not found. Please verify the name and try again.');
        expect(result.error).toBe(true);
    });

    it('should throw an error if GeoNames username is not provided', async () => {
        await expect(locationDetails('New York')).rejects.toThrow('GeoNames API username is required.');
    });

    it('should return an error message if the API call fails', async () => {
        // محاكاة حدوث خطأ في API
        axios.get.mockRejectedValue(new Error('Network Error'));

        const result = await locationDetails('New York', 'MalakDamlakhi');

        expect(result.message).toBe('An error occurred while retrieving city information.');
        expect(result.error).toBe(true);
    });
});


