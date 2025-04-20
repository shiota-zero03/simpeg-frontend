import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createIKP,
  deleteIKP,
  getAllIKP,
  getDetailIKP,
  updateIKP,
} from "./http";
import { IIKPDetailRes } from "@/interface/responses/ikp.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreIKP } from "@/interface/request/ikp.interface";
import store from "@/redux/store";

export const useGetAllIKP = (
  page: number,
  limit: number,
  title?: string,
  month?: string,
  year?: string,
) => {
  let { role } = store.getState().auth;
  return useQuery({
    queryKey: ["getAllIKP", role],
    queryFn: () => getAllIKP(page, limit, title, month, year),
    staleTime: 300000,
  });
};
export const useCreateIKP = () => {
  const queryClient = useQueryClient();
  return useMutation<IIKPDetailRes, AxiosError<BaseErrorRes>, StoreIKP>({
    mutationFn: (formData) => createIKP(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createIKP"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailIKP = (id: string) => {
  return useQuery({
    queryKey: ["getDetailIKP", id],
    queryFn: () => getDetailIKP(id),
    staleTime: 300000,
  });
};
export const useUpdateIKP = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IIKPDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreIKP }
  >({
    mutationFn: ({ id, formData }) => updateIKP(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateIKP"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteIKP = () => {
  const queryClient = useQueryClient();
  return useMutation<IIKPDetailRes, AxiosError<BaseErrorRes>, { id: string }>({
    mutationFn: ({ id }) => deleteIKP(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteIKP"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
