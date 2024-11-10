import React from 'react'
import { getRoutes } from './serverActions';
import Link from 'next/link';

const DashboardMain = async () => {
  const routes = await getRoutes();
  return (
    <div className='p-6 text-black'>
      <h1 className='lg:text-4xl text-xl bg-orange-200 w-fit p-3 rounded-t-md'>Select Route to view:</h1>
      <div className='grid lg:grid-cols-4 grid-cols-2 lg:gap-3 gap-2 lg:p-6 p-2  bg-orange-200 bg-opacity-90 shadow-xl rounded-md'>
        {routes.map(route =>
          <Link key={route.id} href={`/dashboard/${route.id}-10`}>
            <div className='border-2 border-main p-2 h-full'>
              <button className='w-full py-4 bg-main text-white h-full'>
                <h2>{route.name}</h2>
              </button>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default DashboardMain
