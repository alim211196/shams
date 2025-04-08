import { ADMIN, API_VERSION, apiBaseUrl, STAFF } from "../config";
import axiosInstance from "../axios";

export const getAllStaffService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAFF}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedStaffService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAFF}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createStaffService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAFF}`;
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

export const loginService = async (credential) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAFF}/login`;
  try {
    const res = await axiosInstance.post(URL, credential);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getUserDetailsService = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAFF}/auth/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const UpdateStaffService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAFF}/${id}`;
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

export const updateStaffStatusService = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAFF}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getByIdStaffService = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAFF}/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteStaffService = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${STAFF}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
