import { ADMIN, API_VERSION, apiBaseUrl, BLOGS } from "../config";
import axiosInstance from "../axios";

export const getBlogsService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createBlogService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS}`;
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

export const updateBlogService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS}/${id}`;

  try {
    const res = await axiosInstance.patch(URL, data, {
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

export const updateBlogStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getBlogServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlogServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllBlogsService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${BLOGS}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
