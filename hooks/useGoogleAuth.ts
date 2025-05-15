"use client";

import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { API_URL } from "@/constants/Config";
import { setAccessToken } from "@/lib/auth";

interface UseGoogleAuthResult {
  loading: boolean;
  error: string | null;
  googleLogin: (redirectUrl: string) => void;
}

export const useGoogleAuth = (): UseGoogleAuthResult => {
  const [loading, setLoading] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setIsInit(true);
    if (isInit) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) {
        setAccessToken(token);
        router.replace("/");
      }
    }
  }, [router, isInit]);

  const googleLogin = (redirectUrl: string) => {
    setLoading(true);
    setError(null);

    window.location.href = `${API_URL}/auth/google?redirect=${redirectUrl}`;
  };

  return { loading, error, googleLogin };
};
