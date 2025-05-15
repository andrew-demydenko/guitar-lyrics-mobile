import { User } from "@/entities/user";
import request from "@/lib/axios";

export const getCurrentUser = async () =>
  await request.get<null, User>("/auth/current-user");
