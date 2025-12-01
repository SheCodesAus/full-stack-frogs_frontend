async function getLogsByWeekIndex(week_index){
    const url = `${import.meta.env.VITE_API_URL}/logs/teams/weeks/${week_index}`;
    const response = await fetch(url, { method: 'GET' });
    if(!response.ok){
        const fallbackError = 'Error fetching fundraiser';
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail || fallbackError;
        throw new Error(errorMessage);
    }
    return await response.json();

};

export default getLogsByTeamId;
