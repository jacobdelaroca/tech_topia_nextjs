"use client";
import React, { useEffect, useState } from 'react'
import "./styles.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

import { DivIcon, Icon, LatLngExpression, divIcon, point } from "leaflet";
import { MAP_ICON_GRID_WIDTH, OFFSET } from '@/app/_constants/constants';


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

const Dashboard = ({params}: {params: {routeId: string}}) => {

  const [route_Id, minutes] = params.routeId.split('-');
  console.log(params.routeId.split('-'));
  const [notifs, setNotifs] = useState<GroupedItem[]>([]);
  useEffect(() => {
    
      const intervalID = setInterval( async () => {
          fetch(`api/latest_passengers/${route_Id}-${minutes}`, { cache: 'no-store' })
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
  }, [])



  return (
    <div>
      <MapContainer center={[13.688696, 121.059264]} zoom={13.2}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

        {notifs.map((item: GroupedItem) => (
          <MarkerClusterGroup key={`group-${item.area.id}`}
          chunkedLoading
          iconCreateFunction={createClusterCustomIcon}
        >
          {/* Mapping through the markers */}
          {item.passenger_notifs.map((notif, y:number) => 
            {
            //   const [lat, lng] = AREA_LOCATION.filter(area => area.name === item.area.name)[0].coords;
              return (
                <Marker key={`marker-${notif.id}`} position={[Number(item.area.lat) + OFFSET * y, Number(item.area.lng) + OFFSET * (y%MAP_ICON_GRID_WIDTH)] as LatLngExpression} icon={customIcon}>
                  <Popup>{formatTimeFromISOString(notif.timestamp)}</Popup>
                </Marker>
              );
            }
          )}
        </MarkerClusterGroup>
        ))}

    </MapContainer>
      {/* <ul>
        {notifs.map((notif: Notifs) => <li key={String(notif.passenger_notif_table.id)}>{notif.area.name}</li>)}
      </ul> */}
    </div>
  )
}

export default Dashboard
