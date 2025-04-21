import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createIKP,
  deleteIKP,
  getAllIKP,
  getDetailIKP,
  updateIKP,
  updateStatusIKP,
  updateStatusPerubahanIKP,
} from "./http";
import { IIKPDetailRes } from "@/interface/responses/ikp.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import {
  StoreIKP,
  StoreIKPPerubahan,
  StoreIKPSetuju,
} from "@/interface/request/ikp.interface";
import store from "@/redux/store";

export const useGetAllIKP = (
  page: number,
  limit: number,
  title?: string,
  month?: string,
  year?: string,
) => {
  const { role } = store.getState().auth;
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
export const useUpdateStatusIKP = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IIKPDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: { status: string } }
  >({
    mutationFn: ({ id, formData }) => updateStatusIKP(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateStatusIKP"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useUpdateStatusPerubahanIKP = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IIKPDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreIKPPerubahan }
  >({
    mutationFn: ({ id, formData }) => updateStatusPerubahanIKP(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateStatusPerubahanIKP"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useUpdateIKP = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IIKPDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreIKPSetuju }
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
