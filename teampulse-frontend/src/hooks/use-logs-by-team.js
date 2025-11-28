import {useState, useEffect} from 'react';
import getLogsByTeamId from '../api/get-logs-by-team';

export default function useLogsByUser(teamId){
    const [logs, setLogs] = useState(null);
    const [userisLoading, setIsLoading] = useState(true);
    const [userError, setError] = useState();
    useEffect(() =>{
        getLogsByTeamId(teamId)
        .then((logs) => {
            setLogs(logs);
            setIsLoading(false);
        }).catch((error) => {
            setError(error);
            setIsLoading(false);
        })
    },[id])

    return {logs, logsisLoading, userError}
}