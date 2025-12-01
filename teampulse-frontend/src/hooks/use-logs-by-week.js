import {useState, useEffect} from 'react';
import getLogsByWeekIndex from '../api/get-logs-by-week';

export default function useLogsByUser(weekIndex){
    const [logs, setLogs] = useState(null);
    const [userisLoading, setIsLoading] = useState(true);
    const [userError, setError] = useState();
    useEffect(() =>{
        getLogsByWeekIndex(weekIndex)
        .then((logs) => {
            setLogs(logs);
            setIsLoading(false);
        }).catch((error) => {
            setError(error);
            setIsLoading(false);
        })
    },[weekIndex])

    return {logs, logsisLoading, userError}
}