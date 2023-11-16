import React from 'react'
import { useSelector } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import clear from "../../../Assets/Weather Icons/clear.png"
import cloudyRain from "../../../Assets/Weather Icons/cloudy_rainy.png"
import cloudy from "../../../Assets/Weather Icons/cloudy.png"
import heavyRainStrom from "../../../Assets/Weather Icons/Heavyrain-strom.png"
import nightCloudy from "../../../Assets/Weather Icons/night-cloudy2.png"
import nightRain from "../../../Assets/Weather Icons/night-rain.png"
import night from "../../../Assets/Weather Icons/night.png"
import partlyCloudy from "../../../Assets/Weather Icons/sunny.png"
import rain from "../../../Assets/Weather Icons/rain.png"
import thunder from "../../../Assets/Weather Icons/thunder.png"
import snow from "../../../Assets/Weather Icons/snowflake.png"
import fog from "../../../Assets/Weather Icons/fog.png"
import wind from "../../../Assets/Weather Icons/wind.png"

function HoursCondition() {

    let weatherData = useSelector(state => state.overView)

    let hoursConditionArr = weatherData.days[0].hours;
    let hoursArr = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"]
    let hoursCondition = hoursConditionArr.map((ele) => {
        if (ele.icon === "partly-cloudy-day") {
            return {
                condition: "Partly Cloudy",
                icon: partlyCloudy
            }
        } else if (ele.icon === "partly-cloudy-night") {
            return {
                condition: "Partly Cloudy",
                icon: nightCloudy
            }
        } else if (ele.icon === "clear-day") {
            return {
                condition: "Clear",
                icon: clear
            }
        } else if (ele.icon === "clear-night") {
            return {
                condition: "Clear",
                icon: night
            }
        } else if (ele.icon === "cloudy") {
            return {
                condition: "Cloudy",
                icon: cloudy
            }
        } else if (ele.icon === "showers-day") {
            return {
                condition: "Rain",
                icon: cloudyRain
            }
        } else if (ele.icon === "showers-night") {
            return {
                condition: "Rain",
                icon: nightRain
            }
        } else if (ele.icon === "rain") {
            return {
                condition: "Rain",
                icon: rain
            }
        } else if (ele.icon === "thunder-showers-night") {
            return {
                condition: "Thunder",
                icon: thunder
            }
        } else if (ele.icon === "thunder-showers-day") {
            return {
                condition: "Thunder",
                icon: thunder
            }
        } else if (ele.icon === "thunder-rain") {
            return {
                condition: "Thunder Rain",
                icon: heavyRainStrom
            }
        } else if (ele.icon === "snow") {
            return {
                condition: "Snow",
                icon: snow
            }
        } else if (ele.icon === "snow-showers-day") {
            return {
                condition: "Snow",
                icon: snow
            }
        } else if (ele.icon === "snow-showers-night") {
            return {
                condition: "Snow",
                icon: snow
            }
        } else if (ele.icon === "fog") {
            return {
                condition: "Fog",
                icon: fog
            }
        } else if (ele.icon === "wind") {
            return {
                condition: "Wind",
                icon: wind
            }
        }
    })

    return (
        <>
            <div className=" w-full flex flex-wrap justify-around xl:justify-start items-start gap-2">
                {
                    hoursCondition.map((ele, ind) => (
                        <div key={nanoid()} className=" px-1 py-2 max-w-[100px] w-full min-h-[110px] h-full border-2 border-slate-400 rounded-lg flex flex-col items-center justify-between leading-[8px]">
                            <p className=''>{hoursArr[ind]}</p>
                            <img className='w-16' src={ele.icon} alt="" />
                            <p className='text-sm'>{ele.condition}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default HoursCondition