import { axiosClient } from "@/utils/client/axiosClient";
const getAllUsers = () => {
  return axiosClient.get("/admin/users");
};

const getUserById = (id) => {
  return axiosClient.get(`/admin/users/${id}`);
};

const updateUser = (id, data) => {
  return axiosClient.patch(`/admin/users/${id}`, data);
};

const deleteUser = (id) => {
  return axiosClient.delete(`/admin/users/${id}`);
};

export { getAllUsers, getUserById, updateUser, deleteUser };
