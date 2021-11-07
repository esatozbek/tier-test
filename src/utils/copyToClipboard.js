export default function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}
