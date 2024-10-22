import BackgroundMobile from '@/app/_components/BackgroundMobile/BackgroundMobile'
import Link from 'next/link'
import React from 'react'

const RouteNotFound = () => {
  return (
    <BackgroundMobile>
    <div className='flex h-screen justify-center items-center flex-col'>
        <h1 className='text-3xl p-6'>ROUTE NOT FOUND</h1>
        <h1 className='text-3xl p-6'><Link href={"/"}>HOME</Link></h1>
    </div>

    </BackgroundMobile>
  )
}

export default RouteNotFound
