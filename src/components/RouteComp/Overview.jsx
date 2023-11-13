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
import sunrise from "../../Assets/Weather Icons/sunrise.png"
import sunset from "../../Assets/Weather Icons/sunset.png"
import maxtemp from "../../Assets/Weather Icons/max-temp.png"
import mintemp from "../../Assets/Weather Icons/min-temp.png"
import { useSelector } from 'react-redux'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot, Line, LineChart, Legend, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

function Overview() {

    
    const [bgImage, setBgImage] = useState(morningView)
    let [dateTime, setDateTime] = useState("")
    let [chart, setChart] = useState("area")
    
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setChart(value)
    };

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

        
        let rise = weatherData.days[0].sunrise.split(":")
        let sunrise1 = `${rise[0]}:${rise[1]}AM`

        let set = weatherData.days[0].sunset.split(":")
        if(set[0] > 12) set[0] = Number(set[0]) - 12
        let sunset1 = `${set[0] < 10 ? "0"+set[0] : set[0]}:${set[1]}PM`

        let dayHours = weatherData.days[0].hours
        let hourT = dayHours.map((ele) => {
            let eleTime = Number(ele.datetime.split(":")[0]) + 1
            let median = "AM"
            if(eleTime > 12){
                eleTime -= 12
                median = "PM"
            }
            return {
                hour: eleTime+" "+median,
                temp: ele.temp
            }
        })
        

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
                <div className=" w-1/2 h-full p-1">
                    <div className="flex w-[400px] p-4 h-72 bg-white border-2 border-slate-400 rounded-lg">
                        <div className="w-1/2 p-3 flex flex-col justify-around h-full">
                            <div className=" flex items-center gap-6">
                                <img className='w-12' src={sunrise} alt="" />
                                <div className="">
                                    <p className='text-lg font-semibold'>Sunrise</p>
                                    <p className=' text-xl font-bold'>{sunrise1}</p>
                                </div>
                            </div>
                            <div className=" flex items-center gap-6">
                                <img className='w-12' src={sunset} alt="" />
                                <div className="">
                                    <p className='text-lg font-semibold'>Sunset</p>
                                    <p className=' text-xl font-bold'>{sunset1}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 p-3 flex flex-col justify-around h-full">
                            <div className=" flex items-center gap-6">
                                <img className='w-12' src={maxtemp} alt="" />
                                <div className="">
                                    <p className='text-lg font-semibold'>Max Temp</p>
                                    <p className=' text-xl font-bold'>{weatherData.days[0].tempmax}°C</p>
                                </div>
                            </div>
                            <div className=" flex items-center gap-6">
                                <img className='w-12' src={mintemp} alt="" />
                                <div className="">
                                    <p className='text-lg font-semibold'>Min Temp</p>
                                    <p className=' text-xl font-bold'>{weatherData.days[0].tempmin}°C</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-2 mt-3 ml-1 border-l-2 border-gray-400">
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 mb-10 items-center">
                                <div className="w-[2px] h-6 bg-black"></div>
                                <p className='text-xl font-bold'>All Day Temperature</p>
                            </div>
                            <div>
                            <Select
                                defaultValue="area"
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'area',
                                        label: 'Area Charts',
                                    },
                                    {
                                        value: 'line',
                                        label: 'Line Charts',
                                    },
                                    {
                                        value: 'bar',
                                        label: 'Bar Charts',
                                    },
                                ]}
                            />
                            </div>
                        </div>
                        <div className=" ">
                            {
                                chart === "area" ? (
                                    <ResponsiveContainer width="100%" height={230}>
                                    <AreaChart data={hourT}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="10%" stopColor="#8884d8" stopOpacity={1}/>
                                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                            </linearGradient>
                                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#82ca9d" stopOpacity={1}/>
                                                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <XAxis dataKey="hour" />
                                        <YAxis/>
                                        <ReferenceDot r={20} fill="red" stroke="none" />
                                        <CartesianGrid strokeDasharray="0 1" />
                                        <Tooltip />
                                        <Area type="monotone" dataKey="temp" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                                        {/* <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" /> */}
                                    </AreaChart>
                                    </ResponsiveContainer>
                                ) : chart === "line" ? (
                                    <ResponsiveContainer width="100%" height={230}>
                                    <LineChart width={730} height={230} data={hourT}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="2 3" />
                                        <XAxis dataKey="hour" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="temp" stroke="#8884d8" />
                                    </LineChart>
                                    </ResponsiveContainer>
                                ) : chart === "bar" ? (
                                    <ResponsiveContainer width="100%" height={230}>
                                    <BarChart width={730} height={230} data={hourT}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="1 3" />
                                        <XAxis dataKey="hour" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="temp" fill="#ae57ff" />
                                    </BarChart>
                                    </ResponsiveContainer>
                                ) : ("")
                            }
                            
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