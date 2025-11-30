import { axiosClient } from "@/utils/client/axiosClient";

const redeemSerialKey = (key) => {
  return axiosClient.post("/serial-keys/redeem", { key });
};

export { redeemSerialKey };
