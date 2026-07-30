export const ForecastCard=({day})=>{
    return(
        <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center hover:scale-105 transition dark:bg-slate-700 dark:text-white">
            <p className="font-semibold">
                {
                    new Date(day.date).toLocaleDateString("en-IN",{
                        weekday:"short"
                    })
                }
            </p>
            <img src={`https:${day.icon}`}
            alt={day.condition}
            className="w-16 h-16" 
            />
            <p className="text-sm text-gray-600 dark:text-slate-200">
                {day.condition}
            </p>

            <div className="mt-2 text-center">
                <p className="font-bold text-lg">Max Temp : {
                    day.maxTemp}°
                </p>
                <p className="text-gray-500 dark:text-slate-200">
                    Min Temp : {day.minTemp}°
                </p>
            </div>
        </div>
    )
}