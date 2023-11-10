import React from 'react'
import "./routeStyle.css"
import day from "../../Assets/Weather Icons/night.png"

function Overview() {
  return (
    <div className='bg-white flex-1 h-screen p-2 m-2'>
        Overview
        <img className='w-12' src={day} alt="" />
    </div>
  )
}

export default Overview