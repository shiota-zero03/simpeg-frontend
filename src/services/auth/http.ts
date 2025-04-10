import instance from "@/api/axios";
import { SignInAuth } from "@/interface/request/auth.interface";
import { ILoginRes } from "@/interface/responses/auth.interface";

export const authLogin = async (formData: SignInAuth): Promise<ILoginRes> => {
  const response = await instance.post(`/auth/login`, formData);
  return response.data;
};
