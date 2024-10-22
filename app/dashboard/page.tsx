import React from 'react'
import { getRoutes } from '../admin/serverActions'
import Link from 'next/link';

const DashboardMain = async () => {
  const routes = await getRoutes();
  return (
    <div className='p-6'>
      <h1 className='text-4xl'>Select Route to view:</h1>
      <div className='grid grid-cols-4 gap-4 p-6'>
        {routes.map(route =>
          <Link key={route.id} href={`/dashboard/${route.id}-10`}>
            <div className='border-2 border-main p-2'>
              <button className='w-full py-4 bg-main text-white text-3xl'>
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
