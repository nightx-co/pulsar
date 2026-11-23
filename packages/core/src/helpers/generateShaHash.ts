export function generateSHA256(message: string) : Promise<string> {
    const data = new TextEncoder().encode(message);
    
    return crypto.subtle.digest('SHA-256', data).then(hashBuffer => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    })
}