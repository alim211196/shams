import { ADMIN, API_VERSION, apiBaseUrl, BLOGS_CATEGORY } from "../config";
import axiosInstance from "../axios";

export const getAllBlogCategoryService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS_CATEGORY}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getPaginatedBlogCategoryService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS_CATEGORY}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createBlogCategoryService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS_CATEGORY}`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateBlogCategoryService = async (id, lang_code, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS_CATEGORY}/${id}`;
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

export const updateBlogCategoryStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS_CATEGORY}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getBlogCategoryServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS_CATEGORY}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBlogCategoryServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS_CATEGORY}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
