/* eslint-disable import/prefer-default-export */
import * as bitlyClient from '../config/bitlyClient';

export async function shortenUrl(longUrl) {
    const resp = await bitlyClient.post('v4/shorten', {
        long_url: longUrl,
    });
    return resp.link;
}
