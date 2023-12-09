import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceDot, Line, LineChart, BarChart, Bar, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
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
        setChart(value)
    };
	
	const dataHandleChange = (value) => {
		setType(value)
	}

  const keyAnalytics = process.env.REACT_APP_WEATHER_ANALYTICS

	useEffect(() => {

		const getweatherData = async () => {
			let cordinates = `${coord.lat}, ${coord.lon}`

			if(selectQuery === "Next 15 Days"){
				let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cordinates}?unitGroup=metric&include=hours%2Cdays%2Calerts%2Ccurrent&key=${keyAnalytics}&contentType=json`)
				let data = await response.json()
				setWeatherData(data)
				
			}else{
				let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cordinates}/${selectQuery}?unitGroup=metric&include=hours%2Cdays%2Calerts%2Ccurrent&key=${keyAnalytics}&contentType=json`)
				let data = await response.json()
				setWeatherData(data)
		
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

		let radarData = []

		radarData.push({
			data: "Cloud Cover",
			am: weatherData.days[0].cloudcover,
			full: 100
		})
		radarData.push({
			data: "Humidity",
			am: weatherData.days[0].humidity,
			full: 100
		})
		radarData.push({
			data: "UV Index",
			am: Number(weatherData.days[0].uvindex)*10,
			full: 100
		})
		radarData.push({
			data: "Visibility",
			am: weatherData.days[0].visibility,
			full: 100
		})
		radarData.push({
			data: "Dew",
			am: weatherData.days[0].dew,
			full: 100
		})
		radarData.push({
			data: "Feelslike",
			am: weatherData.days[0].feelslike,
			full: 100
		})



		showOnPage = (
			<div className="px-2 bg-[#d7f1ff] h-full flex flex-wrap lg:flex-nowrap gap-2">

				<div className="lg:w-7/12 w-full pt-2">
					<div className="options w-full p-2 bg-white rounded-lg shadow-xl flex flex-wrap gap-2 justify-around items-center">
						<button className={` ${selectQuery === "today" ? "text-white bg-[#9625ff]" : "text-black bg-white"} lg:px-5 px-3 py-1 lg:text-lg text-sm border-2  border-purple-500 rounded-lg flex-1 lg:flex-none min-w-[110px]`}
							onClick={() => setSelectQuery("today")}
						>Today</button>
						<button className={`${selectQuery === "tomorrow" ? "text-white bg-[#9625ff]" : "text-black bg-white"} lg:px-5 px-3 py-1 lg:text-lg text-sm border-2 border-purple-500 rounded-lg flex-1 lg:flex-none min-w-[110px]`}
							onClick={() => setSelectQuery("tomorrow")}
						>Tommorow</button>
						<button className={`${selectQuery === "yesterday" ? "text-white bg-[#9625ff]" : "text-black bg-white"} lg:px-5 px-3 py-1 lg:text-lg text-sm border-2 border-purple-500 rounded-lg flex-1 lg:flex-none min-w-[110px]`}
							onClick={() => setSelectQuery("yesterday")}
						>Yesterday</button>
						<button className={`${selectQuery === "next7days" ? "text-white bg-[#9625ff]" : "text-black bg-white"} lg:px-5 px-3 py-1 lg:text-lg text-sm border-2 border-purple-500 rounded-lg flex-1 lg:flex-none min-w-[110px]`}
							onClick={() => setSelectQuery("next7days")}
						>Next 7 Days</button>
						<button className={`${selectQuery === "last7days" ? "text-white bg-[#9625ff]" : "text-black bg-white"} lg:px-5 px-3 py-1 lg:text-lg text-sm border-2 border-purple-500 rounded-lg flex-1 lg:flex-none min-w-[110px]`}
							onClick={() => setSelectQuery("last7days")}
						>Last 7 Days</button>
						<button className={`${selectQuery === "Next 15 Days" ? "text-white bg-[#9625ff]" : "text-black bg-white"} lg:px-5 px-3 py-1 lg:text-lg text-sm border-2 border-purple-500 rounded-lg flex-1 lg:flex-none min-w-[110px]`}
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
											<Line type="linear" dataKey="temp" stroke="#8884d8" strokeWidth={3} dot={0} activeDot={{ r: 8 }}  />
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
					</div>

					<div className="p-2 bg-white mt-5 rounded-md shadow-md">
						<p className=' text-2xl font-semibold text-center mb-2'>Conditions</p>
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
					</div>
				</div>

				<div className="py-2 w-full">
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
					<div className="radar p-1 bg-white mt-3 flex sm:flex-nowrap flex-wrap border gap-3 justify-around rounded-md shadow-md">
						<div className="sm:w-1/2 w-full">
							<ResponsiveContainer width="100%" height={230}>
								<RadarChart outerRadius={90} height={250} data={radarData}>
									<PolarGrid />
									<PolarAngleAxis dataKey="data" />
									<PolarRadiusAxis angle={30} domain={[0, 100]} />
									<Radar dataKey="am" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
								</RadarChart>
							</ResponsiveContainer>
						</div>
						<div className="p-2 flex justify-center items-start gap-2 flex-col">
							<div className=" flex items-center gap-3">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								<p className=' text-xl font-semibold'>{`Cloud Cover: ${radarData[0].am}/100`}</p>
							</div>
							<div className=" flex items-center gap-3">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								<p className=' text-xl font-semibold'>{`Humidity: ${radarData[1].am}/100`}</p>
							</div>
							<div className=" flex items-center gap-3">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								<p className=' text-xl font-semibold'>{`UV Index: ${radarData[2].am}/100`}</p>
							</div>
							<div className=" flex items-center gap-3">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								<p className=' text-xl font-semibold'>{`Visibility: ${radarData[3].am}/100`}</p>
							</div>
							<div className=" flex items-center gap-3">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								<p className=' text-xl font-semibold'>{`Dew Point: ${radarData[4].am}/100`}</p>
							</div>
							<div className=" flex items-center gap-3">
								<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
								<p className=' text-xl font-semibold'>{`Feelslike: ${radarData[5].am}/100`}</p>
							</div>
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