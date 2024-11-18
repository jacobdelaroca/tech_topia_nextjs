"use server";

import { eq, and, gte, lt } from 'drizzle-orm';
import { db } from '@/src';  // Assuming db is your Drizzle ORM setup
import { passengerNotifTable } from '@/src/db/schema';  // Assuming 'requests' is your table schema
import { format, subHours, startOfDay } from 'date-fns';

export interface HourlyRequestCount {
    name: string;
    count: number;
}

export async function getHourlyRequestCounts(date: string, Id: number, table: string): Promise<HourlyRequestCount[]> {
    // Start and end timestamps for the day
    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);

    // Build the query based on areaId or routeId
    const whereClause = and(
        gte(passengerNotifTable.timestamp, startOfDay),
        lt(passengerNotifTable.timestamp, endOfDay),
        (table === "area") ? eq(passengerNotifTable.area, Id) : eq(passengerNotifTable.route, Id)
    );

    // Query to get the timestamps
    const result = await db.select({
        timestamp: passengerNotifTable.timestamp,
    }).from(passengerNotifTable).where(whereClause);

    // Create an array with 24 elements, each representing a count for an hour (0-23)
    const hourlyCounts = Array(24).fill(0);

    result.forEach(row => {
        if (row.timestamp) {
            const hour = new Date(row.timestamp).getHours();
            hourlyCounts[hour]++;
        }
    });

    // Format the data into the desired structure
    const formattedResult: HourlyRequestCount[] = hourlyCounts.map((count, hour) => ({
        name: format(new Date(`${date}T${String(hour).padStart(2, '0')}:00:00`), 'HH:00'),
        count,
    }));

    return formattedResult;
}

// Usage example:

const areaIds = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71];
const routeIds = [32, 34, 35, 36, 50, 48, 49];

// Function to generate random data for the last 2 months
export async function generateRandomData() {
    const now = new Date();
      const startDate = subHours(now, 60 * 24); // 2 months ago
    // const startDate = subHours(now, 48); // 2 months ago
    let currentHour = startOfDay(startDate); // Start from the beginning of the first day

    while (currentHour <= now) {
        
        // Generate a random number of requests for this hour (let's say between 1 to 20)
        const requestCount = Math.floor(Math.random() * 40) + 40;
        
        const requestsData = Array.from({ length: requestCount }, () => {
            
            const areaOrRouteId =
            {
                area: areaIds[Math.floor(Math.random() * areaIds.length)],
                route: routeIds[Math.floor(Math.random() * routeIds.length)]
            };
            return {
                timestamp: currentHour,
                ...areaOrRouteId
            }
        }
        );
        console.log(currentHour);

        // Insert into the passengerNotifTable
        await db.insert(passengerNotifTable).values(requestsData).execute();

        // Move to the next hour
        currentHour = subHours(currentHour, -1); // Advance by 1 hour
    }
}
