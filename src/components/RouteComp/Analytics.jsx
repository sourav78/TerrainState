import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot, Line, LineChart, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';
import clear from "../../Assets/Weather Icons/clear.png"
import cloudyRain from "../../Assets/Weather Icons/cloudy_rainy.png"
import cloudy from "../../Assets/Weather Icons/cloudy.png"
import heavyRainStrom from "../../Assets/Weather Icons/Heavyrain-strom.png"
import nightCloudy from "../../Assets/Weather Icons/night-cloudy2.png"
import nightRain from "../../Assets/Weather Icons/night-rain.png"
import night from "../../Assets/Weather Icons/night.png"
import partlyCloudy from "../../Assets/Weather Icons/sunny.png"
import rain from "../../Assets/Weather Icons/rain.png"
import thunder from "../../Assets/Weather Icons/thunder.png"
import snow from "../../Assets/Weather Icons/snowflake.png"
import fog from "../../Assets/Weather Icons/fog.png"
import wind from "../../Assets/Weather Icons/wind.png"
import { nanoid } from '@reduxjs/toolkit';

function Analytics() {

	let [weatherData, setWeatherData] = useState({})
	const [selectQuery, setSelectQuery] = useState("today")
	let coord = useSelector(state => state.coordinates)

	let [chart, setChart] = useState("area")
	let [type, setType] = useState("temp")

    const chartHandleChange = (value) => {
        console.log(`selected ${value}`);
        setChart(value)
    };
	
	const dataHandleChange = (value) => {
		console.log(`selected ${value}`);
		setType(value)
	}

	console.log(`${coord.lat}, ${coord.lon}`);


	useEffect(() => {

		const getweatherData = async () => {
			let cordinates = `${coord.lat}, ${coord.lon}`
			// let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cordinates}/${selectQuery}?unitGroup=metric&include=hours%2Cdays%2Calerts%2Ccurrent&key=58RFYTMSNQM5WXER9BCLRAENU&contentType=json`

			if(selectQuery === "Next 15 Days"){
				let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cordinates}?unitGroup=metric&include=hours%2Cdays%2Calerts%2Ccurrent&key=CFBQXND8BMSSZ4BDTHNHC29YC&contentType=json`)
				let data = await response.json()
				setWeatherData(data)
				
				console.log(data)
			}else{
				let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cordinates}/${selectQuery}?unitGroup=metric&include=hours%2Cdays%2Calerts%2Ccurrent&key=CFBQXND8BMSSZ4BDTHNHC29YC&contentType=json`)
				let data = await response.json()
				setWeatherData(data)
		
				console.log(data);
			}
		}

		getweatherData()


	}, [type, coord, selectQuery])


	let showOnPage
	if (Object.keys(coord).length === 0 || coord.lat === undefined || Object.keys(weatherData).length === 0) {
		showOnPage = <div className='grid place-content-center h-full'> <div
			className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
			role="status">
			<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
			>Loading...</span>
		</div></div>
	} else {

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
				console.log(chartData);
			}else{
				chartData = weatherData.days.map((ele) => {
					return {
						hour: `${ele.datetime.split("-")[2]}/${ele.datetime.split("-")[1]}`,
						temp: ele.tempmax,
						rain: ele.humidity
					}
				})
				console.log(chartData);
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
				console.log(chartData);
			}else{
				chartData = weatherData.days.map((ele) => {
					return {
						hour: `${ele.datetime.split("-")[2]}/${ele.datetime.split("-")[1]}`,
						temp: ele.tempmin,
						rain: ele.humidity
					}
				})
				console.log(chartData);
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
				console.log(chartData);
			}else{
				chartData = weatherData.days.map((ele) => {
					return {
						hour: `${ele.datetime.split("-")[2]}/${ele.datetime.split("-")[1]}`,
						temp: ele.temp,
						rain: ele.humidity
					}
				})
				console.log(chartData);
			}

		}

		let conditionData

		if(selectQuery === "today" || selectQuery === "tomorrow" || selectQuery === "yesterday"){
			conditionData = weatherData.days[0].hours.map(ele => {
				if (ele.icon === "partly-cloudy-day") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Partly Cloudy",
						icon: partlyCloudy
					}
				} else if (ele.icon === "partly-cloudy-night") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Partly Cloudy",
						icon: nightCloudy
					}
				} else if (ele.icon === "clear-day") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Clear",
						icon: clear
					}
				} else if (ele.icon === "clear-night") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Clear",
						icon: night
					}
				} else if (ele.icon === "cloudy") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Cloudy",
						icon: cloudy
					}
				} else if (ele.icon === "showers-day") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Rain",
						icon: cloudyRain
					}
				} else if (ele.icon === "showers-night") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Rain",
						icon: nightRain
					}
				} else if (ele.icon === "rain") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Rain",
						icon: rain
					}
				} else if (ele.icon === "thunder-showers-night") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Thunder",
						icon: thunder
					}
				} else if (ele.icon === "thunder-showers-day") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Thunder",
						icon: thunder
					}
				} else if (ele.icon === "thunder-rain") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Thunder Rain",
						icon: heavyRainStrom
					}
				} else if (ele.icon === "snow") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Snow",
						icon: snow
					}
				} else if (ele.icon === "snow-showers-day") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Snow",
						icon: snow
					}
				} else if (ele.icon === "snow-showers-night") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Snow",
						icon: snow
					}
				} else if (ele.icon === "fog") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Fog",
						icon: fog
					}
				} else if (ele.icon === "wind") {
					return {
						datetime: Number(ele.datetime.split(":")[0])+1,
						condition: "Wind",
						icon: wind
					}
				}
			})
		}else{

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

		console.log(conditionData);


		showOnPage = (
			<div className="px-2 bg-[#d7f1ff] h-full flex gap-2">

				<div className="w-7/12 pt-2">
					<div className="options w-full p-2 bg-white rounded-lg shadow-xl flex gap-2 justify-around items-center">
						<button className={` ${selectQuery === "today" ? "text-white bg-[#9625ff]" : "text-black bg-white"} px-5 py-1 text-lg border-2  border-purple-500 rounded-lg`}
							onClick={() => setSelectQuery("today")}
						>Today</button>
						<button className={`${selectQuery === "tomorrow" ? "text-white bg-[#9625ff]" : "text-black bg-white"} px-5 py-1 text-lg border-2 border-purple-500 rounded-lg`}
							onClick={() => setSelectQuery("tomorrow")}
						>Tommorow</button>
						<button className={`${selectQuery === "yesterday" ? "text-white bg-[#9625ff]" : "text-black bg-white"} px-5 py-1 text-lg border-2 border-purple-500 rounded-lg`}
							onClick={() => setSelectQuery("yesterday")}
						>Yesterday</button>
						<button className={`${selectQuery === "next7days" ? "text-white bg-[#9625ff]" : "text-black bg-white"} px-5 py-1 text-lg border-2 border-purple-500 rounded-lg`}
							onClick={() => setSelectQuery("next7days")}
						>Next 7 Days</button>
						<button className={`${selectQuery === "last7days" ? "text-white bg-[#9625ff]" : "text-black bg-white"} px-5 py-1 text-lg border-2 border-purple-500 rounded-lg`}
							onClick={() => setSelectQuery("last7days")}
						>Last 7 Days</button>
						<button className={`${selectQuery === "Next 15 Days" ? "text-white bg-[#9625ff]" : "text-black bg-white"} px-5 py-1 text-lg border-2 border-purple-500 rounded-lg`}
							onClick={() => setSelectQuery("Next 15 Days")}
						>Next 15 Days</button>
					</div>

					<div className="p-2 mt-3 bg-white rounded-lg shadow-lg ">
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

						<div className="">
							{
								chart === "area" ? (
									<ResponsiveContainer width="100%" height={270}>
										<AreaChart data={chartData}
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
											<CartesianGrid strokeDasharray="1 1" />
											<Tooltip />
											<Area type="natural" dataKey="temp" stroke="#8884d8" strokeWidth={5} fillOpacity={1} fill="url(#colorUv)" />
										</AreaChart>
									</ResponsiveContainer>
								) : chart === "line" ? (
									<ResponsiveContainer width="100%" height={270}>
										<LineChart width={730} height={230} data={chartData}
											margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
											<CartesianGrid strokeDasharray="2 3" />
											<XAxis dataKey="hour" />
											<YAxis />
											<Tooltip />
											<Line type="linear" dataKey="temp" stroke="#8884d8" strokeWidth={3} dot={0} activeDot={{ r: 8 }}  />
										</LineChart>
									</ResponsiveContainer>
								) : chart === "bar" ? (
									<ResponsiveContainer width="100%" height={270}>
										<BarChart width={730} height={230} data={chartData}
											margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
										>
											<CartesianGrid strokeDasharray="1 3" />
											<XAxis dataKey="hour" />
											<YAxis />
											<Tooltip />
											<Bar dataKey="temp" fill="#ae57ff" />
										</BarChart>
									</ResponsiveContainer>
								) : ("")
							}
						</div>
					</div>

					<div className="p-2 bg-white mt-5 rounded-md shadow-md">
						<div className=" flex overflow-x-scroll gap-3">
						{
							conditionData.map(ele => (
								<div key={nanoid()} className=" px-1 py-2 max-w-[100px] min-w-[100px] w-full min-h-[110px] h-full border-2 border-slate-400 rounded-lg flex flex-col items-center justify-between leading-[8px]">
									<p className=''>{ele.datetime}</p>
									<img className='w-16' src={ele.icon} alt="" />
									<p className='text-sm'>{ele.condition}</p>
								</div>	
							))
						}
						</div>
					</div>
				</div>

				<div className="py-2 w-full">
					<div className="p-2 bg-white rounded-md shadow-md">
						<div className="flex items-center gap-1">
							<div className="w-2 h-5 bg-black"></div>
							<p className='text-xl font-semibold'>Rain</p>
						</div>
						<div className=" mt-4">
							<ResponsiveContainer width="100%" height={350}>
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
				</div>

			</div>
		)

	}

	return (
		<>
			<div className=' flex-1 mt-4 border'>
				{showOnPage}
			</div>
		</>
	)
}

export default Analytics