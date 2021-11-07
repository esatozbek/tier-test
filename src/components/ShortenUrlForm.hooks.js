import { useCallback, useState } from 'react';
import * as bitlyApi from '../api/bitlyApi';
import validateURL from '../utils/validateURL';

export default function useShortenUrl() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [response, setResponse] = useState('');

    const shortenUrl = useCallback(
        async (longUrl) => {
            if (!longUrl || longUrl === "") {
                return null;
            }
            setErrorMessage("");
            setResponse("");

            if (!validateURL(longUrl)) {
                setErrorMessage('Please enter a valid URL');
                return null;
            }

            setLoading(true);
            let link;
            try {
                link = await bitlyApi.shortenUrl(longUrl);
                setResponse(link);
            } catch (e) {
                setErrorMessage(e.message);
            }

            setLoading(false);

            return link;
        },
        [setErrorMessage, setResponse],
    );

    return { loading, errorMessage, response, shortenUrl };
}
