import { useEffect, useState } from 'react';

export const useLoading = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        // cleanup
        return () => {
            console.log("will run on unmounting");
        }
    }, []);

    return loading;
}