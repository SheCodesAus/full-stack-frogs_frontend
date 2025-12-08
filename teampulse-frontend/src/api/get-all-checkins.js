async function getAllCheckIns(token) {

    const currentDate = new Date();
    const lastWeekNumber = getISOWeekNumber(currentDate) - 1;


    const url = `${import.meta.env.VITE_API_URL}/pulse_logs/?year_week=${lastWeekNumber}`;


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
    // ISO week date weeks start on Monday (1) and Sunday is 7
    const dayNum = d.getUTCDay() || 7;
    // Set date to the Thursday of this week (ISO rule)
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    // First day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    const getYear = d.getUTCFullYear();
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return `${getYear}${weekNo}`;

}


