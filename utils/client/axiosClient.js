import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const axiosClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});
