
import React from 'react'
import ChartWIthForms from './_components/ChartWIthForms';
import { Area, getAreas, getRoutes, Route } from '@/app/admin/serverActions';

const Charts = async () => {
  const areas: Area[] = await getAreas();
  const routes: Route[] = await getRoutes();
  return (
    <div className='flex justify-center lg:p-12 lg:px-16 p-1'>
      <div className='bg-orange-200 bg-opacity-90 text-black shadow-xl'>
        <ChartWIthForms items={areas} table='area' />
        <ChartWIthForms items={routes} table='route' />
      </div>

    </div>
  )
}

export default Charts
