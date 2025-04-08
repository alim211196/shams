import { ADMIN, API_VERSION, apiBaseUrl, FAQS } from "../config";
import axiosInstance from "../axios";

export const getFaqsService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data; // Return only the data part
  } catch (error) {
    throw error;
  }
};

export const createFaqService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS}`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateFaqService = async (id, lang_code, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS}/${id}`;
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

export const updateFaqStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateFaqFeatured = async (id, is_featured) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS}/featured/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { is_featured });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getFaqServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFaqServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllFaqsService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
