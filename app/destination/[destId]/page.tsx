import React from 'react'

interface DestId{
    destId: string
}

const Destination = ({params}: any) => {
  return (
    <div>
      {params.destId}
    </div>
  )
}

export default Destination
