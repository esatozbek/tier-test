import * as bitlyApi from '../bitlyApi';
import * as bitlyClient from '../../config/bitlyClient';

jest.mock('../../config/bitlyClient.js', () => ({
    post: jest.fn()
}))

describe("bitlyApi tests", () => {
    it("should shorten link", async () => {
        bitlyClient.post.mockImplementation(() => Promise.resolve({link: "shortened_link"}))
        const result = await bitlyApi.shortenUrl("text");
        expect(result).toBe("shortened_link")
    })
})