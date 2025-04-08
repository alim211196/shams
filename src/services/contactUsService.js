import { ADMIN, API_VERSION, apiBaseUrl, CONTACT } from "../config";
import axiosInstance from "../axios";

export const getContactInquiriesService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${CONTACT}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
