import React from 'react'
import Dashboard from './MapComponent'
import { getSession } from '@/app/lib'
import { redirect } from 'next/navigation'

const DashboardMain = async ({params}: {params: {routeId: string}}) => {
  const session: any = await getSession();
  if(session === null){
    redirect("/admin/unauthorized");
  }
  return (
    <div>
      <Dashboard params={params}></Dashboard>
    </div>
  )
}

export default DashboardMain
