"use client";

import { useEffect } from "react";
import { trackPageView } from "@/utils/client/user/trackingApi";

const useTrackUserPageView = (username) => {
  useEffect(() => {
    if (!username) return;

    trackPageView(`/user/${username}`).catch(() => {});
  }, [username]);
};

export default useTrackUserPageView;
