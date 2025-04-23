import instance from "@/api/axios";
import { SignInAuth } from "@/interface/request/auth.interface";
import { StorePegawai } from "@/interface/request/pegawai.interface";
import { ILoginRes } from "@/interface/responses/auth.interface";
import { IPegawaiRes } from "@/interface/responses/pegawai.interface";

export const authLogin = async (formData: SignInAuth): Promise<ILoginRes> => {
  const response = await instance.post(`/auth/login`, formData);
  return response.data;
};

export const authLogout = async (): Promise<ILoginRes> => {
  const response = await instance.post(`/auth/logout`, {});
  return response.data;
};

export const getProfile = async (): Promise<IPegawaiRes> => {
  const response = await instance.get(`/admin/profile`);
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

export const updateProfil = async (
  formData: StorePegawai,
): Promise<IPegawaiRes> => {
  const response = await instance.put(`/admin/profile/update`, formData);
  return response.data;
};

export const updatePassword = async (
  formData: StorePegawai,
): Promise<IPegawaiRes> => {
  const response = await instance.put(
    `/admin/profile/update/password`,
    formData,
  );
  return response.data;
};
