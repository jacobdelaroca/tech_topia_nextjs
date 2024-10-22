"use client";
import React from 'react'
import DefaulQRScanPrompt from '../_components/BackgroundMobile/DefaulQRScanPrompt';

// interface location{
//     loaded: boolean,
//     coordinates: {lat: string, lng: string} | null,
//     error: null | any
// }


const GetLocation = () => {
    return (
        <DefaulQRScanPrompt />
    )
}

export default GetLocation
