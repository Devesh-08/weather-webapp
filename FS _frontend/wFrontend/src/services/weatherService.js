import API from "../api/axios.js";

export const getWeather=async(city)=>{
    const response=await API.get(`/weather/${city}`)
    // console.log(city);
    
    return response.data;
}

export const getCurrentLocation=async(latitude,longitude)=>{
    
    const res=await API.get(`/weather/currlocation`,{
        params:{
            lat:latitude,
            lon:longitude
        }
    })
    
    return res.data
}