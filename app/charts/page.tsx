
import React from 'react'
import ChartWIthForms from './_components/ChartWIthForms';
import { Area, getAreas, getRoutes, Route } from '@/app/admin/serverActions';

const Charts = async () => {
    const areas:Area[] = await getAreas();
    const routes:Route[] = await getRoutes();
  return (
    <div>
        <ChartWIthForms items={areas} table='area'/>
        <ChartWIthForms items={routes} table='route'/>
    </div> 
  )
}

export default Charts
