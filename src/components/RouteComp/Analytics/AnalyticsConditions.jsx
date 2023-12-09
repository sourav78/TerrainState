import React from 'react'
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
import { nanoid } from '@reduxjs/toolkit';

function AnalyticsConditions({weatherData, selectQuery}) {

    let conditionData

    if (selectQuery === "today" || selectQuery === "tomorrow" || selectQuery === "yesterday") {
        conditionData = weatherData.days[0].hours.map(ele => {
            if (ele.icon === "partly-cloudy-day") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Partly Cloudy",
                    icon: partlyCloudy
                }
            } else if (ele.icon === "partly-cloudy-night") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Partly Cloudy",
                    icon: nightCloudy
                }
            } else if (ele.icon === "clear-day") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Clear",
                    icon: clear
                }
            } else if (ele.icon === "clear-night") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Clear",
                    icon: night
                }
            } else if (ele.icon === "cloudy") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Cloudy",
                    icon: cloudy
                }
            } else if (ele.icon === "showers-day") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Rain",
                    icon: cloudyRain
                }
            } else if (ele.icon === "showers-night") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Rain",
                    icon: nightRain
                }
            } else if (ele.icon === "rain") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Rain",
                    icon: rain
                }
            } else if (ele.icon === "thunder-showers-night") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Thunder",
                    icon: thunder
                }
            } else if (ele.icon === "thunder-showers-day") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Thunder",
                    icon: thunder
                }
            } else if (ele.icon === "thunder-rain") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Thunder Rain",
                    icon: heavyRainStrom
                }
            } else if (ele.icon === "snow") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Snow",
                    icon: snow
                }
            } else if (ele.icon === "snow-showers-day") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Snow",
                    icon: snow
                }
            } else if (ele.icon === "snow-showers-night") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Snow",
                    icon: snow
                }
            } else if (ele.icon === "fog") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Fog",
                    icon: fog
                }
            } else if (ele.icon === "wind") {
                return {
                    datetime: Number(ele.datetime.split(":")[0]) + 1,
                    condition: "Wind",
                    icon: wind
                }
            }
        })
    } else {

        conditionData = weatherData.days.map(ele => {
            if (ele.icon === "partly-cloudy-day") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Partly Cloudy",
                    icon: partlyCloudy
                }
            } else if (ele.icon === "partly-cloudy-night") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Partly Cloudy",
                    icon: nightCloudy
                }
            } else if (ele.icon === "clear-day") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Clear",
                    icon: clear
                }
            } else if (ele.icon === "clear-night") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Clear",
                    icon: night
                }
            } else if (ele.icon === "cloudy") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Cloudy",
                    icon: cloudy
                }
            } else if (ele.icon === "showers-day") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Rain",
                    icon: cloudyRain
                }
            } else if (ele.icon === "showers-night") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Rain",
                    icon: nightRain
                }
            } else if (ele.icon === "rain") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Rain",
                    icon: rain
                }
            } else if (ele.icon === "thunder-showers-night") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Thunder",
                    icon: thunder
                }
            } else if (ele.icon === "thunder-showers-day") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Thunder",
                    icon: thunder
                }
            } else if (ele.icon === "thunder-rain") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Thunder Rain",
                    icon: heavyRainStrom
                }
            } else if (ele.icon === "snow") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Snow",
                    icon: snow
                }
            } else if (ele.icon === "snow-showers-day") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Snow",
                    icon: snow
                }
            } else if (ele.icon === "snow-showers-night") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Snow",
                    icon: snow
                }
            } else if (ele.icon === "fog") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Fog",
                    icon: fog
                }
            } else if (ele.icon === "wind") {
                return {
                    datetime: `${ele.datetime.split("-")[1]}/${ele.datetime.split("-")[2]}`,
                    condition: "Wind",
                    icon: wind
                }
            }
        })

    }

    return (
        <>
            <div className=" flex sm:overflow-x-scroll max-h-[280px] overflow-y-scroll flex-wrap sm:flex-nowrap sm:thumb-bar gap-3">
                {
                    conditionData.map(ele => (
                        <div key={nanoid()} className=" px-1 py-2 flex-1 min-w-[100px] w-full min-h-[110px] h-full border-2 border-slate-400 rounded-lg flex flex-col items-center justify-between leading-[8px]">
                            <p className=''>{ele.datetime}</p>
                            <img className='w-16' src={ele.icon} alt="" />
                            <p className='text-sm'>{ele.condition}</p>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default AnalyticsConditions