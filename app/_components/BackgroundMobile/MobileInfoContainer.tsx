import React from 'react'
import Arrow from './Arrow'

interface MyComponentProps {
    title: string;
  }

const MobileInfoContainer: React.FC<React.PropsWithChildren<MyComponentProps>> = ({ children, title }) => {
    return (
        <div className=' flex justify-center w-full my-3'>
            <div className='border-2 p-2 relative border-main min-h-9 w-2/3'>
            <div className='m-2 p-2 bg-main'>
            <div className='h-[35px]'></div>
                {children}
            </div>
            {/* <div className='p-[10px] pl-[20px] text-xl z-50 absolute top-0 left-0'>{title}</div> */}
            <div className='absolute top-[-50px] left-[-50px]'>
                <Arrow title={title}/>
            </div>

            </div>
        </div>
    )
}

export default MobileInfoContainer
