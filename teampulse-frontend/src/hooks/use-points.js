import {useState, useEffect} from 'react';
import getMoods from '../api/get-moods';

export default function useMoods(){
    const [points, setPoints] = useState(null);
    const [ptisLoading, setIsLoading] = useState(true);
    const [ptError, setError] = useState();
    useEffect(() =>{
        getMoods()
        .then((moods) => {
            setPoints(moods);
            setIsLoading(false);
        }).catch((error) => {
            setError(error);
            setIsLoading(false);
        })
    },[])

    return {points, ptisLoading, ptError}
}