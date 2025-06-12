import AsyncStorage from "@react-native-async-storage/async-storage";
import * as AuthSession from "expo-auth-session";
import { useRouter, useGlobalSearchParams, Href } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import { API_URL } from "@/constants/Config";
import { setAccessToken } from "@/lib/auth";

const RETURN_TO_ROUTE_KEY = "@auth_return_to";
const SCHEME = "guitarlyrics";

interface UseGoogleAuthResult {
  loading: boolean;
  googleLogin: (returnPath?: string) => void;
}

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = (): UseGoogleAuthResult => {
  const [loading, setLoading] = useState(false);
  const [isInit, setIsInit] = useState(false);
  const router = useRouter();
  const { token } = useGlobalSearchParams();

  useEffect(() => {
    setIsInit(true);
    if (isInit && token) {
      const handleAuth = async () => {
        try {
          await setAccessToken(token as string);
          const savedReturnTo = await AsyncStorage.getItem(RETURN_TO_ROUTE_KEY);
          await AsyncStorage.removeItem(RETURN_TO_ROUTE_KEY);

          router.push((savedReturnTo as Href) || "/(tabs)");
        } catch (_error) {
          Toast.show({
            text1: "Ошибка при обработке авторизации",
            type: "error",
          });
        }
      };
      handleAuth();
    }
  }, [router, token, isInit]);

  const googleLogin = async (returnPath: string = "/(tabs)") => {
    await AsyncStorage.setItem(RETURN_TO_ROUTE_KEY, returnPath);
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: SCHEME,
      preferLocalhost: true,
      isTripleSlashed: true,
    });

    const authUrl = `${API_URL}/auth/google?redirect=${encodeURIComponent(redirectUri)}`;

    setLoading(true);

    try {
      const result = await WebBrowser.openAuthSessionAsync(
        authUrl,
        redirectUri,
        {
          showInRecents: true,
          preferEphemeralSession: false,
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
        }
      );

      if (result.type === "cancel") {
        Toast.show({
          text1: "Авторизация отменена",
          type: "error",
        });
      } else if (result.type === "success") {
        const params = new URLSearchParams(result.url.split("?")[1]);
        const tokenFromUrl = params.get("token");
        if (tokenFromUrl) {
          await setAccessToken(tokenFromUrl);
          router.push("/(tabs)");
        }
      }
    } catch (error) {
      console.error("Failed to open auth session:", error);
      Toast.show({
        text1: "Ошибка авторизации",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, googleLogin: googleLogin };
};
