import {ADMIN, API_VERSION, apiBaseUrl, COURSE_SECTION} from '../config';
import axiosInstance from "../axios";

export const getCourseSectionService=async()=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_SECTION}`
    try {
        const res=await axiosInstance(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const createCourseSectionService=async(data)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_SECTION}/addedit`
    try {
        const res=await axiosInstance.post(URL,data);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const getCourseSectionServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_SECTION}/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const updateCourseSectionStatus=async(id,status)=>{
    console.log(status);
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_SECTION}/status/${id}`
    try {
        const res=await axiosInstance.patch(URL,status);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourseSectionServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_SECTION}/delete/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}
