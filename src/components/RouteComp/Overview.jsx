import React, { useEffect, useState } from 'react'
import "./routeStyle.css"
import nigthView from "../../Assets/night-view.jpg"
import morningView from "../../Assets/morning-view.jpg"
import midnightView from "../../Assets/midnight-view.jpg"
import eveningView from "../../Assets/evening-view.jpg"
import afternoonView from "../../Assets/afternoon-view.jpg"
import { useSelector } from 'react-redux'
import TempCharts from './Overview/TempCharts'
import ConditionDetails from './Overview/ConditionDetails'
import ConditionSmallDetails from './Overview/ConditionSmallDetails'
import clear from "../../Assets/Weather Icons/clear.png"
import cloudyRain from "../../Assets/Weather Icons/cloudy_rainy.png"
import cloudy from "../../Assets/Weather Icons/cloudy.png"
import heavyRainStrom from "../../Assets/Weather Icons/Heavyrain-strom.png"
import nightCloudy from "../../Assets/Weather Icons/night-cloudy.png"
import nightRain from "../../Assets/Weather Icons/night-rain.png"
import night from "../../Assets/Weather Icons/night.png"
import partlyCloudy from "../../Assets/Weather Icons/partly-cloudy.png"
import rain from "../../Assets/Weather Icons/rain.png"
import thunder from "../../Assets/Weather Icons/thunder.png"
import snow from "../../Assets/Weather Icons/snowflake.png"
import fog from "../../Assets/Weather Icons/fog.png"
import wind from "../../Assets/Weather Icons/wind.png"

function Overview() {

    
    const [bgImage, setBgImage] = useState(morningView)
    let [dateTime, setDateTime] = useState("")

    let weatherData = useSelector(state => state.overView)
    

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
            case 0:
                setDateTime(`Sunday, ${dayTime}`)
                break;
            default:
                break;
        }

        console.log(weatherData);

        

    }, [weatherData])

    let showOnPage
    if(Object.keys(weatherData).length === 0){
        showOnPage = <div className='grid place-content-center h-full'> <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                    </div></div>
    }else {

        let hoursConditionArr = weatherData.days[0].hours;
        let hoursCondition = hoursConditionArr.map((ele) => {
            if(ele.icon === "partly-cloudy-day"){
                return {
                    condition: "Partly Cloudy",
                    icon: partlyCloudy
                }
            }else if(ele.icon === "partly-cloudy-night"){
                return {
                    condition: "Partly Cloudy",
                    icon: nightCloudy
                }
            }else if(ele.icon === "clear-day"){
                return {
                    condition: "Clear",
                    icon: clear
                }
            }else if(ele.icon === "clear-night"){
                return {
                    condition: "Clear",
                    icon: night
                }
            }else if(ele.icon === "cloudy"){
                return {
                    condition: "Cloudy",
                    icon: cloudy
                }
            }else if(ele.icon === "showers-day"){
                return {
                    condition: "Rain",
                    icon: cloudyRain
                }
            }else if(ele.icon === "showers-night"){
                return {
                    condition: "Rain",
                    icon: nightRain
                }
            }else if(ele.icon === "rain"){
                return {
                    condition: "Rain",
                    icon: rain
                }
            }else if(ele.icon === "thunder-showers-night"){
                return {
                    condition: "Thunder",
                    icon: thunder
                }
            }else if(ele.icon === "thunder-showers-day"){
                return {
                    condition: "Thunder",
                    icon: thunder
                }
            }else if(ele.icon === "thunder-rain"){
                return {
                    condition: "Thunder Rain",
                    icon: heavyRainStrom
                }
            }else if(ele.icon === "snow"){
                return {
                    condition: "Snow",
                    icon: snow
                }
            }else if(ele.icon === "snow-showers-day"){
                return {
                    condition: "Snow",
                    icon: snow
                }
            }else if(ele.icon === "snow-showers-night"){
                return {
                    condition: "Snow",
                    icon: snow
                }
            }else if(ele.icon === "fog"){
                return {
                    condition: "Fog",
                    icon: fog
                }
            }else if(ele.icon === "wind"){
                return {
                    condition: "Wind",
                    icon: wind
                }
            }
        })
        console.log(hoursCondition);
        

        showOnPage = (
            <div className="flex">
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
                        <ConditionDetails />
                    </div>
                </div>
                <div className=" w-1/2 h-full p-1">
                    <div className="flex justify-between">
                        <ConditionSmallDetails/>
                        <div className="w-[340px] bg-white p-2 rounded-lg border-2 border-slate-400">


                            
                        </div>
                    </div>
                    <div className="temp-cont w-full p-2 mt-3 ml-1 bg-white rounded-xl">
                        <TempCharts/>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='bg-[#b6e4ff] flex-1 px-2 mt-2 border'>
            {showOnPage}
        </div>
    )
}

export default Overview