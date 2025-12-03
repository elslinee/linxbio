import { axiosClient } from "@/utils/client/axiosClient";

/* ===============================
   Page Views
================================== */

// Track visit
const trackPageView = async (slug) => {
  return axiosClient.post("/track/view", { slug });
};

const getMonthlyPageViews = async (username) => {
  return axiosClient.get(`/track/view?username=${username}`);
};

/* ===============================
   Clicks
================================== */

const trackClick = async (action) => {
  return axiosClient.post("/track/click", { action });
};

const getAllClicks = async (username) => {
  return await axiosClient.get(`/track/click?username=${username}`);
};

export { trackPageView, getMonthlyPageViews, trackClick, getAllClicks };
