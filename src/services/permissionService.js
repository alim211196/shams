import { ADMIN, API_VERSION, apiBaseUrl, PERMISSION } from "../config";
import axiosInstance from "../axios";

export const getAllPermissionsService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PERMISSION}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedPermissionsService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PERMISSION}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createPermissionService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PERMISSION}`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const UpdatePermissionService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PERMISSION}/${id}`;
  try {
    const res = await axiosInstance.patch(URL, data);

    return res;
  } catch (error) {
    throw error;
  }
};

export const updatePermissionStatusService = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PERMISSION}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getByIdPermissionService = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PERMISSION}/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deletePermissionService = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${PERMISSION}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
