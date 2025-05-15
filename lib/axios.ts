import axios from "axios";
import { router } from "expo-router";
import { API_URL } from "@/constants/Config";
import { clearAuthData, getAccessToken, setAccessToken } from "@/lib/auth";

interface RefreshTokenResponse {
  accessToken: string;
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response): any => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const result = await api.post<null, RefreshTokenResponse>(
          `${API_URL}/auth/refresh-token`
        );
        await setAccessToken(result.accessToken);

        return api(originalRequest);
      } catch (refreshError) {
        await clearAuthData();
        router.replace("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
