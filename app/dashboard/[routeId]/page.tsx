"use client";
import React, { useEffect, useState } from 'react'

const Dashboard = ({params}: {params: {routeId: string}}) => {

  const [route_Id, minutes] = params.routeId.split('-');
  console.log(params.routeId.split('-'));
  const [notifs, setNotifs] = useState([]);
  useEffect(() => {
    
      setInterval( async () => {
          fetch(`api/latest_passengers/${route_Id}-${minutes}`, { cache: 'no-store' })
          .then(response => {
            if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json(); // Parse the JSON from the response
          })
          .then(result => {
              setNotifs(result); // Set loading to false
          })
          .catch(error => {
              console.log(error)
          })
        }, 2000);
  }, [])
  return (
    <div>
      <ul>
        {notifs.map((notif: {area: number, id: number}) => <li key={String(notif.id)}>{notif.area}</li>)}
      </ul>
    </div>
  )
}

export default Dashboard
