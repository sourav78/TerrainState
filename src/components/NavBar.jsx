import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import "./comp.css"
import { updateLocation, updateOverview } from '../Redux Slicer/Weather State/WeatherStateSlice'
import { useDispatch, useSelector } from 'react-redux'
import currLocation from ".././Assets/gps.png"

function NavBar() {

    const [address, setAddress] = useState("")
    const [toogle, setToogle] = useState(true)
    const [weatherData, setWeatherData] = useState({})
    const dispathch = useDispatch()
    // const cood = useSelector(state => state.coordinates)

    async function getWeatherData(param){
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${param}/today?unitGroup=metric&include=hours%2Cdays%2Calerts%2Ccurrent&key=58RFYTMSNQM5WXER9BCLRAENU&contentType=json`)
        if(!response.ok){
            alert("Error")
            return weatherData
        }else{
            const data = await response.json()
            return data
        }
    }

    useEffect(() => {
      
        const getCurrentLocation = async () => {
            let data = await getWeatherData("20.2960587, 85.8245398")
            setWeatherData(data)
        }
        
        getCurrentLocation()
    }, [toogle])

    const weath = {
        lon: weatherData.longitude,
        lat: weatherData.latitude
    }

    useEffect(() => {
        dispathch(updateLocation(weath))
        dispathch(updateOverview(weatherData))
    }, [weatherData])
    
    const getSearchLocation = async () => {
        let data = await getWeatherData(address)
        setWeatherData(data)
    }

    return (
        <>
            {/* Main nav bar including search option and current location. */}
            <div className="bg-sky-400 p-4 m-2 rounded-md shadow">
                <div className=" flex justify-between items-center">
                    <div className=" flex items-center gap-2">
                        {/* Search input for entering location */}
                        <div className=" w-[420px] flex rounded overflow-hidden">
                            <input className=' w-full px-2 py-1 text-xl outline-none border-none' type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button 
                                className=' px-4 bg-[#9625ff] text-white'
                                onClick={getSearchLocation}
                            >Search</button>
                        </div>
                        {/* Current location button for get users current location */}
                        <button
                            onClick={() => setToogle((prev) => !prev)}
                        className=' px-1 py-1 bg-[#9625ff] rounded-full text-lg text-white shadow-lg border-black'>
                            <img className='w-10' src={currLocation} alt="" />
                        </button>
                    </div>

                    <p className='text-4xl text-white font-bold'>TerrainState</p>
                </div>
            </div>
            <div className="px-2 flex items-center gap-5">
                {/* Router links or navigation for navigate within the page */}
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