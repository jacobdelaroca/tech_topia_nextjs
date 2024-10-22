import { divStyle } from '@/app/_constants/constants'
import React from 'react'

const BackgroundMobile: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div style={divStyle}>
      {children}
    </div>
  )
}

export default BackgroundMobile
