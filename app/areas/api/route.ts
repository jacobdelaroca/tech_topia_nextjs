import { NextResponse } from 'next/server';
import { db } from '../../../src/index';
import { area, passengerNotifTable } from '@/src/db/schema';
import { MAXIMUM_DISTANCE } from '@/app/_constants/constants';
import { eq } from 'drizzle-orm';

export async function POST(
  req: Request
) {

  const data = await req.json()
  console.log("data", data);

  const routeId: number = Number(data["routeId"]);
  const areaId: number = Number(data["areaId"]);
  const lat: number = Number(data["lat"]);
  const lng: number = Number(data["lng"]);

  const areaRes = await db.select().from(area).where(eq(area.id, areaId)).limit(1);
  const areaItem = areaRes[0];

  if (lat < 0 && lng < 0) {
    console.log("invalid");
  } else {
    const dist = Math.sqrt(Math.pow(Number(areaItem.lat) - lat, 2) + Math.pow(Number(areaItem.lng) - lng, 2));

    console.log("distance", dist);
    if (dist > MAXIMUM_DISTANCE) {
      console.log("area too far", dist);
      const res =  NextResponse.json({
        error: "error"
      });
      res.cookies.set("request-success", "false")
      return res;
    }
    
    await db.insert(passengerNotifTable).values({
      route: routeId, // Assuming you have a valid route id
      area: areaId  // Assuming you have a valid area id
      // The `timestamp` will automatically default to the current time
    });
  }
  
  const res = NextResponse.json({
    next: routeId
  });
  res.cookies.set("request-success", "true");
  return res;
}

