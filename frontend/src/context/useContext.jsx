import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const UserContext = createContext()

const UserProvider = ({children}) =>{
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(user) return;

        const accessToken = localStorage.getItem("AIToken")
        if(!accessToken){
            setLoading(false)
            return
        }

        const fetchUser = async()=>{
            try {
          const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE); 
             setUser(response.data)
            } catch (error) {
            console.error("User not logged in", error)
            clearUser()
            }finally{
                setLoading(false)
            }
        }

        fetchUser()
    },[])
    

    const updateUser = (userData) =>{
        setUser(userData)
        if(userData.token){
        localStorage.setItem("AIToken",userData.token)
        }
    }


    const clearUser = ()=>{
        setUser(null)
        localStorage.removeItem("AIToken")
    }


    return (
        <UserContext.Provider value={{user, loading, updateUser, clearUser}}>{children}</UserContext.Provider>
    )
}


export default UserProvider