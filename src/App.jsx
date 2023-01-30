import  axios  from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'

function App() {

	const [coords, setCoords] = useState()
	const [weather, setWeather] = useState()
	const [temperature, setTemperature] = useState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const success= pos =>{
			const obj={
				lat: pos.coords.latitude,
				lon: pos.coords.longitude
			}
			setCoords(obj)
		}
		navigator.geolocation.getCurrentPosition(success)
	}, [])
	

	useEffect(() => {
		if(coords){
			const APIKey='88a5f521722f484afdeca422f6caa381'
			const url=`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKey}`
			axios.get(url)
				.then(res=>{
					setWeather(res.data)
					const obj={
						celsius: (res.data.main.temp-273.15).toFixed(1),
						farenheit: ((res.data.main.temp -273.15) * 9/5 +32).toFixed(1)
					}
					setTemperature(obj)
				})
				.catch(err=>console.log(err))
				.finally(()=> setIsLoading(false))
		}
	}, [coords])
	

	return (
		<div className="App">
			{
				isLoading?
				<h1>Loading...</h1>
				:
				<WeatherCard 
					weather={weather} 
					temperature={temperature}
				/>
			}
		</div>
	)
}

export default App
