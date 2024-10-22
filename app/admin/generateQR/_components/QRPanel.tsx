'use client';
import React from 'react'
import QRCode from 'react-qr-code';

const QRPanel = ({ area }: { area: { name: string, id: number } }) => {
    if (typeof window !== "undefined") {
        const rootUrl = `${window.location.protocol}//${window.location.host}/`;
        return (
            <section className='text-4xl h-[5 0vh] flex items-center justify-center flex-col p-4'>
                <div className='flex flex-col items-center justify-center w-full bg-white border-2 border-main py-24 p-4'>
                    <QRCode value={`${rootUrl}areas/${area.id}`} width={100}></QRCode>
                    <h1 className='mt-20'>
                        {area.name}
                    </h1>
                    <h1 className='text-2xl'>
                        {`${rootUrl}areas/${area.id}`}
                    </h1>
                </div>
            </section>
        )
    }
    return <div>Using Conditional Checks</div>;
}

export default QRPanel
