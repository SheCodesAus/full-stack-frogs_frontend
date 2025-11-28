import {useState, useEffect} from 'react';
import getLogsByUserId from '../api/get-logs-by-user';

export default function useLogsByUser(userId){
    const [logs, setLogs] = useState(null);
    const [userisLoading, setIsLoading] = useState(true);
    const [userError, setError] = useState();
    useEffect(() =>{
        getLogsByUserId(userId)
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