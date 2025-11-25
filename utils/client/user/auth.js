import { axiosClient } from "@/utils/client/axiosClient";

const login = (data) => {
  return axiosClient.post("/auth/login", data);
};
const register = (data) => {
  return axiosClient.post("/auth/register", data);
};
const logout = () => {
  return axiosClient.post("/auth/logout");
};
const me = () => {
  return axiosClient.get("/auth/me");
};
export { login, register, logout, me };
