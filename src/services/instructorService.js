import { ADMIN, API_VERSION, apiBaseUrl, TUTOR } from "../config";
import axiosInstance from "../axios";

export const getInstructorService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TUTOR}`;
  try {
    const res = await axiosInstance(URL);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateInstructorStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TUTOR}/status/${id}`;
  console.log(URL);
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createInstructorService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TUTOR}/addedit`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getInstructorServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TUTOR}/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteInstructorServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TUTOR}/delete/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    console.log(error);
  }
};
