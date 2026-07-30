import { Wind, Droplets, Thermometer, Heart, MapPin } from "lucide-react"

const WeatherCard = ({ weather,onFavorites }) => {
    if (!weather) return null;

    return (
        <div className="max-w-xl mx-auto rounded-3xl bg-white shadow-xl p-8 mt-5 dark:bg-slate-700 dark:text-white dark:border-slate-700">

            <div className="flex justify-between items-center">
                <div>
                    <div className="flex items-center gap-2">
                        <MapPin size={20} />
                        <h2 className="text-2xl font-bold">
                            {weather.city}
                        </h2>
                    </div>
                    <p className="text-gray-500 dark:text-white">{weather.region},{weather.country}
                    </p>
                    <p className="text-gray-500 dark:text-white">
                        {weather.localtime}
                    </p>
                </div>

                <img src={weather.icon} alt={weather.condition} className="w-20 h-20" />
            </div>

            <div className="text-center
            mt-8 ">
                <h1 className="text-xl text-gray-500 mt-2 dark:text-white">
                    {weather.temparature}°C
                </h1>

                <p className="text-xl text-gray-500 mt-2 dark:text-white">
                    {weather.condition}
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-10 ">

                <div className="rounded-xl bg-slate-100 p-4 text-center dark:text-white dark:bg-slate-500">

                    <Thermometer className="mx-auto mb-2" />

                    <p className="text-gray-500 text-sm dark:text-white">
                        Feels Like
                    </p>

                    <p className="font-semibold">
                        {weather.feelsLike}°C
                    </p>

                </div>

                <div className="rounded-xl bg-slate-100 p-4 text-center dark:text-white dark:bg-slate-500">

                    <Droplets className="mx-auto mb-2" />

                    <p className="text-gray-500 text-sm dark:text-white">
                        Humidity
                    </p>

                    <p className="font-semibold">
                        {weather.humidity}%
                    </p>

                </div>

                <div className="rounded-xl bg-slate-100 p-4 text-center dark:text-white dark:bg-slate-500">

                    <Wind className="mx-auto mb-2" />

                    <p className="text-gray-500 text-sm dark:text-white">
                        Wind
                    </p>

                    <p className="font-semibold">
                        {weather.wind} km/h
                    </p>

                </div>

            </div>

            <button className="mt-8 w-full flex justify-center items-center gap-2 bg-sky-600 text-white py-3 rounded-xl hover:bg-sky-700 transition dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-900"
            onClick={()=>onFavorites(weather.city)}>

                <Heart size={20} />

                Add to Favorites

            </button>
        </div>
    )
    
}

export default WeatherCard;