import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import "./comp.css"
import { updateLocation, updateOverview } from '../Redux Slicer/Weather State/WeatherStateSlice'
import { useDispatch, useSelector } from 'react-redux'
import currLocation from ".././Assets/gps.png"

function NavBar() {

    const [currentLoc, setCurrentLoc] = useState("")

    const [address, setAddress] = useState("")
    const [toogle, setToogle] = useState(true)
    const [weatherData, setWeatherData] = useState({})
    const dispathch = useDispatch()
    // const cood = useSelector(state => state.coordinates)

    const Weatherkey = process.env.REACT_APP_WEATHER_KEY1

    async function getWeatherData(param){
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${param}/today?unitGroup=metric&include=hours%2Cdays%2Calerts%2Ccurrent&key=${Weatherkey}&contentType=json`)
        if(!response.ok){
            alert("Error")
            return weatherData
        }else{
            const data = await response.json()
            return data
        }
    }

    useEffect(() => {

        function gotLocation(position){
            setCurrentLoc(`${position.coords.latitude}, ${position.coords.longitude}`)
        }

        navigator.geolocation.getCurrentPosition(gotLocation)
      
        const getCurrentLocation = async () => {
            let data = await getWeatherData(currentLoc)
            setWeatherData(data)
            setAddress("")
        }
        
        getCurrentLocation()
    }, [toogle, currentLoc])

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
            <p className='text-4xl font-bold text-center sm:hidden mt-2 text-[#9625ff]'>TerrainState</p>
            <div className="bg-sky-400 p-4 m-2 rounded-md shadow">
                <div className=" flex justify-between items-center">
                    <div className=" flex items-center gap-2">
                        {/* Search input for entering location */}
                        <div className=" sm:w-[420px] w-full flex rounded overflow-hidden">
                            <input className=' w-full px-2 py-1 sm:text-xl text-lg outline-none border-none' type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <button 
                                className=' px-4 bg-[#9625ff] active:bg-[#813ccf] text-white'
                                onClick={getSearchLocation}
                            >Search</button>
                        </div>
                        {/* Current location button for get users current location */}
                        <button
                            onClick={() => setToogle((prev) => !prev)}
                        className=' px-1 py-1 bg-[#9625ff] active:bg-[#813ccf] rounded-full text-lg text-white shadow-lg border-black'>
                            <img className='w-10' src={currLocation} alt="" />
                        </button>
                    </div>

                    <p className='text-4xl text-white font-bold hidden sm:block'>TerrainState</p>
                </div>
            </div>
            <div className="px-2 flex items-center justify-center sm:justify-normal gap-5 flex-wrap">
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
            </div>
        </>
    )
}

export default NavBar