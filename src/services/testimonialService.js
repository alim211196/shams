import { ADMIN, API_VERSION, apiBaseUrl, TESTIMONIAL } from "../config";
import axiosInstance from "../axios";

export const getTestimonialService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TESTIMONIAL}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createTestimonialService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TESTIMONIAL}`;
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

export const updateTestimonialService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TESTIMONIAL}/${id}`;
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
export const updateTestimonialStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TESTIMONIAL}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getTestimonialServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TESTIMONIAL}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTestimonialServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TESTIMONIAL}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getAllTestimonialService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${TESTIMONIAL}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};
