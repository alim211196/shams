import { ADMIN, API_VERSION, apiBaseUrl, SETTING } from "../config";
import axiosInstance from "../axios";

export const getAllSettingsService = async (lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${SETTING}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createSettingsService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${SETTING}/create`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};
