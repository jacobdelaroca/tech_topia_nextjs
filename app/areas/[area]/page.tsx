import { eq } from 'drizzle-orm';
import React from 'react'
import { db } from '../../../src/index';
import { route, routesToAreas, area} from '../../../src/db/schema';

const Area = async ({params}: any) => {
    const area_name = await db
    .select()
    .from(area)
    .where(eq(area.name, params.area))
    .limit(1); // Assuming route names are unique

    let routesForArea: any;
    let areaId: any;

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
    }

    return (
    <div>
      {routesForArea.map((route: any) => {
        return(
            <>
            <a  href={`/destination/${String(areaId + "-" +route.route_id)}`}>
                <button key={route.route_id} className="p-4 border bg-cyan-300 min-w-24" type="button">
                    {route.route_name}
                </button>
            </a>
            </>
        )
      })}
    </div>
  )
}

export default Area
