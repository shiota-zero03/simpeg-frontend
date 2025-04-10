import { SignInAuth } from "@/interface/request/auth.interface";
import { ILoginRes } from "@/interface/responses/auth.interface";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authLogin } from "./http";

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
