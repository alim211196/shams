import { ADMIN, API_VERSION, apiBaseUrl, WEBPAGES } from "../config";
import axiosInstance from "../axios";

export const getAllPagesService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${WEBPAGES}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPaginatedPagesService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${WEBPAGES}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createWebPageService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${WEBPAGES}`;
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

export const updateWebPageService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${WEBPAGES}/${id}`;
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

export const updateWebPageContentService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${WEBPAGES}/content/${id}`;
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

export const updateWebPageStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${WEBPAGES}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getPagesServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${WEBPAGES}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPageContentService = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${WEBPAGES}/content/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWebPageServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${WEBPAGES}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
