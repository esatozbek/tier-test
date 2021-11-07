/* eslint no-unused-vars: 1 */

import React, { useCallback, useState } from 'react';
import useShortenUrl from './ShortenUrlForm.hooks';
import copyToClipboard from '../utils/copyToClipboard';

import '../css/ShortenUrlForm.css';

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const { loading, errorMessage, response, shortenUrl } = useShortenUrl();

    const onChange = useCallback(
        (e) => {
            setValue(e.target.value);
        },
        [setValue],
    );

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            const link = await shortenUrl(value);
            if (link) {
                try {
                    await copyToClipboard(link);
                } catch (error) {
                    // ignored
                }
            }
        },
        [value],
    );

    return (
        <form data-testid="url-form" onSubmit={onSubmit} className="formContainer">
            <label htmlFor="shorten">
                Url:
                <input
                    data-testid="url-input"
                    placeholder="Url to shorten"
                    id="shorten"
                    type="text"
                    value={value}
                    onChange={onChange}
                />
            </label>
            <input
                data-testid="send-form"
                type="submit"
                value="Shorten and copy URL"
                disabled={loading}
            />
            {response !== '' && (
                <div data-testid="response" className="info">{response} copied!</div>
            )}
            {loading && <div data-testid="loading" className="info">Loading...</div>}
            {errorMessage !== '' && (
                <div data-testid="error-message" className="info error">{errorMessage}</div>
            )}
        </form>
    );
};

export default ShortenUrlForm;
