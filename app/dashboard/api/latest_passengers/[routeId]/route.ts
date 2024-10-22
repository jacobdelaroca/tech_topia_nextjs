import { db } from '../../../../../src/index';
import { area, passengerNotifTable} from '../../../../../src/db/schema';
import { and, eq, gte } from 'drizzle-orm';
import { NextResponse } from 'next/server';


export async function GET(request: Request, context: any) {
    try {
        const {params} = context;
        // console.log(params);
        const [routeId, minutes] = params.routeId.split("-");
        const now = new Date();
    
        // Subtract 10 minutes
        const timePeriod = new Date(now.getTime() - Number(minutes) * 60 * 1000);
        const passNotif = await db.select().from(passengerNotifTable).innerJoin(area, eq(area.id, passengerNotifTable.area))
        .where(and(
            gte(passengerNotifTable.timestamp, timePeriod),
            eq(passengerNotifTable.route, Number(routeId))
        )
        )
    
        // console.log(timePeriod);
        // console.log(passNotif);
    
        return NextResponse.json(passNotif);
        
    } catch (error) {
        return NextResponse.json({error});
        
    }
}