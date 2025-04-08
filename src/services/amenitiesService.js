import { ADMIN, API_VERSION, apiBaseUrl, AMENITY } from "../config";
import axiosInstance from "../axios";

export const getAllAmenitiesService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${AMENITY}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPaginatedAmenitiesService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${AMENITY}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAmenityServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${AMENITY}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createAmenityService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${AMENITY}`;
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

export const updateAmenityService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${AMENITY}/${id}`;

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

export const updateAmenityStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${AMENITY}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteAmenityServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${AMENITY}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
