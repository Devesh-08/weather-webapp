import API from "../api/axios";

export const addFavorite=async(city)=>{
    const response=await API.post("/favCity/addFav",{
        city
    })
    // console.log("response",response);
    
    return response.data
}

export const getFavorites=async()=>{
    const response=await API.get("/favCity/getAllFavCity")
    return response.data;
}

export const deleteFavorites=async(id)=>{
    const response=await API.delete(`/favCity/${id}`);
    return response.data
}