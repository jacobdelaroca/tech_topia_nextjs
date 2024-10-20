"use client";
import React, { FormEvent, useEffect, useState } from 'react'
import { addArea, addRoute, Area, Route, deleteArea, getAreas, getRoutes, deleteRoute, addAreaToRoute, deleteAreaAssociation, getRoutesWithAreas } from '../serverActions';

const Admin = () => {
    const submitForm = async (event: FormEvent, action: any) =>{
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const data = new FormData(form);
        await action(data);
        alert("Entry Created.");
        form.reset();

    }
    const [areas, setAreas] = useState<Area[]>([]);
    const [routes, setRoutes] = useState<Route[]>([]);
    const [routesWithAreas, setRoutesWithAreas] = useState<Route[]>([]);
    const [routeToAdd, setRouteToAdd] = useState<number>(0);
    const [areaToAdd, setAreaToAdd] = useState<number>(0);
    const fetchData = async (setFunc: any, fetchFunc:any) => {
        const temp = await fetchFunc();
        console.log(temp);
        setFunc(temp); 
    }
    useEffect(() => {
        fetchData(setAreas, getAreas);
        fetchData(setRoutes, getRoutes);
        fetchData(setRoutesWithAreas, getRoutesWithAreas);
      }, [])
      const updateData = async () => {
        await fetchData(setAreas, getAreas);
        await fetchData(setRoutes, getRoutes);
        await fetchData(setRoutesWithAreas, getRoutesWithAreas);
        alert("data updated");
    }
  return (
    <div>
      <div className='p-12 px-52 flex flex-row items-stretch justify-center'>
        <form className='p-12 bg-slate-400 flex-1 justify-center items-center' onSubmit={(e) => {submitForm(e, addRoute); updateData()}}>
            <h3 className='text-2xl'>Add Route</h3>
            <h3 className='text-2xl'>Name</h3>
            <input className='border rounded-md p-3 h-12 w-full mb-6' type="text" name="name" id="" />
            <h3 className='text-2xl'>Lattitude</h3>
            <input className='border rounded-md p-3 h-12 w-full mb-6' type="" step="any" name="lat" id="" />
            <h3 className='text-2xl'>Longitude</h3>
            <input className='border rounded-md p-3 h-12 w-full mb-6' type="number" step="any" name="lng" id="" />
            <input className='border rounded-md h-16 w-full bg-green-400 block' type="submit" value="ADD" />
        </form>
        <form className='p-12 bg-slate-400 flex-1 justify-center items-center' onSubmit={(e) => {submitForm(e, addArea); updateData()}}>
            <h3 className='text-2xl'>Add Area</h3>
            <h3 className='text-2xl'>Name</h3>
            <input className='border rounded-md p-3 h-12 w-full mb-6' type="text" name="name" id="" />
            <h3 className='text-2xl'>Lattitude</h3>
            <input className='border rounded-md p-3 h-12 w-full mb-6' type="" step="any" name="lat" id="" />
            <h3 className='text-2xl'>Longitude</h3>
            <input className='border rounded-md p-3 h-12 w-full mb-6' type="number" step="any" name="lng" id="" />
            <input className='border rounded-md h-16 w-full bg-green-400 block' type="submit" value="ADD" />
        </form>
      </div>
      <div className='flex flex-row justify-evenly items-stretch'>
        <div className='m-6 border rounded-lg bg-slate-400 p-16 flex-1'>
            <h2 className='text-2xl'>ROUTES</h2>
            {routes.map((route) => <div className='flex justify-between my-1' key={route.id}>
                <h2>
                    {route.name}
                </h2>
                <button className='border bg-red-400 px-4 rounded-md' onClick={() => {
                    deleteRoute(route.id);
                    alert("deleted");
                    updateData();
                }}>Delete</button>
                </div>)}
        </div>
        <div className='m-6 border border-slate-950 bg-slate-400 p-16 flex-1'>
            <h2 className='text-2xl'>AREAS</h2>
            {areas.map((area) => <div className='flex justify-between my-1' key={area.id}>
                <h2>
                    {area.name}
                </h2>
                <button className='border bg-red-400 px-4 rounded-md' onClick={() => {
                    deleteArea(area.id);
                    alert("deleted");
                    updateData();
                    }}>Delete</button>
                </div>)}
        </div>
      </div>
      <div className='text-xl m-4'>
        <h2>Add area to route</h2>
        <form className='flex justify-between px-6 my-2 ' onSubmit={(e) => {submitForm(e, addAreaToRoute); updateData()}}>
        <div>
          <label htmlFor="dropdown1">Ruote:</label>
          <select id="dropdown1" name="route" value={routeToAdd} onChange={(e) => {setRouteToAdd(Number(e.target.value))}}>
            <option value="">Select an option</option>
            {routes.map((route, index) => (
              <option key={index} value={route.id}>
                {route.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dropdown2">Area:</label>
          <select id="dropdown2" name='area' value={areaToAdd} onChange={(e) => {setAreaToAdd(Number(e.target.value))}}>
            <option value="">Select an option</option>
            {areas.map((area, index) => (
              <option key={index} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          Add
        </button>
      </form>
      </div>
        <h2>Area Association</h2>
      <div className='text-xl grid grid-cols-2'>
        {routesWithAreas.map(route => <div className='m-6 p-6 border' key={`routes-${route.id}`}>
          <h2>{route.name}</h2>
          <div className='h-72 overflow-y-scroll'>
            {route.areas?.map(area => 
              <div className=' p-4 flex justify-between ' key={`areas-${area.id}`}>
                <h3>{area.name}</h3>
                <button onClick={() => {deleteAreaAssociation(route.id, area.id); updateData()}}>Delete</button>
              </div>
            )}
          </div>
        </div>)}
        {/* <button onClick={() => {getAreasToRoutes(25)}}>test areas to routes</button> */}
      </div>
    </div>
  )
}

export default Admin
