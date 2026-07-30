import API from '../api/axios'

export const getForecast = async(city)=>{
    const res=await API.get(`/weather/forecast/${city}`)
    return res.data;
}