import API from "../api/axios";

export const getHistory = async ()=>{
    const res=await API.get('/history/');

    return res.data;
}

export const deleteHistory=async(id)=>{
    const res=await API.delete(`/history/delete/${id}`)

    return res.data;
}