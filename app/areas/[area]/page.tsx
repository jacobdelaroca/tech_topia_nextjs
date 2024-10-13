import { eq } from 'drizzle-orm';
import React from 'react'
import { db } from '../../../src/index';
import { route, routesToAreas, area} from '../../../src/db/schema';
import ClientSubmit from '../_components/ClientSubmit';

const Area = async ({params}: {
    params: {area: string}
}) => {
    const area_name = await db
    .select()
    .from(area)
    .where(eq(area.name, params.area))
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
    }

    // const submitForm = async (data: FormData) => {
    //     "use server";
    //     const routeId: number = Number(data.get("route-id")); 
    //     const areaId: number = Number(data.get("area-id")); 
    //     await db.insert(passengerNotifTable).values({
    //         route: routeId, // Assuming you have a valid route id
    //         area:  areaId  // Assuming you have a valid area id
    //         // The `timestamp` will automatically default to the current time
    //     });
    //     redirect(`/destination/${routeId}`, RedirectType.push);
    //     // window.location.href = `/destination/${routeId}`;
    // }
    

    return (
    <div>
      {/* {routesForArea.map((route: any) => {
        return(
            <form key={route.id} action={submitForm} >
                <input type="hidden" name="area-id"  value={areaId}/>
                <input type="hidden" name="route-id" value={route.route_id}/>
                <input type="submit" value={route.route_name} className='w-10 h-5 border bg-green-400'/>
            </form>
        )
      })} */}
      <ClientSubmit routes={routesForArea} areaId={String(areaId)}></ClientSubmit>
    </div>
  )
}

export default Area
