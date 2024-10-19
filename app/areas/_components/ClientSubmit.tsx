"use client";
import React, { FormEvent } from 'react'
import useGeoLocation from '../_hooks/useGeolocation';
import { stringify } from 'querystring';
import { useRouter } from 'next/navigation';


interface RouteInfo{
    route_id: number;
    route_name: string
}

interface Props {
    routes: RouteInfo[],
    areaId: string,
}

interface location{
    loaded: boolean,
    coordinates: {lat: string, lng: string} | null,
    error: null | any
}


const ClientSubmit: React.FC<Props> = ({routes, areaId}) => {
    const router = useRouter();
    const location: location = useGeoLocation();
    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget)
        console.log(JSON.stringify({
            areaId: formData.get("areaId"),
            routeId: formData.get("routeId"),
            lat: location.coordinates?.lat,
            lng: location.coordinates?.lng
          }));
        if(location.loaded && location.coordinates !== null){
            const formData = new FormData(event.currentTarget)
            const response = await fetch('/areas/api', {
              method: 'POST',
              body: JSON.stringify({
                areaId: formData.get("areaId"),
                routeId: formData.get("routeId"),
                lat: location.coordinates?.lat,
                lng: location.coordinates?.lng
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              cache: "no-store"
            })
         
            // Handle response if necessary
            const data = await response.json()
            router.replace(`/destination/${data.next}`)
        } else {
            alert("Location Data is needed");
            return;
        }
    
    }

    console.log("routes", routes);

  return (
    <div>
      {routes && routes.map((route: any) => {
        console.log(route);
        return(
            <form key={stringify(route.id)} onSubmit={submitForm} >
                <input type="hidden" name="areaId"  value={areaId}/>
                <input type="hidden" name="routeId" value={route.route_id}/>
                <input type="submit" value={route.route_name} className='w-10 h-5 border bg-green-400'/>
            </form>
        )
      })}
    </div>
  )
}

export default ClientSubmit
