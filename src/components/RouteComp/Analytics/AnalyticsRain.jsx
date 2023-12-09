import React from 'react'
import { XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';

function AnalyticsRain({weatherData, selectQuery}) {

    let chartData 

    if(selectQuery === "today" || selectQuery === "tomorrow" || selectQuery === "yesterday"){
        chartData = weatherData.days[0].hours.map((ele) => {
            let eleTime = Number(Number(ele.datetime.split(":")[0])+1) + 1
            let median = "AM"
            if (eleTime > 12) {
                eleTime -= 12
                median = "PM"
            }
            return {
                hour: eleTime + " " + median,
                rain: ele.humidity
            }
        })
    }else{
        chartData = weatherData.days.map((ele) => {
            return {
                hour: `${ele.datetime.split("-")[2]}/${ele.datetime.split("-")[1]}`,
                rain: ele.humidity
            }
        })
    }


    return (
        <>
            <div className="rain p-2 bg-white rounded-md shadow-md">
                <div className="flex items-center gap-1">
                    <div className="w-2 h-5 bg-black"></div>
                    <p className='text-xl font-semibold'>Rain</p>
                </div>
                <div className=" mt-4 lg:h-[300px] md:h-[240px] h-[230px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart width={730} height={230} data={chartData}
                            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                        >
                            <CartesianGrid strokeDasharray="1 3" />
                            <XAxis dataKey="hour" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="rain" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
}

export default AnalyticsRain