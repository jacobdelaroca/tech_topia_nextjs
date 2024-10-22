"use client";
import React, { FormEvent, useEffect, useState } from 'react'
import { addArea, addRoute, Area, Route, deleteArea, getAreas, getRoutes, deleteRoute, addAreaToRoute, deleteAreaAssociation, getRoutesWithAreas } from '../serverActions';
import ItemEditRow from '../_components/ItemEditRow';

const Admin = () => {
  const submitForm = async (event: FormEvent, action: any) => {
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
  const fetchData = async (setFunc: any, fetchFunc: any) => {
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
      <div className='p-2 flex flex-row items-stretch justify-center'>
        <div className='flex flex-col w-[30%]'>
          <div className='border-2 border-main p-5 m-2 rounded-md shadow-lg bg-white'>
            <form className='p-12 py-2  flex-1 justify-center items-center' onSubmit={(e) => { submitForm(e, addRoute); updateData() }}>
              <h3 className='text-3xl text-center'>Add Route</h3>
              <h3 className='text-2xl'>Name</h3>
              <input className='border border-main rounded-md p-3 h-12 w-full mb-6' type="text" name="name" id="" />
              <h3 className='text-2xl'>Lattitude</h3>
              <input className='border border-main rounded-md p-3 h-12 w-full mb-6' type="number" step="any" name="lat" id="" />
              <h3 className='text-2xl'>Longitude</h3>
              <input className='border border-main rounded-md p-3 h-12 w-full mb-6' type="number" step="any" name="lng" id="" />
              <input className='border rounded-md h-16 w-full bg-accent block' type="submit" value="ADD" />
            </form>

          </div>
          <div className='border-2 border-main p-5 m-2 rounded-md shadow-lg bg-white'>
            <form className='p-12 py-2  flex-1 justify-center items-center' onSubmit={(e) => { submitForm(e, addArea); updateData() }}>
              <h3 className='text-3xl text-center'>Add Area</h3>
              <h3 className='text-2xl'>Name</h3>
              <input className='border border-main rounded-md p-3 h-12 w-full mb-6' type="text" name="name" id="" />
              <h3 className='text-2xl'>Lattitude</h3>
              <input className='border border-main rounded-md p-3 h-12 w-full mb-6' type="number" step="any" name="lat" id="" />
              <h3 className='text-2xl'>Longitude</h3>
              <input className='border border-main rounded-md p-3 h-12 w-full mb-6' type="number" step="any" name="lng" id="" />
              <input className='border rounded-md h-16 w-full bg-accent block' type="submit" value="ADD" />
            </form>

          </div>
        </div>
        <div className='flex flex-col justify-between items-stretch w-[65%]'>
          <div className='text-xl m-2 h-full bg-white border-2 border-main rounded-md p-2'>
            <h2 className='text-3xl text-center'>Add area to route</h2>
            <form className='flex justify-evenly items-center px-6 my-2 ' onSubmit={(e) => { submitForm(e, addAreaToRoute); updateData() }}>
              <div className='w-[40%]'>
                <label htmlFor="dropdown1" className='text-2xl p-2'>Ruote:</label>
                <select id="dropdown1" className='p-2 px-3 text-2xl' name="route" value={routeToAdd} onChange={(e) => { setRouteToAdd(Number(e.target.value)) }}>
                  <option value="" >Select an option</option>
                  {routes.map((route, index) => (
                    <option key={index} value={route.id}>
                      {route.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className='w-[40%]'>
                <label htmlFor="dropdown2" className='text-2xl p-2'>Area:</label>
                <select id="dropdown2" className='p-2 px-3 text-2xl' name='area' value={areaToAdd} onChange={(e) => { setAreaToAdd(Number(e.target.value)) }}>
                  <option value="" >Select an option</option>
                  {areas.map((area, index) => (
                    <option key={index} value={area.id}>
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" className='w-[20%] bg-accent rounded-md h-12'>
                Add
              </button>
            </form>
          </div>
          <div className='flex flex-row h-full'>
            <div className='border border-main rounded-md p-6 flex-1 bg-white m-2 shadow-lg'>
              <h2 className='text-2xl text-center pb-2 border-b-2 border-main'>ROUTES</h2>
              <div className='overflow-y-scroll mt-6 '>
              <div className='w-full px-2 grid grid-cols-5'>
                    <h1 className='col-span-2'>Name</h1>
                    <h1>Latitude</h1>
                    <h1>Longitude</h1>
                    <h1>Action</h1>
                  </div>
                {routes.map((route) => 
                <div key={route.id} className=''>
                  <ItemEditRow deleteFunc={deleteRoute} table={"route"} itemDetail={route} updateFunc={updateData}/>

                </div>
                  
                    )}
              </div>
            </div>
            <div className='border border-main rounded-md p-6 flex-1 bg-white m-2 shadow-lg'>
              <h2 className='text-2xl text-center pb-2 border-b-2 border-main'>AREAS</h2>
              <div className='overflow-y-scroll max-h-[75vh] mt-6 p-3'>

                  <div className='w-full px-2 grid grid-cols-5'>
                    <h1 className='col-span-2'>Name</h1>
                    <h1>Latitude</h1>
                    <h1>Longitude</h1>
                    <h1>Action</h1>
                  </div>
                {areas.map((area) => 
                <div key={area.id} className=''>
                  <ItemEditRow deleteFunc={deleteArea} table={"area"} itemDetail={area} updateFunc={updateData}/>

                </div>
                
                // <div className='flex justify-between my-1 text-xl' key={area.id}>
                //   <h2>
                //     {area.name}
                //   </h2>
                //   <button className='border bg-red-600 text-white px-4 rounded-md' onClick={() => {
                //     deleteArea(area.id);
                //     alert("deleted");
                //     updateData();
                //   }}>Delete</button>
                // </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='text-2xl px-[5%] mb-32'>
        {(routesWithAreas.length > 0) && <h2 className='text-3xl text-center'>Area Association</h2>}
        <div className='text-xl grid grid-cols-2 '>
          {routesWithAreas.map(route => <div className='h-[40vh] overflow-y-scroll m-2 bg-white p-4 border-2 border-main rounded-md shadow-lg' key={`routes-${route.id}`}>
            <h2 className='text-3xl'>{route.name}</h2>
            <div className=''>
              {route.areas?.map(area =>
                <div className=' p-4 flex justify-between ' key={`areas-${area.id}`}>
                  <h3>{area.name}</h3>
                  <button onClick={() => { deleteAreaAssociation(route.id, area.id); updateData() }}>Delete</button>
                </div>
              )}
            </div>
          </div>)}
          {/* <button onClick={() => {getAreasToRoutes(25)}}>test areas to routes</button> */}
        </div>
        
      </div>
    </div>
  )
}

export default Admin
