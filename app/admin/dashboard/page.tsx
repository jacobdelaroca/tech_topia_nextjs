"use client";
import React, { FormEvent, useEffect, useState } from 'react'
import { addArea, addRoute, Area, Route, deleteArea, getAreas, getRoutes, deleteRoute, addAreaToRoute } from '../serverActions';

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
    }, [])
    const updateData = async () => {
        await fetchData(setAreas, getAreas);
        await fetchData(setRoutes, getRoutes);
        alert("data updated");
    }
  return (
    <div>
      <div>
        <form className='bg-slate-400 flex flex-col justify-center items-center' onSubmit={(e) => {submitForm(e, addRoute); updateData()}}>
            <h3 className='text-2xl'>Add Route</h3>
            <h3 className='text-2xl'>Name</h3>
            <input className='border p-3 h-12 w-36' type="text" name="name" id="" />
            <h3 className='text-2xl'>Lattitude</h3>
            <input className='border p-3 h-12 w-36' type="" step="any" name="lat" id="" />
            <h3 className='text-2xl'>Longitude</h3>
            <input className='border p-3 h-12 w-36' type="number" step="any" name="lng" id="" />
            <input className='border rounded-md h-16 w-40 bg-green-400 m-2' type="submit" value="ADD" />
        </form>
        <form className='bg-slate-400 flex flex-col justify-center items-center' onSubmit={(e) => {submitForm(e, addArea); updateData()}}>
            <h3 className='text-2xl'>Add Area</h3>
            <h3 className='text-2xl'>Name</h3>
            <input className='border p-3 h-12 w-36' type="text" name="name" id="" />
            <h3 className='text-2xl'>Lattitude</h3>
            <input className='border p-3 h-12 w-36' type="" step="any" name="lat" id="" />
            <h3 className='text-2xl'>Longitude</h3>
            <input className='border p-3 h-12 w-36' type="number" step="any" name="lng" id="" />
            <input className='border rounded-md h-16 w-40 bg-green-400 m-2' type="submit" value="ADD" />
        </form>
      </div>
      <div>
        <div>
            <h2 className='text-2xl'>ROUTES</h2>
            {routes.map((route) => <div key={route.id}>
                <h2>
                    {route.name}
                </h2>
                <button onClick={() => {
                    deleteRoute(route.id);
                    alert("deleted");
                    fetchData(setRoutes, getRoutes);
                }}>Delete</button>
                </div>)}
        </div>
        <div>
            <h2 className='text-2xl'>AREAS</h2>
            {areas.map((area) => <div key={area.id}>
                <h2>
                    {area.name}
                </h2>
                <button onClick={() => {
                    deleteArea(area.id);
                    alert("deleted");
                    fetchData(setAreas, getAreas);
                    }}>Delete</button>
                </div>)}
        </div>
      </div>
      <div>
        <h2>Add area to route</h2>
        <form onSubmit={(e) => {submitForm(e, addAreaToRoute)}}>
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
    </div>
  )
}

export default Admin
