import {API_VERSION,ADMIN} from '../config';
import axiosInstance from "../axios";

export const getAdminService=async(page = 1, limit = 10)=>{
    const URL=`${ADMIN}${API_VERSION}${ADMIN}?page=${page}&limit=${limit}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const addEditAdminService=async(data)=>{
    const URL=`${ADMIN}${API_VERSION}${ADMIN}/addedit`
    try {
        const res=await axiosInstance.post(URL,data);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const getAdminServiceId=async(id)=>{
    const URL=`${ADMIN}${API_VERSION}${ADMIN}/${id}`
    try {
        const res=await axiosInstance(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const updateAdminStatus=async(id,status)=>{
    const URL=`${ADMIN}${API_VERSION}${ADMIN}/status/${id}/${status}`
    try {
        const res=await axiosInstance(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const deleteAdminServiceId=async(id)=>{
    const URL=`${ADMIN}${API_VERSION}${ADMIN}/delete/${id}`
    try {
        const res=await axiosInstance(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}
