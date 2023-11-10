import React, { useEffect, useState } from 'react'
import "./routeStyle.css"
import nigthView from "../../Assets/night-view.jpg"
import morningView from "../../Assets/morning-view.jpg"
import midnightView from "../../Assets/midnight-view.jpg"
import eveningView from "../../Assets/evening-view.jpg"
import afternoonView from "../../Assets/afternoon-view.jpg"
import { useSelector } from 'react-redux'

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

        switch (date.getDay()) {
            case 1:
                setDateTime(`Monday, ${hours < 10 ? "0"+hours : hours}.${min < 10 ? "0"+min : min} ${median}`)
                break;
            case 2:
                setDateTime(`Tuesday, ${hours < 10 ? "0"+hours : hours}.${min < 10 ? "0"+min : min} ${median}`)
                break;
            case 3:
                setDateTime(`Wednesday, ${hours < 10 ? "0"+hours : hours}.${min < 10 ? "0"+min : min} ${median}`)
                break;
            case 4:
                setDateTime(`Thurseday, ${hours < 10 ? "0"+hours : hours}.${min < 10 ? "0"+min : min} ${median}`)
                break;
            case 5:
                setDateTime(`Friday, ${hours < 10 ? "0"+hours : hours}.${min < 10 ? "0"+min : min} ${median}`)
                break;
            case 6:
                setDateTime(`Saturday, ${hours < 10 ? "0"+hours : hours}.${min < 10 ? "0"+min : min} ${median}`)
                break;
            case 7:
                setDateTime(`Sunday, ${hours < 10 ? "0"+hours : hours}.${min < 10 ? "0"+min : min} ${median}`)
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
        showOnPage = (
            <div 
                className=" w-1/2 p-1 h-full">

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

            </div>
        )
    }

    return (
        <div className='bg-white flex-1 h-screen p-2 m-2 border'>
            {showOnPage}
        </div>
    )
}

export default Overview