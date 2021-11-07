import * as bitlyClient from '../bitlyClient';

global.fetch = jest.fn();

describe('bitlyClient tests', () => {
    it('should send post request to given url', async () => {
        global.fetch.mockImplementation(() =>
            Promise.resolve({ ok: true, json: () => {} }),
        );
        await bitlyClient.post('v4/shorten', {
            long_url: 'https://dev.bitly.com',
        });
        expect(global.fetch.mock.calls.length).toBe(1);
        expect(global.fetch.mock.calls[0][0]).toBe(
            'https://api-ssl.bitly.com/v4/shorten',
        );
        expect(global.fetch.mock.calls[0][1].body).toBe(
            JSON.stringify({
                long_url: 'https://dev.bitly.com',
            }),
        );
    });

    it('should return error when response is not 200', async () => {
        global.fetch.mockImplementation(() => Promise.resolve({ ok: false }));
        await expect(
            bitlyClient.post('v4/shorten', {
                long_url: 'https://dev.bitly.com',
            }),
        ).rejects.toThrow(Error);
    });
});
