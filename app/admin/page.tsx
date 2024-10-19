import React from 'react'
import { getSession } from '../lib'
import { redirect } from 'next/navigation';

const AdminDashboard = async () => {
    if(await getSession() === null){
        redirect("/admin/credentials");
    } else{
        redirect("/admin/dashboard");
    }
    return (
    <div>
        
    </div>
  )
}

export default AdminDashboard
