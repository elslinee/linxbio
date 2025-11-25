"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { me } from "@/utils/client/user/auth";

export default function AuthInit() {
  const setUser = useAuthStore((s) => s.setUser);
  const clearUser = useAuthStore((s) => s.clearUser);
  const stopLoading = useAuthStore((s) => s.stopLoading);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await me();

        if (res.status === 200 && res.data?.data) {
          setUser(res.data.data);
        } else {
          clearUser();
        }
      } catch (err) {
        clearUser();
      } finally {
        stopLoading();
      }
    };

    checkUser();
  }, []);

  return null;
}
