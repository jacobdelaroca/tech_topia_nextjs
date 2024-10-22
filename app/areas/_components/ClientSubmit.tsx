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
            if(data.error){
              router.replace(`/error/areaTooFar`)
              return;
            } else {
              router.replace(`/destination/${data.next}`)
            }
        } else {
            alert("Location Data is needed");
            return;
        }
    
    }

    console.log("routes", routes);

  return (
    <div className='flex h-full justify-center items-center flex-col'>
      {routes && routes.map((route: any) => {
        console.log(route);
        return(
            <form className='w-full flex flex-col items-center' key={stringify(route.id)} onSubmit={submitForm} >
                <input type="hidden" name="areaId"  value={areaId}/>
                <input type="hidden" name="routeId" value={route.route_id}/>
                <div className='border-2 border-main w-2/3 p-2 m-2'>
                  <input type="submit" value={route.route_name} className='w-full h-12 border bg-main'/>

                </div>
            </form>
        )
      })}
    </div>
  )
}

export default ClientSubmit
