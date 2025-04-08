import { ADMIN, API_VERSION, apiBaseUrl, FACILITY } from "../config";
import axiosInstance from "../axios";

export const getAllFacilitiesService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FACILITY}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedFacilitiesService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FACILITY}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getFacilityServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FACILITY}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createFacilityService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FACILITY}`;
  try {
    const res = await axiosInstance.post(URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateFacilityService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FACILITY}/${id}`;

  try {
    const res = await axiosInstance.patch(URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateFacilityStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FACILITY}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteFacilityServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FACILITY}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
