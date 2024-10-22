import React from 'react'
import { db } from '../../../src/index';
import { route} from '../../../src/db/schema';
import { eq } from 'drizzle-orm';
import BackgroundMobile from '@/app/_components/BackgroundMobile/BackgroundMobile';
import logo from "@/assets/logo.png";
import MobileInfoContainer from '@/app/_components/BackgroundMobile/MobileInfoContainer';

const Destination = async ({params}: {params: {destId: string}}) => {
  const route_name = await db
    .select()
    .from(route)
    .where(eq(route.id, Number(params.destId)))
    .limit(1); // Assuming route names are unique
  return (
    <BackgroundMobile>
    <div className='flex flex-col items-center'>
      <img src={logo.src} className='w-[30%] mb' alt="" />
      {/* {route_name[0].name} */}
      <h2 className='text-xl mt-6'>
        Your request have been sent
      </h2>
      <h2 className='text-xl mt-6'>
        {route_name[0].name}
      </h2>
      <div className='py-3'>
        <MobileInfoContainer title='Route' >
        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil ex velit vel id iste eum enim pariatur adipisci ea facere!</h1>  
        </MobileInfoContainer>
        <MobileInfoContainer title='Rate' >
        <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil ex velit vel id iste eum enim pariatur adipisci ea facere!</h1>  
        </MobileInfoContainer>
      </div>
    </div>
      
    </BackgroundMobile>
  )
}

export default Destination
