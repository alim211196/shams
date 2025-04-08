import { ADMIN, API_VERSION, apiBaseUrl, QUESTION } from "../config";
import axiosInstance from "../axios";

export const getAllQuestionsService = async () => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${QUESTION}/all`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPaginatedQuestionsService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${QUESTION}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addStudentQuestionService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${QUESTION}`;
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

export const updateStudentQuestionService = async (id, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${QUESTION}/${id}`;

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

export const updateStudentQuestionStatus = async (id, status) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${QUESTION}/status/${id}`;
  try {
    const res = await axiosInstance.patch(URL, { status });
    return res;
  } catch (error) {
    throw error;
  }
};

export const getStudentQuestionServiceById = async (id, lang) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${QUESTION}/${id}/${lang}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStudentQuestionServiceById = async (id) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${QUESTION}/${id}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
