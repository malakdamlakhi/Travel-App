const axios = require('axios');
const { cityImage } = require('../src/server/cityImage');

// محاكاة axios.get
jest.mock('axios');

describe('cityImage', () => {
    it('should return the correct city image URL', async () => {
        axios.get.mockResolvedValue({
            data: { hits: [{ webformatURL: 'https://example.com/city-image.jpg' }] }
        });

        const result = await cityImage('Paris', 'fake-api-key');

        expect(result).toEqual({ image: 'https://example.com/city-image.jpg' });
    });

    it('should return a default image URL if no images are found', async () => {
        axios.get.mockResolvedValue({ data: { hits: [] } });

        const result = await cityImage('UnknownCity', 'fake-api-key');

        expect(result).toEqual({
            image: 'https://source.unsplash.com/random/640x480?city,morning,night&sig=1'
        });
    });

    it('should return a default image URL if an API error occurs', async () => {
        axios.get.mockRejectedValue(new Error('Network Error'));

        const result = await cityImage('Paris', 'fake-api-key');

        expect(result).toEqual({
            image: 'https://source.unsplash.com/random/640x480?city,morning,night&sig=1'
        });
    });
});


