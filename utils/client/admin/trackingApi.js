import { axiosClient } from "@/utils/client/axiosClient";

const getAllClicksAdmin = async () => {
  return await axiosClient.get("/track/click");
};

const getMonthlyPageViewsAdmin = async () => {
  return await axiosClient.get("/track/view");
};

const getUserAnalyticsForAdmin = async (username) => {
  if (!username) {
    throw new Error("Username is required");
  }
  return await axiosClient.get(
    `/admin/tracking/${encodeURIComponent(username)}`,
  );
};

const resetAllTrackingData = async () => {
  return await axiosClient.delete("/admin/tracking/reset");
};

const resetUserTrackingData = async (username) => {
  if (!username) {
    throw new Error("Username is required");
  }
  return await axiosClient.delete(
    `/admin/tracking/reset/${encodeURIComponent(username)}`,
  );
};

export {
  getAllClicksAdmin,
  getMonthlyPageViewsAdmin,
  getUserAnalyticsForAdmin,
  resetAllTrackingData,
  resetUserTrackingData,
};
