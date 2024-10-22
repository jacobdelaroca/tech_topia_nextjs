import { eq } from 'drizzle-orm';
import React from 'react'
import { db } from '../../../src/index';
import { route, routesToAreas, area} from '../../../src/db/schema';
import ClientSubmit from '../_components/ClientSubmit';
import { redirect } from 'next/navigation';
import { divStyle } from '@/app/_constants/constants';

const Area = async ({params}: {
    params: {area: string}
}) => {
    try{
        const area_name = await db
        .select()
        .from(area)
        .where(eq(area.id, Number(params.area)))
        .limit(1); // Assuming route names are unique
    
        let routesForArea: any;
        let areaId: number = 0;
    
        if (area_name.length > 0) {
            areaId = area_name[0].id;
    
            // Now, query all areas associated with Route A
            routesForArea = await db
            .select({
                route_name: route.name,
                route_id: route.id
            })
            .from(routesToAreas)
            .innerJoin(route, eq(route.id, routesToAreas.routeId)) // Join areas
            .where(eq(routesToAreas.areaId, areaId));        // Filter by Route A's ID
            console.log(routesForArea);
        } else {
            console.log("Route A not found");
            redirect("/error/routeNotFound");
        }
            return (
            <div style={divStyle}>
            <ClientSubmit routes={routesForArea} areaId={String(areaId)}></ClientSubmit>
            </div>
        )
        
    } catch {
        redirect("/error/routeNotFound");
    }
}

export default Area
