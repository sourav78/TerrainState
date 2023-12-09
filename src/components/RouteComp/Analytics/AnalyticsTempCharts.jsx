import React, {useState} from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot, Line, LineChart, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

function AnalyticsTempCharts({weatherData, selectQuery}) {

    let [chart, setChart] = useState("area")
	let [type, setType] = useState("temp")

    const chartHandleChange = (value) => {
        setChart(value)
    };
	
	const dataHandleChange = (value) => {
		setType(value)
	}

    console.log(weatherData);

    let chartData

    if (type === "maxtemp") {

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
                    temp: ele.temp,
                    rain: ele.humidity
                }
            })
        }else{
            chartData = weatherData.days.map((ele) => {
                return {
                    hour: `${ele.datetime.split("-")[2]}/${ele.datetime.split("-")[1]}`,
                    temp: ele.tempmax,
                    rain: ele.humidity
                }
            })
        }
        
    }else if( type === "mintemp"){

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
                    temp: ele.temp,
                    rain: ele.humidity
                }
            })
        }else{
            chartData = weatherData.days.map((ele) => {
                return {
                    hour: `${ele.datetime.split("-")[2]}/${ele.datetime.split("-")[1]}`,
                    temp: ele.tempmin,
                    rain: ele.humidity
                }
            })
        }

    }else{

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
                    temp: ele.temp,
                    rain: ele.humidity
                }
            })
        }else{
            chartData = weatherData.days.map((ele) => {
                return {
                    hour: `${ele.datetime.split("-")[2]}/${ele.datetime.split("-")[1]}`,
                    temp: ele.temp,
                    rain: ele.humidity
                }
            })
        }

    }

    return (
        <>
            <div className="flex justify-end gap-6 mr-5 mb-4 mt-3">
                <Select
                    defaultValue="area"
                    style={{
                        width: 120,
                    }}
                    onChange={chartHandleChange}
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
                <Select
                    defaultValue="temp"
                    style={{
                        width: 120,
                    }}
                    onChange={dataHandleChange}
                    options={[
                        {
                            value: 'temp',
                            label: 'Temp',
                        },
                        {
                            value: 'maxtemp',
                            label: 'Max Temp',
                        },
                        {
                            value: 'mintemp',
                            label: 'Min Temp',
                        },
                    ]}
                />
            </div>

            <div className=" lg:h-[270px] md:h-[240px] h-[230px]">
                {
                    chart === "area" ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="10%" stopColor="#8884d8" stopOpacity={1} />
                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <ReferenceDot r={20} fill="red" stroke="none" />
                                <CartesianGrid strokeDasharray="1 1" />
                                <Tooltip />
                                <Area type="natural" dataKey="temp" stroke="#8884d8" strokeWidth={5} fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : chart === "line" ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart width={730} height={230} data={chartData}
                                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="2 3" />
                                <XAxis dataKey="hour" />
                                <YAxis />
                                <Tooltip />
                                <Line type="linear" dataKey="temp" stroke="#8884d8" strokeWidth={3} dot={0} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : chart === "bar" ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart width={730} height={230} data={chartData}
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

export default AnalyticsTempCharts