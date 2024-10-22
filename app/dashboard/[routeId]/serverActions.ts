"use server";
import { db } from '@/src';
import { route } from '@/src/db/schema';
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

