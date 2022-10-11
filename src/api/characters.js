export async function apiCall(endpoint) {
    try {
        const response = await fetch(endpoint)
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