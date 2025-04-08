import { ADMIN, API_VERSION, apiBaseUrl, STUDENT } from "../config";
import axiosInstance from "../axios";

export const getStudentService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STUDENT}`;
  try {
    const res = await axiosInstance(URL);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createStudentService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STUDENT}/addedit`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateStudentStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STUDENT}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStudentServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STUDENT}/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getStudentWithInterestServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STUDENT}/view/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudentServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STUDENT}/delete/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    console.log(error);
  }
};
