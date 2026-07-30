import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import SearchBar from '../component/SearchBar'
import { getCurrentLocation, getWeather } from '../services/weatherService'
import WeatherCard from '../component/weatherCard'
import Spinner from '../component/Spinner'
import { addFavorite } from '../services/favoriteService'
import { getForecast } from '../services/forecastService'
import { ForecastCard } from '../component/ForecastCard'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'

function Home() {

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [msg, setMsg] = useState("")
  const [forecast, setForecast] = useState([])

  const handleSearch = async (city) => {
    try {
      setLoading(true)
      const data = await getWeather(city);
      setWeather(data.weather);

      const forecastRes = await getForecast(city);
      setForecast(forecastRes.forecast)

      setError("")
    } catch (error) {
      setWeather(null)
      setError(error.response?.data?.message || "city name invalid or not avilable")
    } finally {
      setLoading(false)
    }
  }

  const handleFavorite = async (city) => {
    try {
      const res = await addFavorite(city)

      setMsg(res.message || "Added to favorites!!")

      setTimeout(() => {
        setMsg("")
      }, 3000)

    } catch (error) {
      console.error(error)

      setMsg(error.res?.data?.message || "Failed to add favorite")
    }

    setTimeout(() => {
      setMsg("")
    }, 3000)
  }

  const handleCurrentlocation=()=>{
    navigator.geolocation.getCurrentPosition(
      async (position)=>{
        const {latitude,longitude}=position.coords;
        
        const weather = await getCurrentLocation(latitude,longitude)
        
        setWeather(weather.location);
        setForecast(weather.forecast)
      },(error)=>{
        toast.error("Location permission denied")
      }
    )
  }

  const location=useLocation()
  useEffect(()=>{
    if(location.state?.city){
      handleSearch(location.state.city)
    }
  },[location.state])

  return (
    <>
      <Navbar />
      <main className='min-h-screen bg-linear-to-br from-sky-100 to-blue-200 dark:from-slate-400 dark:to-slate-500'>
        <div className='max-w-6xl mx-auto px-5 py-10'>
          <SearchBar onSearch={handleSearch} />
          <div className='w-full flex justify-center mt-2'>
          <button
          onClick={handleCurrentlocation}
          className='bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 '
          >Use My Location
          </button>
          </div>
          {!loading && !weather && !error && (
            <div className="mt-16 text-center text-gray-500">
              <p className="text-xl dark:text-black">
                Search for a city to view the current weather.
              </p>
            </div>
          )}
          {
            loading && <Spinner />
          }
          {msg && (
            <div className="max-w-xl mx-auto mt-4 rounded-lg bg-green-100 border border-green-300 p-3 text-green-700">
              {msg}
            </div>
          )}
          {!loading && (
            <WeatherCard weather={weather} onFavorites={handleFavorite} />
          )}
          {!loading && forecast.length > 0 && (
            <div className="mt-10">

              <h2 className="text-2xl font-bold mb-4">
                3-Day Forecast
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {forecast.map((day) => (
                  <ForecastCard
                    key={day.date}
                    day={day}
                  />
                ))}
              </div>

            </div>
          )}
          {
            error && (
              <div className='max-w-xl mt-6 mx-auto rounded-lg bg-red-100 border border-red-300 p-4 text-red-700'>
                {error}
              </div>
            )
          }
        </div>
      </main>
    </>
  )
}

export default Home