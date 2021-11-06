import validateURL from '../validateURL';

describe('validateURL tests', () => {
    const VALID_URLS = [
        'http://www.example.com',
        'https://www.example.com',
        'https://www.example.com/',
        'http://subdomain.example.com',
        'http://subdomain.example.com/somepage',
        'https://www.example.com/somepage',
        'https://www.example.com/somepage?someParameter=value',
        'https://subdomain.example.com/somepage?someParameter=value',
        'https://example.com/',
    ];

    const INVALID_URLS = [
        'www.example.com',
        'example',
        'example.com',
        'smtp://example.com',
    ];

    it("should return true for valid URL's", () => {
        VALID_URLS.map((url) => validateURL(url)).forEach((result) =>
            expect(result).toBe(true),
        );
    });

    it("should return false for invalid URL's", () => {
        INVALID_URLS.map((url) => validateURL(url)).forEach((result) =>
            expect(result).toBe(false),
        );
    });
});
