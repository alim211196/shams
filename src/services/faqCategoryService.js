import { ADMIN, API_VERSION, apiBaseUrl, FAQS_CATEGORY } from "../config";
import axiosInstance from "../axios";

export const getAllFaqCategoryService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS_CATEGORY}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getPaginatedFaqCategoryService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS_CATEGORY}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createFaqCategoryService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS_CATEGORY}`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateFaqCategoryService = async (id, lang_code, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS_CATEGORY}/${id}`;
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

export const updateFaqCategoryStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS_CATEGORY}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getFaqCategoryServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS_CATEGORY}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteFaqCategoryServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${FAQS_CATEGORY}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
