import { useEffect, useState } from "react"
import { getFavorites } from "../services/favoriteService"
import { getWeather } from "../services/weatherService"
import { deleteFavorites } from "../services/favoriteService"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoginRequired from "../component/Loginrequired"

function Favorites() {
  const [favorite, setFavorites] = useState([])
  const {token}=useAuth()

  useEffect(() => {
    fetchFavorites()
  })

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites()

      const weatherData = await Promise.all(
        res.favourites.map(async (fav) => {
          try {
            const w = await getWeather(fav.city);

            return {
              ...fav,
              weather: w.weather
            }
          } catch (error) {

            return {
              ...fav,
              weather: null
            }
          }
        })
      )
      setFavorites(weatherData)

    } catch (error) {
      console.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteFavorites(id);
      setFavorites((prev) => prev.filter((fav) => fav._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  if(!token){
    return(
      <LoginRequired
      title="Favorites"
      message="Login to save and manage your favorite cities."
      />
    )
  }
  
  return (
    <div className="mx-auto p-7 w-full h-lvh bg-linear-to-br dark:from-slate-400 dark:to-slate-500">
      <div className="flex justify-between">
      <h1 className="text-3xl font-bold mb-8 dark:text-black">
        My favorites
      </h1>
      <Link to="/" className="p-2 text-2xl">&larr;BACK</Link>
      </div>
      {
        favorite.length === 0 ? (
          <p>No favorite cities yet</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 ">
            {
              favorite.map((fav) => (
                <div
                  key={fav._id}
                  className="bg-white shadow-lg rounded-xl p-5 dark:bg-slate-700 dark:text-white dark:border-slate-700"
                >
                  <img
                    src={fav.weather.icon}
                    alt={fav.weather.condition}
                  />

                  <h2 className="text-2xl font-bold">
                    {fav.city}
                  </h2>

                  <p>{fav.weather.country}</p>

                  <p>{fav.weather.condition}</p>

                  <p>{fav.weather.temparature}°C</p>

                  <button
                    onClick={() => handleDelete(fav._id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Favorites