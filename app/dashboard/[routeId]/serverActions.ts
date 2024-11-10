"use server";
import { db } from '@/src';
import { area, route, routesToAreas } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

export const getRoutesCoord = async (routeId: number) => {
    const routeItem = await db.select().from(route).where(eq(route.id, routeId)).limit(1);
    const coord = [Number(routeItem[0].lat), Number(routeItem[0].lng)];
    return coord; 
}

export const checkRouteId = async (routeId: number) => {
    const routeItem = await db.select().from(route).where(eq(route.id, routeId)).limit(1);
    return (routeItem.length > 0); 
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

export interface Area {
    id: number;
    name: string;
    lat: string;
    lng: string;
  }

export interface AreaWithRoute
{
    area: Area | null,
    routes_to_areas: { routeId: number, areaId: number } | null
}
