import { Base64 } from 'js-base64';

export function encodeId(level: number): string {
    return Base64.encode(level.toString());
}

export function decodeId(level: string): number {
    const decodedString = Base64.decode(decodeURIComponent(level));
    return parseInt(decodedString, 10);
}