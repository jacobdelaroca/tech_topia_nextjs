import { eq } from 'drizzle-orm';
import { route, area, routesToAreas} from '../../src/db/schema';
import { db } from '../../src/index';

export default async function TestComp() {

    // First, find the routeId for "Route A"
    const routeA = await db
    .select()
    .from(route)
    .where(eq(route.name, 'Route A'))
    .limit(1); // Assuming route names are unique

    if (routeA.length > 0) {
    const routeAId = routeA[0].id;

    // Now, query all areas associated with Route A
    const areasForRouteA = await db
    .select({
        areaId: area.id,
        areaName: area.name
    })
    .from(routesToAreas)
    .innerJoin(area, eq(area.id, routesToAreas.areaId)) // Join areas
    .where(eq(routesToAreas.routeId, routeAId));        // Filter by Route A's ID

    console.log(areasForRouteA);
    } else {
    console.log("Route A not found");
    }

    
    // const currrentDateTime: Date = new Date();
    // const twoHoursAge: Date = new Date();
    // twoHoursAge.setHours(currrentDateTime.getHours() - 5);
    // const passNotif = await db.select().from(passengerNotifTable).where(gte(passengerNotifTable.timestamp, twoHoursAge));
    // console.log(passNotif);
    return (
        <div className='w-full'>
            <h1 className="text-xl mx-auto">TEST</h1>
            {/* {passNotif.map(notif => <p key={notif.id}>{`id: ${notif.id} \n area: ${notif.area} \n route: ${notif.route} \n time: ${notif.timestamp} \n`}</p>)} */}
        </div>
    )
}