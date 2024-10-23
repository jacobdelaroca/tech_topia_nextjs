import React from 'react'
import { db } from '../../../src/index';
import { route} from '../../../src/db/schema';
import { eq } from 'drizzle-orm';
import BackgroundMobile from '@/app/_components/BackgroundMobile/BackgroundMobile';
import logo from "@/assets/logo.png";
import MobileInfoContainer from '@/app/_components/BackgroundMobile/MobileInfoContainer';
import { redirect } from 'next/navigation';
import tagline from "@/assets/tagline.png"

const Destination = async ({params}: {params: {destId: string}}) => {
  try{
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
        <div className='py-3 text-center'>
          <MobileInfoContainer title='Rates' >
          <h1>Regular: 13</h1>  
          <h1>Seniors and Students: 11</h1>  
          <h1>Every Additional KM: 4</h1>  
          </MobileInfoContainer>
          <MobileInfoContainer title='Be Safe' >
          <img src={tagline.src} alt=""  className=''/>
          {/* <h1>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil ex velit vel id iste eum enim pariatur adipisci ea facere!</h1>   */}
          </MobileInfoContainer>
        </div>
      </div>
        
      </BackgroundMobile>
    )
  } catch {
    redirect("error/routeNotFound")
  }
}

export default Destination
