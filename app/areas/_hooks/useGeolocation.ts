import { useState, useEffect } from "react";


interface location{
    loaded: boolean,
    coordinates: {lat: string, lng: string} | null,
    error: null | any
}

const useGeoLocation = () => {
    const [location, setLocation] = useState<location>({
        loaded: false,
        coordinates: { lat: "", lng: "" },
        error: null
    });

    const onSuccess = (location: any) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
            error: null
        });
    };

    const onError = (error: any) => {
        setLocation({
            loaded: true,
            coordinates: null,
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;