import { ADMIN, API_VERSION, apiBaseUrl, LANGUAGE } from "../config";
import axiosInstance from "../axios";

export const getLanguageService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${LANGUAGE}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createLanguageService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${LANGUAGE}`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateLanguageService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${LANGUAGE}/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { data });

    return res;
  } catch (error) {
    throw error;
  }
};

export const updateLanguageStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${LANGUAGE}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getLanguageServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${LANGUAGE}/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteLanguageServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${LANGUAGE}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllLanguageService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${LANGUAGE}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
