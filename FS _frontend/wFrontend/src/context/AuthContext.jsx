import { createContext,useContext,useEffect,useState } from "react";

const AuthContext=createContext()

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [token,setToken]=useState(localStorage.getItem("token")||null)

    useEffect(()=>{
        const savedUser=localStorage.getItem("user")

        if(savedUser && savedUser !=="undefined"){
            try {
                setUser(JSON.parse(savedUser))
            } catch (error) {
                localStorage.removeItem("user")
            }
        }
    },[])

    const login=({user,accessToken})=>{
        setUser(user)
        setToken(accessToken)

        if(user)localStorage.setItem("user",JSON.stringify(user))
        if(accessToken) localStorage.setItem("token",accessToken)
    }

    const logout =()=>{
        setUser(null);
        setToken(null);

        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    return(
        <AuthContext.Provider value={{user,token,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext)