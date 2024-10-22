"use server";

import { db } from "@/src"
import {  Area } from "../serverActions"
import { area, passengerNotifTable, routesToAreas } from "@/src/db/schema"
import { and, eq, gte } from "drizzle-orm"


export const setPassReq = async (routeId:number, areaId:number|undefined) => {

    await db.insert(passengerNotifTable).values({
        route: routeId, // Assuming you have a valid route id
        area:  areaId || 0  // Assuming you have a valid area id
        // The `timestamp` will automatically default to the current time
    });
    // console.log("requested", areaId, routeId);
}
export const getAreas = async (routeId:number) => {
    const areasAssociation = await db.select()
    .from(area)
    .fullJoin(routesToAreas, eq(area.id, routesToAreas.areaId))
    .where(eq(routesToAreas.routeId, routeId))
    // const routesWithAreas = reduceRoutes(areasAssociation);
    // console.log(JSON.stringify(routesWithAreas));
    // console.log(areasAssociation);
    return areasAssociation;
}

export const clearPassReq = async () => {
    const dateNow = new Date()
    const startOfDay = new Date(`${dateNow.getFullYear()}-${dateNow.getMonth()+1}-${dateNow.getDate()}T00:00:00`);
    const whereClause = and(
        gte(passengerNotifTable.timestamp, startOfDay),
    );
    await db.delete(passengerNotifTable).where(whereClause);
}

export interface AreaWithRoute
{
    area: Area | null,
    routes_to_areas: { routeId: number, areaId: number } | null
}
