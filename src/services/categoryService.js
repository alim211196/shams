import {ADMIN, API_VERSION, apiBaseUrl, CATEGORY} from '../config';
import axiosInstance from "../axios";

export const getCategoryService=async()=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${CATEGORY}`
    try {
        const res=await axiosInstance(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const updateCategoryStatus=async(id,status)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${CATEGORY}/status/${id}/${status}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const createCategoryService=async(data)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${CATEGORY}/addedit`
    try {
        const res=await axiosInstance.post(URL,data);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const getCategoryServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${CATEGORY}/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const deleteCategoryServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${CATEGORY}/delete/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}
