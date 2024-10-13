"use client";
import React from 'react'
import useGeoLocation from './_hooks/useGeolocation'

interface location{
    loaded: boolean,
    coordinates: {lat: string, lng: string} | null,
    error: null | any
}


const GetLocation = () => {
    const location: location = useGeoLocation();
    return (
        <div>
            {JSON.stringify(location)}
        </div>
    )
}

export default GetLocation
