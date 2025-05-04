import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAssetHolder,
  deleteAssetHolder,
  deleteAssetHolderAll,
  getAllAssetHolder,
  getAllAssetHolderOption,
  getDetailAssetHolder,
  updateAssetHolder,
} from "./http";
import { IAssetHolderDetailRes } from "@/interface/responses/assetHolder.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreAssetHolder } from "@/interface/request/assetHolder.interface";

export const useGetAllAssetHolderOption = () => {
  return useQuery({
    queryKey: ["getAllAssetHolderOption"],
    queryFn: () => getAllAssetHolderOption(),
    staleTime: 300000,
  });
};

export const useGetAllAssetHolder = (
  page: number,
  limit: number,
  title?: string,
  startDate?: string | null,
  endDate?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllAssetHolder"],
    queryFn: () => getAllAssetHolder(page, limit, title, startDate, endDate),
    staleTime: 300000,
  });
};
export const useCreateAssetHolder = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IAssetHolderDetailRes,
    AxiosError<BaseErrorRes>,
    StoreAssetHolder[]
  >({
    mutationFn: (formData) => createAssetHolder(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createAssetHolder"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailAssetHolder = (id: string) => {
  return useQuery({
    queryKey: ["getDetailAssetHolder", id],
    queryFn: () => getDetailAssetHolder(id),
    staleTime: 300000,
  });
};
export const useUpdateAssetHolder = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IAssetHolderDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreAssetHolder }
  >({
    mutationFn: ({ id, formData }) => updateAssetHolder(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateAssetHolder"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteAssetHolder = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IAssetHolderDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteAssetHolder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteAssetHolder"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteAssetHolderAll = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IAssetHolderDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteAssetHolderAll(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteAssetHolderAll"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
