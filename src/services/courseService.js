import {ADMIN, API_VERSION, apiBaseUrl, COURSE} from '../config';
import axiosInstance from "../axios";

export const getCourseService=async()=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE}`
    try {
        const res=await axiosInstance(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const createCourseService=async(data)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE}/addedit`
    try {
        const res=await axiosInstance.post(URL,data);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const getCourseServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE}/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const updateCourseStatus=async(id,status)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE}/status/${id}`
    try {
        const res=await axiosInstance.patch(URL,status);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourseServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE}/delete/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}
