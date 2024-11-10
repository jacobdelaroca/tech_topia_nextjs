"use server";

import { db } from '@/src';
import { route } from '@/src/db/schema';

export const getRoutes = async () => {
    const routes:Route[] = await db.select().from(route);
    // console.log(areas);
    return routes;
    
}
export interface Route {
    id: number;
    name: string;
    lat: string;
    lng: string;
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
  