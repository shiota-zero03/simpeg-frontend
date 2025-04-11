import instance from "@/api/axios";
import { SignInAuth } from "@/interface/request/auth.interface";
import { ILoginRes } from "@/interface/responses/auth.interface";

export const authLogin = async (formData: SignInAuth): Promise<ILoginRes> => {
  const response = await instance.post(`/auth/login`, formData);
  return response.data;
};

export const authLogout = async (): Promise<ILoginRes> => {
  const response = await instance.post(`/auth/logout`, {});
  return response.data;
};

export const requestRefreshToken = async (
  refreshToken: string,
): Promise<ILoginRes> => {
  const response = await instance.post(`/auth/refresh-token`, {
    refreshToken,
  });
  return response.data;
};
