import { ADMIN, API_VERSION, apiBaseUrl, STAT } from "../config";
import axiosInstance from "../axios";

export const getAllStatService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAT}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getPaginatedStatService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAT}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createStatService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAT}`;
  try {
    const res = await axiosInstance.post(URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateStatService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAT}/${id}`;
  try {
    const res = await axiosInstance.patch(URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateStatStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAT}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getStatServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAT}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteStatServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAT}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
