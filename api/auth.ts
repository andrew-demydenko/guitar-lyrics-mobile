import { User } from "@/entities/user";
import request from "@/lib/axios";

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => request.post<{ user: User; accessToken: string }>("/auth/register", data);

export const login = (data: { email: string; password: string }) =>
  request.post<{ user: User; accessToken: string }>("/auth//login", data);

export const googleAuth = () =>
  request.get<{ user: User; accessToken: string }>("/auth//google");

export const refreshToken = () =>
  request.post<{ accessToken: string }>("/auth//refresh-token");

export const logout = () =>
  request.post<{ accessToken: string }>("/auth//logout");
