import { ADMIN, API_VERSION, apiBaseUrl, AUTHPAGE } from "../config";
import axiosInstance from "../axios";

export const postAuthPageService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${AUTHPAGE}`;
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

export const getAuthPageService = async (page_key, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${AUTHPAGE}/${page_key}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
