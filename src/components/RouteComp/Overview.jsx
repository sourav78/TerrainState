import React, { useEffect, useState } from 'react'
import "./routeStyle.css"
import nigthView from "../../Assets/night-view.jpg"
import morningView from "../../Assets/morning-view.jpg"
import midnightView from "../../Assets/midnight-view.jpg"
import eveningView from "../../Assets/evening-view.jpg"
import afternoonView from "../../Assets/afternoon-view.jpg"
import humidity from "../../Assets/Weather Icons/humidity.png"
import wind from "../../Assets/Weather Icons/wind-speed.png"
import feel from "../../Assets/Weather Icons/feelslike.png"
import uv from "../../Assets/Weather Icons/uv.png"
import pressure from "../../Assets/Weather Icons/air-pressure.png"
import visibility from "../../Assets/Weather Icons/eye.png"
import dew from "../../Assets/Weather Icons/dew.png"
import snow from "../../Assets/Weather Icons/snow.png"
import windDir from "../../Assets/Weather Icons/wind-direction.png"
import { useSelector } from 'react-redux'

function Overview() {

    const [bgImage, setBgImage] = useState(morningView)
    let [dateTime, setDateTime] = useState("")
    
    let weatherData = useSelector(state => state.overView)
    
    let uvState = ""
    let windDirection

    useEffect(() => {
        let date = new Date()
        let hours = date.getHours()

        if(hours >= 4 && hours <12){
            setBgImage(morningView)
        }else if(hours >= 12 && hours <17){
            setBgImage(afternoonView)
        }else if(hours >= 17 && hours <19){
            setBgImage(eveningView)
        }else if(hours >= 19 && hours <24){
            setBgImage(nigthView)
        }else if(hours >= 0 && hours <4){
            setBgImage(midnightView)
        }

        let median = "AM"
        if(hours > 12){
            hours -= 12
            median = "PM"
        }
        let min = date.getMinutes()

        let dayTime = `${hours < 10 ? "0"+hours : hours}.${min < 10 ? "0"+min : min} ${median}`

        switch (date.getDay()) {
            case 1:
                setDateTime(`Monday, ${dayTime}`)
                break;
            case 2:
                setDateTime(`Tuesday, ${dayTime}`)
                break;
            case 3:
                setDateTime(`Wednesday, ${dayTime}`)
                break;
            case 4:
                setDateTime(`Thurseday, ${dayTime}`)
                break;
            case 5:
                setDateTime(`Friday, ${dayTime}`)
                break;
            case 6:
                setDateTime(`Saturday, ${dayTime}`)
                break;
            case 7:
                setDateTime(`Sunday, ${dayTime}`)
                break;
            default:
                break;
        }

        

        console.log(weatherData);

    }, [weatherData])

    let showOnPage
    if(Object.keys(weatherData).length === 0){
        showOnPage= <div className='grid place-content-center h-full'> <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                            <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span
                        >
                    </div></div>
    }else {

        if (weatherData.currentConditions.uvindex <= 2) {
            uvState = "Low"
        }else if(weatherData.currentConditions.uvindex >= 2 &&weatherData.currentConditions.uvindex < 6){
            uvState = "Moderate"
        }else if(weatherData.currentConditions.uvindex >= 6 &&weatherData.currentConditions.uvindex < 8){
            uvState = "High"
        }else if(weatherData.currentConditions.uvindex >= 8 &&weatherData.currentConditions.uvindex < 11){
            uvState = "Very high"
        }else if(weatherData.currentConditions.uvindex >= 11){
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

        showOnPage = (
            <div className=" w-1/2 p-1 h-full">

                <div className=" w-full p-1 h-72 rounded-lg flex items-end"
                    style={{
                        backgroundImage: `url("${bgImage}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className=" flex justify-between items-end w-full m-3">
                        <div className="">
                            <p className='text-7xl font-semibold text-[#ffffffc7] text-sky-100'>{weatherData.currentConditions.temp}°</p>
                            <p className=' text-xl text-white font-semibold'>{weatherData.resolvedAddress}</p>
                        </div>
                        <div className="">
                            <p className=' text-xl text-white font-semibold'>{dateTime}</p>
                            <p className=' text-xl text-white font-semibold'>{weatherData.currentConditions.conditions}</p>
                        </div>
                    </div>

                </div>

                <div className="w-full mt-2">
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
                </div>

            </div>
        )
    }

    return (
        <div className='bg-white flex-1 p-1 m-2 border'>
            {showOnPage}
        </div>
    )
}

export default Overview