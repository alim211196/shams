import { ADMIN, API_VERSION, apiBaseUrl, PARTNER } from "../config";
import axiosInstance from "../axios";

export const getAllPartnerService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PARTNER}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const getPaginatedPartnerService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PARTNER}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createPartnerService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PARTNER}`;
  try {
    const res = await axiosInstance.post(URL, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePartnerService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PARTNER}/${id}`;
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

export const updatePartnerStatusService = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PARTNER}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getPartnerServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PARTNER}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deletePartnerServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PARTNER}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
