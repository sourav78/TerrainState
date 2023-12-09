import React from 'react'
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

function AnalyticsRadar({weatherData}) {

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
		am: Number(weatherData.days[0].uvindex) * 10,
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

	return (
		<>
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
		</>
	)
}

export default AnalyticsRadar