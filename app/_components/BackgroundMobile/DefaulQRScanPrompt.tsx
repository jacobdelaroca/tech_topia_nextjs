import React from 'react'
import BackgroundMobile from './BackgroundMobile'
import Link from 'next/link'

const DefaulQRScanPrompt = () => {
  return (
    <BackgroundMobile>
      <div className='h-40 p-10 flex flex-col items-center justify-center text-3xl'>
        <h1 className='text-center'>Please Scan the QR code in your area</h1>
        <h1 className='text-3xl p-6'><Link href={"/"}>HOME</Link></h1>
      </div>
    </BackgroundMobile>
  )
}

export default DefaulQRScanPrompt
