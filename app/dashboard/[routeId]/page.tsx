import React from 'react'
import Dashboard from './MapComponent'
import { getSession } from '@/app/lib'
import { redirect } from 'next/navigation'
import { getRoutesCoord } from './serverActions'
import { getRoutes } from '@/app/admin/serverActions';

const DashboardMain = async ({params}: {params: {routeId: string}}) => {
  const session: any = await getSession();
  if(session === null){
    redirect("/admin/unauthorized");
  }
  console.log(Number(params.routeId.split("-")[0]));
  const coords = await getRoutesCoord(Number(params.routeId.split("-")[0]));
  const routes = await getRoutes();
  return (
    <div>
      <Dashboard params={params} coords={coords} routes={routes}></Dashboard>
    </div>
  )
}

export default DashboardMain
