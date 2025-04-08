import { ADMIN, API_VERSION, apiBaseUrl, ROLE } from "../config";
import axiosInstance from "../axios";

export const getAllRolesService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ROLE}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedRolesService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ROLE}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createRoleService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ROLE}`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const UpdateRoleService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ROLE}/${id}`;
  try {
    const res = await axiosInstance.patch(URL, data);

    return res;
  } catch (error) {
    throw error;
  }
};

export const updateRoleStatusService = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ROLE}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getByIdRoleService = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ROLE}/${id}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteRoleService = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${ROLE}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
