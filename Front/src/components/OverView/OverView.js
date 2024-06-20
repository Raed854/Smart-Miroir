import React from 'react'
import "./overView.css"
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'

import { Outlet } from "react-router";


const OverView = () => {


  return (
    <div className='overview' >
        <NavBar/>
        <SideBar/>
        <div className='usersList'>
            <Outlet />
        </div>
    </div>
  )
}

export default OverView