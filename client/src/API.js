const API_URL = 'http://localhost:1337';

export async function listLogEntries() {
    const response = await fetch(`${API_URL}/api/Travel`);
    return response.json();
}

export async function createLogEntry(entry) {
    const apiKey = entry.apikey;
    delete entry.apiKey;
    const response = await fetch(`${API_URL}/api/Travel`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-API-KEY': apiKey,
        },
        body: JSON.stringify(entry),
    });
    const json = await response.json();
    if (response.ok) {
        return json;
    }
    const error = new Error(json.message);
    error.response = json;
    throw error;
}