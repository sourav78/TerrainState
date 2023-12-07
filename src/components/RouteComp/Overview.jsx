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
import HoursCondition from './Overview/HoursCondition'

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

        showOnPage = (
            <div className="px-2 bg-[#d7f1ff]">
                <div className="flex flex-col sm:flex-row">
                    <div className=" sm:w-1/2 w-full p-1 h-full">

                        <div className=" w-full p-1 sm:h-72 h-48 rounded-lg flex items-end"
                            style={{
                                backgroundImage: `url("${bgImage}")`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        >
                            <div className=" flex justify-between items-end w-full m-3">
                                <div className="">
                                    <p className='sm:text-7xl text-5xl font-semibold text-[#ffffffc7] text-sky-100'>{weatherData.currentConditions.temp}°</p>
                                    <p className=' sm:text-xl text-lg text-white font-semibold'>{weatherData.resolvedAddress}</p>
                                </div>
                                <div className="">
                                    <p className=' sm:text-xl text-lg text-white font-semibold'>{dateTime}</p>
                                    <p className=' sm:text-xl text-lg text-white font-semibold'>{weatherData.currentConditions.conditions}</p>
                                </div>
                            </div>

                        </div>

                        <div className="w-full mt-2">
                            <ConditionDetails />
                        </div>
                    </div>
                    <div className=" sm:w-1/2 w-full h-full p-1">
                        <div className="flex flex-wrap justify-between gap-3 2xl:gap-0">
                            <ConditionSmallDetails/>
                            <div className="xl:w-[340px] w-full bg-white overflow-y-scroll no-scrollbar h-72 p-2 rounded-lg border-2 border-slate-400">
                                <HoursCondition/>
                            </div>
                        </div>
                        <div className="temp-cont w-full p-2 mt-3 ml-1 bg-white rounded-xl">
                            <TempCharts/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className=' flex-1 mt-4 border'>
            {showOnPage}
        </div>
    )
}

export default Overview