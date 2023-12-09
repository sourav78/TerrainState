import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import AnalyticsTempCharts from './Analytics/AnalyticsTempCharts';
import AnalyticsRain from './Analytics/AnalyticsRain';
import AnalyticsConditions from './Analytics/AnalyticsConditions';
import AnalyticsRadar from './Analytics/AnalyticsRadar';

function Analytics() {

	let [weatherData, setWeatherData] = useState({})
	const [selectQuery, setSelectQuery] = useState("today")
	let coord = useSelector(state => state.coordinates)


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


	}, [ coord, selectQuery])


	let showOnPage
	if (Object.keys(coord).length === 0 || coord.lat === undefined || Object.keys(weatherData).length === 0) {
		showOnPage = <div className='grid place-content-center h-full'> <div
			className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
			role="status">
			<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
			>Loading...</span>
		</div></div>
	} else {

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
						
						<AnalyticsTempCharts weatherData={weatherData} selectQuery={selectQuery}/>
					</div>

					<div className="p-2 bg-white mt-5 rounded-md shadow-md">
						<p className=' text-2xl font-semibold text-center mb-2'>Conditions</p>
						<AnalyticsConditions weatherData={weatherData} selectQuery={selectQuery} />
					</div>
				</div>

				<div className="py-2 w-full">
					
					<AnalyticsRain weatherData={weatherData} selectQuery={selectQuery} />
					<AnalyticsRadar weatherData={weatherData} />
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