const API_URL = import.meta.env.VITE_API_URL;
const PULSE_LOGS_ENDPOINT = '/pulse_logs/';

export async function createCheckIn(payload) {
    const url = `${import.meta.env.VITE_API_URL}/pulse_logs/`;

    if (!import.meta.env.VITE_API_URL) {
        throw new Error("API URL is not configured. Please check your environment variables.");
    }

    const checkInData = {
        mood: payload.mood,
        workload: payload.workload,
        comment: payload.comment || "",
        timestamp_local: payload.timestamp_local || new Date().toISOString(),
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('authToken')}`,
            },
            body: JSON.stringify(checkInData),
        });

        if (!response.ok) {
            const fallbackError = "Error submitting check-in";
            const data = await response.json().catch(() => {
                throw new Error(fallbackError);
            });
            const errorMessage = data?.detail || fallbackError;
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error("Check-in submission error:", error);
        throw error;
    }
}