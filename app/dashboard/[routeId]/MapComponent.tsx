"use client";
import React, { useEffect, useState } from 'react'
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Route } from '@/app/admin/serverActions';

import { DivIcon, Icon, LatLngExpression, divIcon, point } from "leaflet";
import { MAP_ICON_GRID_WIDTH, OFFSET } from '@/app/_constants/constants';
import { getRoutesCoord } from './serverActions';
import { AreaWithRoute, getAreas } from '@/app/admin/automate/serverActions';

const formatTimeFromISOString = (isoString: string): string => {
  const date = new Date(isoString);

  // Extract hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0'); // Add leading zero if necessary

  // Determine AM/PM suffix
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format the time as hh:mm AM/PM
  return `${hours}:${minutes} ${ampm}`;
};
const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
  //   iconUrl: require("./placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

const customIconArea = new Icon({
  iconUrl: "https://cdn-icons-png.freepik.com/512/12056/12056114.png?ga=GA1.1.2121849376.1725374720",
  //   iconUrl: require("./placeholder.png"),
  iconSize: [38, 38] // size of the icon
});

interface PassengerNotif {
  id: number;
  route: number;
  area: number;
  timestamp: string;
}

interface Area {
  id: number;
  name: string;
  lat: string;
  lng: string;
}

interface DataItem {
  passenger_notif_table: PassengerNotif;
  area: Area;
}

interface GroupedItem {
  area: Area;
  passenger_notifs: PassengerNotif[];
}

const createClusterCustomIcon = function (cluster: any): DivIcon {

  return divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};
const MoveMapView = ({ lat, lng }: { lat: number; lng: number }) => {
  const map = useMap();

  useEffect(() => {
    // Move the view to the specified latitude and longitude
    map.setView([lat, lng], map.getZoom()); // Use current zoom level
  }, [lat, lng, map]);

  return null; // This component doesn't render anything
};

const Dashboard = ({ params, coords, routes, areasInit }: { params: { routeId: string }, coords: number[], routes: Route[], areasInit: AreaWithRoute[] }) => {

  const [route_Id_intitial, minutes_intitial] = params.routeId.split('-');
  // console.log(params.routeId.split('-'));

  const [notifs, setNotifs] = useState<GroupedItem[]>([]);
  const [routeId, setRouteId] = useState<number>(Number(route_Id_intitial));
  const [minutes, setMinutes] = useState<number>(Number(minutes_intitial));
  const [viewCenter, setViewCenter] = useState<number[]>(coords);
  const [areas, setAreas] = useState<AreaWithRoute[]>(areasInit);
  const [showAreaMarkers, setShowAreaMarker] = useState<boolean>(false);

  useEffect(() => {

    const intervalID = setInterval(async () => {
      fetch(`api/latest_passengers/${routeId}-${minutes}`, { cache: 'no-store' })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the JSON from the response
        })
        .then(result => {
          const items: GroupedItem[] = result.reduce((acc: GroupedItem[], curr: DataItem) => {
            const { id, name, lat, lng } = curr.area;
            const notif = curr.passenger_notif_table;

            const existingArea = acc.find(item => item.area.id === id);
            if (existingArea) {
              existingArea.passenger_notifs.push(notif);
            } else {
              acc.push({
                area: { id, name, lat, lng },
                passenger_notifs: [notif]
              });
            }

            return acc;
          }, []);
          setNotifs(items); // Set loading to false
          console.log(result);
        })
        .catch(error => {
          console.log(error)
        })
    }, 2000);

    return () => {
      clearInterval(intervalID);
    }
  }, [routeId, minutes])

  useEffect(() => {
    const awaitAreas = async () => {
      const tempAreas = await getAreas(routeId);
      setAreas(tempAreas);
    }
    awaitAreas();
  }, [routeId])

  console.log(areas);



  return (
    <div className='w-full mt-6 px-2 '>
      <h1 className='text-center text-4xl my-6'>Map Dashboard</h1>
      <div className='flex text-xl flex-col lg:flex-row justify-center'>
        <div className='flex flex-col text-3xl justify-start p-2 lg:w-[20%] w-full'>
          <div className='text-3xl border-2 p-4 border-main rounded-md bg-white shadow-lg'>
            <h2 className='border-b-2 border-main mb-2 pb-2'>Showing passenger within the last <span className='min-w-32 text-main'>{minutes}</span>  minutes</h2>
            <h2 className='pt-1'>Select minutes</h2>
            <input className='w-full py-4' type="range" name="minutes" id="minute-slider" min={2} max={60} value={minutes} onChange={e => { setMinutes(Number(e.target.value)); }} />
          </div>
          <div className='p-4 my-4 border-2 border-main rounded-md bg-white shadow-lg'>
            <h2>Select Route to show</h2>
            <select className='border h-16 w-full' onChange={async (e) => {
              const newCenter = await getRoutesCoord(Number(e.target.value));
              setViewCenter(newCenter);
              console.log("new center", newCenter);
              setRouteId(Number(e.target.value))
            }}>
              <option value="">Select a Route</option>
              {routes.map((route) => (
                <option key={route.id} value={route.id}>
                  {route.name}
                </option>
              ))}
            </select>

          </div>
          <div className='flex px-4 h-20 items-center justify-between my-4 border-2 border-main rounded-md bg-white shadow-lg'>
            <h2>Show Area Name Markers</h2>
            <input className='w-8 h-8 m-2' type="checkbox" name="" id="" checked={showAreaMarkers} onChange={e => setShowAreaMarker(e.target.checked)} />
          </div>
        </div>
        <div className='flex flex-col justify-start p-3 lg:w-[90%] w-[100%] border-2 border-main rounded-3xl'>
          <MapContainer center={viewCenter as LatLngExpression} zoom={14.5} className=''>
            {/* OPEN STREEN MAPS TILES */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {notifs.map((item: GroupedItem) => (
              <MarkerClusterGroup key={`group-${item.area.id}`}
                chunkedLoading
                iconCreateFunction={createClusterCustomIcon}
                maxClusterRadius={20}
              >
                {/* Mapping through the markers */}
                {item.passenger_notifs.map((notif, y: number) => {
                  //   const [lat, lng] = AREA_LOCATION.filter(area => area.name === item.area.name)[0].coords;
                  return (
                    <Marker key={`marker-${notif.id}`} position={[Number(item.area.lat) + OFFSET * y, Number(item.area.lng) + OFFSET * (y % MAP_ICON_GRID_WIDTH)] as LatLngExpression} icon={customIcon}>
                      <Popup>{formatTimeFromISOString(notif.timestamp)}</Popup>
                    </Marker>
                  );
                }
                )}
              </MarkerClusterGroup>
            ))}
            {showAreaMarkers && areas.map((area, y: number) => {
                  //   const [lat, lng] = AREA_LOCATION.filter(area => area.name === item.area.name)[0].coords;
                  return (
                    <Marker key={`marker-${area.area?.id}`} position={[Number(area.area?.lat) + (OFFSET*-1) * y, Number(area.area?.lng) + (OFFSET*-1) * (y % MAP_ICON_GRID_WIDTH)] as LatLngExpression} icon={customIconArea}>
                      <Popup>{area.area?.name}</Popup>
                    </Marker>
                  );
                }
                )}
            <MoveMapView lat={viewCenter[0]} lng={viewCenter[1]}></MoveMapView>

          </MapContainer>
        </div>
        {/* <ul>
            {notifs.map((notif: Notifs) => <li key={String(notif.passenger_notif_table.id)}>{notif.area.name}</li>)}
          </ul> */}
      </div>

    </div>
  )
}

export default Dashboard
