import { useState, useEffect } from "react";
import getAllCheckIns from "../api/get-all-checkins";

export default function useCheckIns() {
    const [checkins, setCheckins] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllCheckIns()
            .then((data) => {
                setCheckins(data);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err);
                setIsLoading(false);
            });
    }, []);

    return { checkins, isLoading, error };
}
