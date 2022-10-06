export async function getCharacters() {
    try {
        const response = await fetch('https://www.breakingbadapi.com/api/characters/')
        if(!response.ok) throw new NetworkError();
        return await response.json();
    } catch (err) {
        throw err;
    }
}

class NetworkError extends Error {
    constructor() {
        super("Network error");
    }
}