"use server";

import { db } from '@/src';
import { route, routesToAreas, area} from '@/src/db/schema';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export const addRoute = async (data: FormData) => {
    const name = (data.get("name") as string).toUpperCase(); 
    const lat = data.get("lat") as string; 
    const lng = data.get("lng") as string;
    
    await db.insert(route).values({
        name: name,
        lat: lat,
        lng: lng
    })
    revalidatePath("/");
}
export const addArea = async (data: FormData) => {
    const name = (data.get("name") as string).toUpperCase(); 
    const lat = data.get("lat") as string; 
    const lng = data.get("lng") as string;
    
    await db.insert(area).values({
        name: name,
        lat: lat,
        lng: lng
    })
    revalidatePath("/");
    
}
export const addAreaToRoute = async (data: FormData) => {
    await db.insert(routesToAreas).values({
        areaId: Number(data.get("area")),
        routeId: Number(data.get("route"))
    })
}
export const getAreas = async () => {
    const areas = await db.select({id: area.id, name:area.name}).from(area);
    // console.log(areas);
    return areas;
}
export const getRoutes = async () => {
    const routes:Route[] = await db.select().from(route);
    // console.log(areas);
    return routes;
    
}

export const getRoutesWithAreas = async () => {
    const areasAssociation = await db.select()
    .from(routesToAreas)
    .fullJoin(area, eq(area.id, routesToAreas.areaId))
    .fullJoin(route, eq(route.id, routesToAreas.routeId));
    const routesWithAreas = reduceRoutes(areasAssociation);
    console.log(JSON.stringify(routesWithAreas));
    return routesWithAreas;
}


export const deleteAreaAssociation = async (routeId: number, areaId: number) => {
    await db.delete(routesToAreas)
    .where(
        and(
            eq(routesToAreas.areaId, areaId),
            eq(routesToAreas.routeId, routeId)
        )
    );
    revalidatePath("/");
}

export const deleteRoute = async (id: number) => {
    await db.delete(route).where(eq(route.id, id));
    revalidatePath("/");
}

export const deleteArea = async (id: number) => {
    await db.delete(area).where(eq(area.id, id));
    revalidatePath("/");

}
export interface Route {
    id: number;
    name: string;
    lat: string;
    lng: string;
    areas?: Area[];
  }
  
export interface Area {
    id: number;
    name: string;
    lat: string;
    lng: string;
  }
  
export interface RouteToArea {
    route: {
        name: string;
        id: number;
        lat: string;
        lng: string;
    } | null;
    area: {
        name: string;
        id: number;
        lat: string;
        lng: string;
    } | null;
    routes_to_areas: {
        routeId: number;
        areaId: number;
    } | null;
}
  
function reduceRoutes(data: RouteToArea[]): Route[] {
    return data.reduce((acc: Route[], item) => {
      if (!item.routes_to_areas || !item.route || !item.area) return acc;
  
      const { routeId } = item.routes_to_areas;
      const { route, area } = item;
  
      // Find if the route already exists in the accumulator
      const existingRoute = acc.find(r => r.id === routeId);
  
      if (existingRoute) {
        // If the route exists, push the new area
        existingRoute.areas?.push(area);
      } else {
        // If the route doesn't exist, create a new route with the area
        acc.push({
          id: route.id,
          name: route.name,
          lat: route.lat,
          lng: route.lng,
          areas: [area],
        });
      }
  
      return acc;
    }, []);
  }
