const BASE_URL = 'https://cd07-38-253-189-37.ngrok-free.app';

const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API ERROR:", error);
        throw error;
    }
};

export default apiClient;
