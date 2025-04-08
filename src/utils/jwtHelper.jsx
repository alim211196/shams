import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
  try {
    if (!token) return null;
    return jwtDecode(token); // Correct way
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
