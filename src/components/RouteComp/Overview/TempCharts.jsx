import React, { useState} from 'react'
import { useSelector } from 'react-redux'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot, Line, LineChart, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

function TempCharts() {

    let weatherData = useSelector(state => state.overView)

    let [chart, setChart] = useState("area")

    const handleChange = (value) => {
        setChart(value)
    };


    let dayHours = weatherData.days[0].hours
    let hourT = dayHours.map((ele) => {
        let eleTime = Number(ele.datetime.split(":")[0]) + 1
        let median = "AM"
        if (eleTime > 12) {
            eleTime -= 12
            median = "PM"
        }
        return {
            hour: eleTime + " " + median,
            temp: ele.temp
        }
    })

    return (
        <>
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
                                        <stop offset="10%" stopColor="#8884d8" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <ReferenceDot r={20} fill="red" stroke="none" />
                                <CartesianGrid strokeDasharray="0 1" />
                                <Tooltip />
                                <Area type="natural" dataKey="temp" stroke="#8884d8" strokeWidth={5} fillOpacity={1} fill="url(#colorUv)" />
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
                                <Line type="linear" dataKey="temp" stroke="#8884d8" strokeWidth={3} dot={0} activeDot={{ r: 8 }}  />
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
                                <Bar dataKey="temp" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : ("")
                }

            </div>

        </>
    )
}

export default TempCharts