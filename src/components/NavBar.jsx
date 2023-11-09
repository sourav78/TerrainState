import React from 'react'
import { NavLink } from 'react-router-dom'
import "./comp.css"

function NavBar() {
    return (
        <>
            <div className="bg-sky-400 p-4 m-2 rounded-md shadow">
                <div className=" flex justify-between items-center">
                    <div className=" flex items-center gap-2">
                        <div className=" w-[420px] flex rounded overflow-hidden">
                            <input className=' w-full px-2 py-1 text-xl outline-none border-none' type="text" />
                            <button 
                                className=' px-4 bg-[#9625ff] text-white'
                            >Search</button>
                        </div>
                        <button className=' px-2 py-1 bg-[#9625ff] rounded-full text-lg text-white shadow-lg border-black'>Current Location</button>
                    </div>

                    <p className='text-4xl text-white font-bold'>TerrainState</p>
                </div>
            </div>
            <div className="px-2 flex items-center gap-5">
                <NavLink 
                    to="/"
                    className={({isActive}) => 
                        `route-items min-w-[120px] text-center shadow-md py-2 px-3 text-lg font-semibold rounded-lg ${isActive ? "text-white bg-[#9625ff]" : "text-black bg-white"}`
                    }
                >
                    Overview
                </NavLink>
                <NavLink 
                    to="/analytics"
                    className={({isActive}) => 
                        `route-items min-w-[120px] text-center shadow-md py-2 px-4 text-lg font-semibold rounded-lg ${isActive ? "text-white bg-[#9625ff]" : "text-black bg-white"}`
                    }
                >
                    Analytics
                </NavLink>
                <NavLink 
                    to="/details"
                    className={({isActive}) => 
                        `route-items min-w-[120px] text-center shadow-md py-2 px-4 text-lg font-semibold rounded-lg ${isActive ? "text-white bg-[#9625ff]" : "text-black bg-white"}`
                    }
                >
                    Details
                </NavLink>
                <NavLink 
                    to="/maps"
                    className={({isActive}) => 
                        `route-items min-w-[120px] text-center shadow-md py-2 px-4 text-lg font-semibold rounded-lg ${isActive ? "text-white bg-[#9625ff]" : "text-black bg-white"}`
                    }
                >
                    Maps
                </NavLink>
            </div>
        </>
    )
}

export default NavBar