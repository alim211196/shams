
import {API_VERSION, AUTH_URL} from '../config';
import axiosInstance from "../axios";

export const loginService=async(data)=>{
    const URL=`http://18.233.160.251:8001${API_VERSION}${AUTH_URL}/login`
    try {
        const res=await axiosInstance.post(URL,data);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

