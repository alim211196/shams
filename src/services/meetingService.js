import { ADMIN, API_VERSION, apiBaseUrl, MEETING } from "../config";
import axiosInstance from "../axios";

export const getMeetingService = async (page = 1, limit = 10) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${MEETING}?page=${page}&limit=${limit}`;
  try {
    const res = await axiosInstance.get(URL);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createMeetingService = async (data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${MEETING}/create`;
  try {
    const res = await axiosInstance.post(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const updateMeetingService = async (meetingId, data) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${MEETING}/update/${meetingId}`;
  try {
    const res = await axiosInstance.patch(URL, data);
    return res;
  } catch (error) {
    throw error;
  }
};

export const getMeetingServiceById = async (meetingId) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${MEETING}/${meetingId}`;
  try {
    const res = await axiosInstance.get(URL);
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteMeetingServiceById = async (meetingId) => {
  const URL = `${apiBaseUrl}${ADMIN}${API_VERSION}${MEETING}/${meetingId}`;
  try {
    const res = await axiosInstance.delete(URL);
    return res;
  } catch (error) {
    throw error;
  }
};
