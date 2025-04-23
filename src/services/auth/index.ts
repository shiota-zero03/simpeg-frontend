import { SignInAuth } from "@/interface/request/auth.interface";
import { ILoginRes } from "@/interface/responses/auth.interface";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authLogin, getProfile, updatePassword, updateProfil } from "./http";
import { IPegawaiRes } from "@/interface/responses/pegawai.interface";
import { StorePegawai } from "@/interface/request/pegawai.interface";

export const useAuthSignIn = () => {
  const queryClient = useQueryClient();
  return useMutation<ILoginRes, AxiosError<BaseErrorRes>, SignInAuth>({
    mutationFn: (formData) => authLogin(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authLogin"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: ["getProfile"],
    queryFn: () => getProfile(),
    staleTime: 300000,
  });
};

export const useUpdateProfil = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IPegawaiRes,
    AxiosError<BaseErrorRes>,
    StorePegawai
  >({
    mutationFn: (formData) => updateProfil(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateProfil"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IPegawaiRes,
    AxiosError<BaseErrorRes>,
    StorePegawai
  >({
    mutationFn: (formData) => updatePassword(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updatePassword"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};