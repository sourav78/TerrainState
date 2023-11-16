import React from 'react'
import { useSelector } from 'react-redux'
import sunrise from "../../../Assets/Weather Icons/sunrise.png"
import sunset from "../../../Assets/Weather Icons/sunset.png"
import maxtemp from "../../../Assets/Weather Icons/max-temp.png"
import mintemp from "../../../Assets/Weather Icons/min-temp.png"

function ConditionSmallDetails() {

    
    let weatherData = useSelector(state => state.overView)

    let rise = weatherData.days[0].sunrise.split(":")
    let sunrise1 = `${rise[0]}:${rise[1]}AM`

    let set = weatherData.days[0].sunset.split(":")
    if(set[0] > 12) set[0] = Number(set[0]) - 12
    let sunset1 = `${set[0] < 10 ? "0"+set[0] : set[0]}:${set[1]}PM`

    return (
        <>
            <div className="flex xl:w-[400px] w-full p-4 sm:h-72 bg-white border-2 border-slate-400 rounded-lg">
                <div className="w-1/2 sm:p-3 p-1 gap-4 flex flex-col justify-around h-full">
                    <div className=" flex items-center sm:gap-6 gap-3">
                        <img className='sm:w-12 w-10' src={sunrise} alt="" />
                        <div className="">
                            <p className='sm:text-lg font-semibold'>Sunrise</p>
                            <p className=' sm:text-xl text-lg font-bold'>{sunrise1}</p>
                        </div>
                    </div>
                    <div className=" flex items-center sm:gap-6 gap-3">
                        <img className='sm:w-12 w-10' src={sunset} alt="" />
                        <div className="">
                            <p className='sm:text-lg font-semibold'>Sunset</p>
                            <p className=' sm:text-xl text-lg font-bold'>{sunset1}</p>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 p-3 gap-4 flex flex-col justify-around h-full">
                    <div className=" flex items-center sm:gap-6 gap-3">
                        <img className='sm:w-12 w-10' src={maxtemp} alt="" />
                        <div className="">
                            <p className='sm:text-lg font-semibold'>Max Temp</p>
                            <p className=' sm:text-xl text-lg font-bold'>{weatherData.days[0].tempmax}°C</p>
                        </div>
                    </div>
                    <div className=" flex items-center sm:gap-6 gap-3">
                        <img className='sm:w-12 w-10' src={mintemp} alt="" />
                        <div className="">
                            <p className='sm:text-lg font-semibold'>Min Temp</p>
                            <p className=' sm:text-xl text-lg font-bold'>{weatherData.days[0].tempmin}°C</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConditionSmallDetails