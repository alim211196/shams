import { ADMIN, API_VERSION, apiBaseUrl, ACHIEVEMENT } from "../config";
import axiosInstance from "../axios";

export const getAllAchievementService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ACHIEVEMENT}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getPaginatedAchievementService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ACHIEVEMENT}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createAchievementService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ACHIEVEMENT}`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateAchievementService = async (id, lang_code, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ACHIEVEMENT}/${id}`;
  try {
    const payload = {
      lang_code,
      ...data,
    };

    const res = await axiosInstance.patch(URL, payload);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateAchievementAchievementStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ACHIEVEMENT}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAchievementServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ACHIEVEMENT}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAchievementServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ACHIEVEMENT}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
