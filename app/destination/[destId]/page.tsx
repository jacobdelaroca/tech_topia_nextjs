import React from 'react'
import { db } from '../../../src/index';
import { route} from '../../../src/db/schema';
import { eq } from 'drizzle-orm';

const Destination = async ({params}: {params: {destId: string}}) => {
  const route_name = await db
    .select()
    .from(route)
    .where(eq(route.id, Number(params.destId)))
    .limit(1); // Assuming route names are unique
  return (
    <div>
      {route_name[0].name}
    </div>
  )
}

export default Destination
