import React from 'react'
import Dashboard from './MapComponent'
import { redirect } from 'next/navigation'
import { checkRouteId, getRoutesCoord } from './serverActions'
import { getRoutes } from '../serverActions'
import { getAreas } from './serverActions'

const DashboardMain = async ({params}: {params: {routeId: string}}) => {
  // const session: any = await getSession();
  console.log(Number(params.routeId.split("-")[0]));
  if(!await checkRouteId(Number(params.routeId.split("-")[0]))) redirect("/error/routeNotFound");
  const coords = await getRoutesCoord(Number(params.routeId.split("-")[0]));
  const routes = await getRoutes();
  const areas = await getAreas(Number(params.routeId.split("-")[0]));

  return (
    <div>
      <Dashboard params={params} coords={coords} routes={routes} areasInit={areas}></Dashboard>
    </div>
  )
}

export default DashboardMain
