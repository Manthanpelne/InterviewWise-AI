import React from 'react'
import axiosInstance from './axiosInstance'
import { API_PATHS } from './apiPath'

export const uploadImage = async(imageFile) => {

    const formData = new FormData()

    //append img file to form data
    formData.append("image", imageFile)

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers :{
                'Content-Type':"multipart/form-data"  //setting header for file upload
            }
        })
        //console.log("img response" , response.data)
        return response.data
    } catch (error) {
       console.error("Error uploading image",error)
       throw error; 
    }
}
