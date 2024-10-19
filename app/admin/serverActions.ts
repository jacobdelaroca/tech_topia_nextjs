"use server";

import { db } from '@/src';
import { route, routesToAreas, area} from '@/src/db/schema';
import { eq } from 'drizzle-orm';
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
    const routes = await db.select({id: route.id, name:route.name}).from(route);
    // console.log(areas);
    return routes;

}

export const deleteRoute = async (id: number) => {
    await db.delete(route).where(eq(route.id, id));
}

export const deleteArea = async (id: number) => {
    await db.delete(area).where(eq(area.id, id));

}

export interface Area {
    id: number,
    name: string
}
export interface Route {
    id: number,
    name: string
}
