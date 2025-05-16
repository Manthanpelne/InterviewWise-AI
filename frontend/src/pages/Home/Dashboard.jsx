import React, { useEffect, useState } from 'react'
import { DashboardLayout } from '../../components/Layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import { LuPlus } from 'react-icons/lu'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPath'
import { Card_BG } from '../../utils/data'
import { SummaryCard } from '../../components/Cards/SummaryCard'
import moment from "moment"


export const Dashboard = () => {
  const navigate = useNavigate()

  const [openCreateMode, setOpenCreateMode] = useState(false)
  const [sessions, setSessions] = useState([])

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open:false,
    data: null
})


//get all sessions
const fetchAllSessions = async()=>{
  try {
     const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
     setSessions(response.data)
  } catch (error) {
    console.error("Error fetching all sessions", error)
  }
}



const deleteSession = async(sessionData)=>{

}


useEffect(() => {
 fetchAllSessions()
}, [])

 console.log(sessions)

  return (
    <DashboardLayout>
      <hr className='opacity-20 w-[95%] m-auto'/>
   <div className='container w-[90%] m-auto mt-10'>
     
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7'>
        {sessions?.map((data,index)=>{
           return <SummaryCard
               key={data?._id}
               colors = {Card_BG [ index % Card_BG.length]}
               role = {data?.role || ""}
               experience = {data?.experience || "-"}
               topicsToFocus = {data?.topicsToFocus || ""}
               questions = {data?.questions?.length || "-"}
               description = {data?.description || ""}
               lastUpdated = {
                data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""
               }
              onSelect = {()=> navigate(`/interview-prep/${data?._id}`)}
              onDelete = {()=> setOpenDeleteAlert({open:true, data})}
            />
        })}
    </div>

     <button onClick={()=>setOpenCreateMode(true)} className='flex items-center shadow-lg rounded-sm text-white bg-black px-5 py-2 fixed bottom-20 right-20'>
      <LuPlus className='text-2xl text-white' /> Add New
     </button>

   </div> 
    </DashboardLayout>
  )
}
