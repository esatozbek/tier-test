/* eslint-disable import/prefer-default-export */
/* eslint-disable no-return-await */
export async function post(url, params) {
    const resp = await fetch(`https://api-ssl.bitly.com/${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_BITLY_AUTHORIZATION_TOKEN}`,
        },
        body: JSON.stringify(params),
    });
    if (!resp.ok) {
        throw new Error('request failed');
    }
    return await resp.json();
}
