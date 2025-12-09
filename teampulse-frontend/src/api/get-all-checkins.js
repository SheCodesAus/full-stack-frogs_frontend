async function getAllCheckIns(token) {

    const currentDate = new Date();
    const WeekNumber = getISOWeekNumber(currentDate);


    const url = `${import.meta.env.VITE_API_URL}/pulse_logs/?year_week=${WeekNumber}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
    });

    if (!response.ok) {
        const fallbackError = "Error fetching check-ins";

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail || fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default getAllCheckIns;



function getISOWeekNumber(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);

    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const year = d.getUTCFullYear();
    
    const week = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    const weekPadded = String(week).padStart(2, "0");

    return `${year}${weekPadded}`;
}
