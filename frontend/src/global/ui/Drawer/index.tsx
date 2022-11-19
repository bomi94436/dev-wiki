import { Toolbar } from '@mui/material'
import React from 'react'

interface DrawerProps {
  isOpen: boolean
  close: () => void
  children: JSX.Element
}
//
const Drawer: React.FC<DrawerProps> = ({ isOpen, close, children }) => {
  if (isOpen) {
    return (
      <div
        className="absolute top-0 left-0 w-screen h-screen grid grid-rows-[auto_1fr]"
        onClick={close}
      >
        <Toolbar />

        <div className="w-full h-full relative bg-slate-700/20 backdrop-blur-[2px]">
          <section
            className="absolute right-0 top-0 w-[60vw] max-w-[1000px] h-full bg-white border-l border-gray-200 p-10"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </section>
        </div>
      </div>
    )
  } else {
    return null
  }
}

export default Drawer
