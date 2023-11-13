import React from 'react'
import { useSelector } from 'react-redux'
import humidity from "../../../Assets/Weather Icons/humidity.png"
import wind from "../../../Assets/Weather Icons/wind-speed.png"
import feel from "../../../Assets/Weather Icons/feelslike.png"
import uv from "../../../Assets/Weather Icons/uv.png"
import pressure from "../../../Assets/Weather Icons/air-pressure.png"
import visibility from "../../../Assets/Weather Icons/eye.png"
import dew from "../../../Assets/Weather Icons/dew.png"
import snow from "../../../Assets/Weather Icons/snow.png"
import windDir from "../../../Assets/Weather Icons/wind-direction.png"

function ConditionDetails() {

    let weatherData = useSelector(state => state.overView)

    let uvState = ""
    let windDirection

    if (weatherData.currentConditions.uvindex <= 2) {
        uvState = "Low"
    } else if (weatherData.currentConditions.uvindex >= 2 && weatherData.currentConditions.uvindex < 6) {
        uvState = "Moderate"
    } else if (weatherData.currentConditions.uvindex >= 6 && weatherData.currentConditions.uvindex < 8) {
        uvState = "High"
    } else if (weatherData.currentConditions.uvindex >= 8 && weatherData.currentConditions.uvindex < 11) {
        uvState = "Very high"
    } else if (weatherData.currentConditions.uvindex >= 11) {
        uvState = "Extreme"
    }


    if (weatherData.days[0].winddir >= 337.5 || weatherData.days[0].winddir < 22.5) {
        windDirection = 'North';
    } else if (weatherData.days[0].winddir >= 22.5 && weatherData.days[0].winddir < 67.5) {
        windDirection = 'Northeast';
    } else if (weatherData.days[0].winddir >= 67.5 && weatherData.days[0].winddir < 112.5) {
        windDirection = 'East';
    } else if (weatherData.days[0].winddir >= 112.5 && weatherData.days[0].winddir < 157.5) {
        windDirection = 'Southeast';
    } else if (weatherData.days[0].winddir >= 157.5 && weatherData.days[0].winddir < 202.5) {
        windDirection = 'South';
    } else if (weatherData.days[0].winddir >= 202.5 && weatherData.days[0].winddir < 247.5) {
        windDirection = 'Southwest';
    } else if (weatherData.days[0].winddir >= 247.5 && weatherData.days[0].winddir < 292.5) {
        windDirection = 'West';
    } else if (weatherData.days[0].winddir >= 292.5 && weatherData.days[0].winddir < 337.5) {
        windDirection = 'Northwest';
    }

    return (
        <>
            <div className="flex gap-4 flex-wrap justify-between">
                <div className="morph w-56 h-24 p-2 flex items-center justify-evenly">
                    <img className='w-12' src={humidity} alt="" />
                    <div className="">
                        <p className=' text-xl font-semibold text-white'>Humidity</p>
                        <p className=' text-2xl font-semibold text-white'>{weatherData.currentConditions.humidity}%</p>
                    </div>
                </div>
                <div className="morph w-56 h-24 p-2 flex items-center justify-evenly">
                    <img className='w-12' src={feel} alt="" />
                    <div className="">
                        <p className=' text-xl font-semibold text-white'>Feelslike</p>
                        <p className=' text-2xl font-semibold text-white'>{weatherData.currentConditions.feelslike}°</p>
                    </div>
                </div>
                <div className="morph w-56 h-24 p-2 flex items-center justify-evenly">
                    <img className='w-10' src={wind} alt="" />
                    <div className="">
                        <p className=' text-xl font-semibold text-white'>Wind Speed</p>
                        <p className=' text-2xl font-semibold text-white'>{weatherData.days[0].windspeed} km/h</p>
                    </div>
                </div>
                <div className="morph w-56 h-24 p-2 flex items-center justify-evenly">
                    <img className='w-12' src={uv} alt="" />
                    <div className="">
                        <p className=' text-xl font-semibold text-white'>UV Index</p>
                        <p className=' text-2xl font-semibold text-white'>{weatherData.currentConditions.uvindex} <span className='text-sm'>{uvState}</span></p>
                    </div>
                </div>
                <div className="morph w-56 h-24 p-2 flex items-center justify-evenly">
                    <img className='w-12' src={visibility} alt="" />
                    <div className="">
                        <p className=' text-xl font-semibold text-white'>Visibility</p>
                        <p className=' text-2xl font-semibold text-white'>{weatherData.currentConditions.visibility} km</p>
                    </div>
                </div>
                <div className="morph w-56 h-24 p-2 flex items-center justify-evenly">
                    <img className='w-10' src={dew} alt="" />
                    <div className="">
                        <p className=' text-xl font-semibold text-white'>Dew Point</p>
                        <p className=' text-2xl font-semibold text-white'>{weatherData.currentConditions.dew}</p>
                    </div>
                </div>
                <div className="morph w-56 h-24 p-2 flex items-center justify-evenly">
                    <img className='w-12' src={pressure} alt="" />
                    <div className="">
                        <p className=' text-xl font-semibold text-white'>Air Pressure</p>
                        <p className=' text-2xl font-semibold text-white'>{weatherData.currentConditions.pressure} hPa</p>
                    </div>
                </div>
                <div className="morph w-56 h-24 p-2 flex items-center justify-evenly">
                    <img className='w-12' src={snow} alt="" />
                    <div className="">
                        <p className=' text-xl font-semibold text-white'>Snow</p>
                        <p className=' text-2xl font-semibold text-white'>{weatherData.currentConditions.snow}</p>
                    </div>
                </div>
                <div className="morph w-56 h-24 p-2 flex items-center justify-evenly">
                    <img className='w-10' src={windDir} alt="" />
                    <div className="">
                        <p className=' text-xl font-semibold text-white'>Wind Dir</p>
                        <p className=' text-2xl font-semibold text-white'>{windDirection}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConditionDetails