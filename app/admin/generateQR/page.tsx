import React from 'react';
import { getAreas } from '../serverActions';
import QRPanel from './_components/QRPanel';
import { unstable_noStore } from 'next/cache';
const GenerateQR = async () => {
    unstable_noStore()
    const areas = await getAreas()
    return (
        <div className='grid grid-cols-2'>
            {areas.map(area => <QRPanel key={area.id} area={area}></QRPanel>)}
        </div>
    )
}

export default GenerateQR
