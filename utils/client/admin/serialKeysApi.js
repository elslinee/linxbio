import { axiosClient } from "@/utils/client/axiosClient";

const getSerialKeys = () => {
  return axiosClient.get("/admin/serial-keys");
};

const generateSerialKey = () => {
  return axiosClient.post("/admin/serial-keys");
};

export { getSerialKeys, generateSerialKey };
