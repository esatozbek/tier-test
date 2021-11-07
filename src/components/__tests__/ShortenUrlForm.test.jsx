/* eslint-disable react/react-in-jsx-scope */
import { render, fireEvent, waitFor } from '@testing-library/react';
import ShortenUrlForm from '../ShortenUrlForm';

describe('ShortenUrlForm tests', () => {
    it('should render ShortenUrlForm correctly', () => {
        const { getByTestId } = render(<ShortenUrlForm />);
        expect(getByTestId('url-form')).toBeDefined();
    });

    it('should send form when submit button is clicked', async () => {
        const { getByTestId, queryByTestId } = render(<ShortenUrlForm />);
        const sendButton = getByTestId('send-form');
        const urlInput = getByTestId('url-input');
        expect(sendButton).toBeDefined();
        expect(urlInput).toBeDefined();
        fireEvent.change(urlInput, {target: {value: "http://example.com"}})
        fireEvent.click(sendButton);
        await waitFor(() => getByTestId('loading'));
        await waitFor(() => getByTestId('response'));
        expect(queryByTestId("loading")).toBeNull();

    });

    it('should show error when invalid url is entered', async () => {
        const { getByTestId, queryByTestId } = render(<ShortenUrlForm />);
        const sendButton = getByTestId('send-form');
        const urlInput = getByTestId('url-input');
        expect(sendButton).toBeDefined();
        expect(urlInput).toBeDefined();
        fireEvent.change(urlInput, {target: {value: "invalid-url"}})
        fireEvent.click(sendButton);
        await waitFor(() => getByTestId('error-message'));
        expect(queryByTestId("response")).toBeNull();
        expect(queryByTestId("loading")).toBeNull();
    });

    it('should disable button when shorten url is loading', async () => {
        const { getByTestId } = render(<ShortenUrlForm />);
        const sendButton = getByTestId('send-form');
        const urlInput = getByTestId('url-input');
        expect(sendButton).toBeDefined();
        expect(urlInput).toBeDefined();
        fireEvent.change(urlInput, {target: {value: "http://example.com"}})
        fireEvent.click(sendButton);
        await waitFor(() => getByTestId('loading'));
        expect(sendButton).toBeDisabled();
    });
});
