"use client";
import React, { useEffect, useState } from 'react'
import { getRoutes, Route } from '../serverActions'
import { setPassReq, getAreas, AreaWithRoute, clearPassReq } from './serverActions';
import { generateRandomData } from '@/app/charts/serverActions';

const Automate = () => {

    const [routes, setRoutes] = useState<Route[]>([]);
    const [areas, setAreas] = useState<AreaWithRoute[]>([]);
    const [routeId, setRouteId] = useState<number>(0);

    useEffect(() => {
        const awaitRoutes = async () => {
            const routesTemp = await getRoutes();
            setRoutes(routesTemp);
        }
        awaitRoutes();
    }, [])

    useEffect(() => {
        const awaitAreas = async () => {
            const tempAreas: AreaWithRoute[] = await getAreas(routeId);
            // console.log()
            setAreas(tempAreas);
        }
        awaitAreas();
        console.log("areas awaited", routeId);
    }, [routeId])

    useEffect(() => {
        console.log('interval started');
        const intervalID = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * areas.length);
            const area = areas[randomIndex].area;
            setPassReq(routeId, area?.id);
            console.log("requested");
        }, 2000);

        return () => {
            clearInterval(intervalID);
        };
    }, [areas])

    return (
    <div>
        {routes.map(route => {
            return <div key={route.id}>
                <button className='w-36 h-24 border' onClick={() => setRouteId(route.id)}>Simulate {route.name}</button>
            </div>
        })}
        <button  className='w-36 h-24 border' onClick={() => clearPassReq()}>Delete all passenger request</button>
        <button  className='w-36 h-24 border' onClick={() => {setRouteId(0)}}>Stop automatic request</button>
        <button className='w-36 h-24 border' onClick={() => generateRandomData()}>generate</button>
    </div>
  )
}

export default Automate
