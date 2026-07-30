import API from "../api/axios";

export const login=async(Credentials)=>{
    const response=await API.post("/users/login",Credentials)
    return response.data
}

export const register=async(userData)=>{
    const response=await API.post("/users/register",userData)
}

export const logout=async()=>{
    const response=await API.post("/users/logout");
    return response.data;
}