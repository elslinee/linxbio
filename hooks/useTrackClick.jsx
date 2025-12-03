"use client";

import { trackClick } from "@/utils/client/user/trackingApi";

const useTrackClick = () => {
  const logClick = (action) => {
    trackClick(action).catch(() => {});
  };

  return logClick;
};

export default useTrackClick;
