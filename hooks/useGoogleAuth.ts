"use client";

import { useRouter, useGlobalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { Linking } from "react-native";
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
  const { token } = useGlobalSearchParams();

  useEffect(() => {
    setIsInit(true);
    if (isInit) {
      if (token) {
        setAccessToken(token as string);
        router.replace("/");
      }
    }
  }, [router, token, isInit]);

  const googleLogin = async (redirectUrl: string) => {
    const authUrl = `${API_URL}/auth/google?redirect=${encodeURIComponent(redirectUrl)}`;
    setLoading(true);
    setError(null);

    try {
      const supported = await Linking.canOpenURL(authUrl);
      if (supported) {
        await Linking.openURL(authUrl);
      } else {
        console.error("Don't know how to open this URL:", authUrl);
      }
    } catch (error) {
      console.error("Failed to open URL:", error);
    }
  };

  return { loading, error, googleLogin };
};
