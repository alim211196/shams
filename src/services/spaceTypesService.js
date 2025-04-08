import { ADMIN, API_VERSION, apiBaseUrl, SPACETYPE } from "../config";
import axiosInstance from "../axios";

export const getAllSpaceTypesService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${SPACETYPE}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedSpaceTypesService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${SPACETYPE}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSpaceTypeServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${SPACETYPE}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createSpaceTypeService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${SPACETYPE}`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateSpaceTypeService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${SPACETYPE}/${id}`;

  try {
    const res = await axiosInstance.patch(URL, data);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateSpaceTypeStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${SPACETYPE}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteSpaceTypeServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${SPACETYPE}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
