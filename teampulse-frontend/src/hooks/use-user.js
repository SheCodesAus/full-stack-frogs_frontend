import {useState, useEffect} from 'react';
import getUserById from '../api/get-user-by-id';

export default function useOneUser(id){
    const [user, setUser] = useState(null);
    const [userisLoading, setIsLoading] = useState(true);
    const [userError, setError] = useState();
    useEffect(() =>{
        getUserById(id)
        .then((user) => {
            setUser(user);
            setIsLoading(false);
        }).catch((error) => {
            setError(error);
            setIsLoading(false);
        })
    },[id])

    return {user, userisLoading, userError}
}