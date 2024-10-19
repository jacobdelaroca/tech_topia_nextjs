import {  NextResponse } from 'next/server';
import { db } from '../../../src/index';
import { passengerNotifTable } from '@/src/db/schema';
import { AREA_LOCATION, Location } from '@/app/_constants/constants';
 
export async function POST(
  req: Request
) {

  const data = await req.json() 
  console.log("data",data);

    const routeId: number = Number(data["routeId"]); 
    const areaId: number = Number(data["areaId"]);
    const lat: number = Number(data["lat"]);
    const lng: number = Number(data["lng"]);

    if(lat < 0 && lng < 0){
      console.log("invalid");
    } else {
      const [area] = AREA_LOCATION.filter((loc: Location) => loc.name === "STI");
      const dist = Math.sqrt(Math.pow(Number(area.coords[0]) - lat, 2) + Math.pow(Number(area.coords[1]) - lng, 2))
      console.log(lat, lng);
      console.log(dist);
    }

    await db.insert(passengerNotifTable).values({
        route: routeId, // Assuming you have a valid route id
        area:  areaId  // Assuming you have a valid area id
        // The `timestamp` will automatically default to the current time
    });

    return NextResponse.json({
      next: routeId
    });
}

