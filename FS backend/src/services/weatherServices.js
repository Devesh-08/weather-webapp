import axios from "axios";

export const fetchWeather = async (city) => {
    try {
        const response = await axios.get(
            `http://api.weatherapi.com/v1/current.json`,
            {
                params: {
                    key: process.env.WEATHER_API_KEY,
                    q: city,
                    aqi: "no"
                }
            }
        )

        return response.data
    } catch (error) {
        console.error("Weather API error:", error.response?.data || error.message);
        throw error;
    }
}

export const fetchForecast = async (city) => {
    const response = await axios.get(
        "http://api.weatherapi.com/v1/forecast.json",
        {
            params:{
                key:process.env.WEATHER_API_KEY,
                q:city,
                days:5,
                aqi:"no",
                alerts:"no"
            }
        }
    )
    return response.data
}

export const fetchWeatherByLocation= async (lat,lon)=>{
    const res=await axios.get(
        "http://api.weatherapi.com/v1/forecast.json",
        {
            params:{
                key:process.env.WEATHER_API_KEY,
                q:`${lat},${lon}`,
                days:5,
                aqi:"no",
                alerts:"no"
            }
        }
    )
    return res.data;
}