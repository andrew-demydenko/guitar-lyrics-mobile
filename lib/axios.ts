import axios from "axios";
import { API_URL } from "@/constants/Config";
import { clearAuthData, getAccessToken, setAccessToken } from "@/lib/auth";

interface RefreshTokenResponse {
  accessToken: string;
}

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: { resolve: Function; reject: Function }[] = [];

const processQueue = (error: any = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          return api(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const result = await axios.post<RefreshTokenResponse>(
          `${API_URL}/auth/refresh-token`,
          null,
          {
            withCredentials: true,
          }
        );
        await setAccessToken(result.data.accessToken);
        processQueue();
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        await clearAuthData();

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
