import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEFilling,
  deleteEFilling,
  getAllEFilling,
  getDetailEFilling,
  updateEFilling,
} from "./http";
import { IEFillingDetailRes } from "@/interface/responses/efilling.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreEFilling } from "@/interface/request/efilling.interface";

export const useGetAllEFilling = (
  page: number,
  limit: number,
  title?: string,
  start?: string | null,
  end?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllEFilling"],
    queryFn: () => getAllEFilling(page, limit, title, start, end),
    staleTime: 300000,
  });
};
export const useCreateEFilling = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IEFillingDetailRes,
    AxiosError<BaseErrorRes>,
    StoreEFilling
  >({
    mutationFn: (formData) => createEFilling(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createEFilling"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailEFilling = (id: string) => {
  return useQuery({
    queryKey: ["getDetailEFilling", id],
    queryFn: () => getDetailEFilling(id),
    staleTime: 300000,
  });
};
export const useUpdateEFilling = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IEFillingDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreEFilling }
  >({
    mutationFn: ({ id, formData }) => updateEFilling(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateEFilling"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteEFilling = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IEFillingDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteEFilling(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteEFilling"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
