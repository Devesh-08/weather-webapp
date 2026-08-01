import { fetchWeather,fetchForecast ,fetchWeatherByLocation} from "../services/weatherServices.js"
import { Search } from "../models/searchHistory.js"
import asyncHandler from "../utils/asynchandler.js"

export const getWeather=asyncHandler(async(req,res)=>{
        try {
            const city=req.params.city
            // console.log("[Route Hit] City:", req.params.city);
            
            if(req.user){
            await Search.create({
                user:req.user._id,
                city
            })}
        
            const weatherData=await fetchWeather(city)
                // console.log("[Route Success] Got data");
    
            const weather={
                city:weatherData.location.name,
                region:weatherData.location.region,
                localtime:weatherData.location.localtime,
                country:weatherData.location.country,
                temparature:weatherData.current.temp_c,
                condition:weatherData.current.condition.text,
                icon:`https:${weatherData.current.condition.icon}`,
                humidity:weatherData.current.humidity,
                wind:weatherData.current.wind_kph,
                feelsLike:weatherData.current.feelslike_c
            }
        
            res.status(200).json({
                success:true,
                weather
            })
        } catch (error) {
            res.status(500).json({error:"Failed to fetch weather data"})
        }
})

export const getForecast=asyncHandler(async (req,res)=>{
    const {city}=req.params;

    const data=await fetchForecast(city);

    const forecast=data.forecast.forecastday.map((day)=>({
        date:day.date,
        maxTemp:day.day.mintemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
    }))
    res.status(200).json({
        success: true,
        forecast,
    });
})


export const getWeatherByLocation=asyncHandler(async (req,res)=>{

    const {lat,lon}=req.query;
    if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat/lon" });
}

    const weatherData=await fetchWeatherByLocation(lat,lon);
    
    const location={
                city:weatherData.location.name,
                region:weatherData.location.region,
                localtime:weatherData.location.localtime,
                country:weatherData.location.country,
                temparature:weatherData.current.temp_c,
                condition:weatherData.current.condition.text,
                icon:`https:${weatherData.current.condition.icon}`,
                humidity:weatherData.current.humidity,
                wind:weatherData.current.wind_kph,
                feelsLike:weatherData.current.feelslike_c,
    }
    const forecast = weatherData.forecast.forecastday.map((day) => ({
        date:day.date,
        maxTemp:day.day.mintemp_c,
        minTemp: day.day.mintemp_c,
        condition: day.day.condition.text,
        icon: day.day.condition.icon,
    }));
    
    res.status(200).json({
        success: true,
        location,
        forecast
    });
})

