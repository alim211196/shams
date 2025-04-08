import {ADMIN, API_VERSION, apiBaseUrl, COURSE_CONTENT, COURSE_QUIZ,COURSE_LECTURE} from '../config';
import axiosInstance from "../axios";

export const getCourseContentService=async()=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_CONTENT}`
    try {
        const res=await axiosInstance(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const getCourseQuizService=async()=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_QUIZ}`
    try {
        const res=await axiosInstance(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const getCourseLectureService=async()=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_LECTURE}`
    try {
        const res=await axiosInstance(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const createCourseContentService=async(data)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_CONTENT}/addedit`
    try {
        const res=await axiosInstance.post(URL,data);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const createCourseQuizService=async(data)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_QUIZ}/addedit`
    try {
        const res=await axiosInstance.post(URL,data);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const createCourseLectureService=async(data)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_LECTURE}/addedit`
    try {
        const res=await axiosInstance.post(URL,data);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const getCourseContentServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_CONTENT}/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const getCourseQuizServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_QUIZ}/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const getCourseLectureServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_LECTURE}/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const updateCourseContentStatus=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_CONTENT}/updateStatus/${id}`
    try {
        const res=await axiosInstance.get(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourseContentServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_CONTENT}/delete/${id}`
    try {
        const res=await axiosInstance.delete(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourseQuizServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_QUIZ}/delete/${id}`
    try {
        const res=await axiosInstance.delete(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

export const deleteCourseLectureServiceById=async(id)=>{
    const URL=`${apiBaseUrl}${ADMIN}${API_VERSION}${COURSE_LECTURE}/delete/${id}`
    try {
        const res=await axiosInstance.delete(URL);
        return res; 
    } catch (error) {
        console.log(error)
    }
}

