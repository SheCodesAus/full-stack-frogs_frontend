import axios from "axios";

const API_BASE_URL = "https://your-api.com";

export const getTeams = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/teams`);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.massage || "Failed to fetch teams");
    }
};