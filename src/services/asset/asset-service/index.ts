import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAssetService,
  deleteAssetService,
  getAllAssetService,
  getAllAssetServiceExport,
  getAllAssetServiceOption,
  getDetailAssetService,
  updateAssetService,
} from "./http";
import { IAssetServiceDetailRes } from "@/interface/responses/assetService.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreAssetService } from "@/interface/request/assetService.interface";

export const useGetAllAssetServiceOption = () => {
  return useQuery({
    queryKey: ["getAllAssetServiceOption"],
    queryFn: () => getAllAssetServiceOption(),
    staleTime: 300000,
  });
};

export const useGetAllAssetServiceExport = (
  startDate?: string | null,
  endDate?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllAssetServiceExport", startDate, endDate],
    queryFn: () => getAllAssetServiceExport(startDate, endDate),
    staleTime: 300000,
  });
};
export const useGetAllAssetService = (
  page: number,
  limit: number,
  title?: string,
  startDate?: string | null,
  endDate?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllAssetService"],
    queryFn: () => getAllAssetService(page, limit, title, startDate, endDate),
    staleTime: 300000,
  });
};
export const useCreateAssetService = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IAssetServiceDetailRes,
    AxiosError<BaseErrorRes>,
    StoreAssetService
  >({
    mutationFn: (formData) => createAssetService(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createAssetService"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailAssetService = (id: string) => {
  return useQuery({
    queryKey: ["getDetailAssetService", id],
    queryFn: () => getDetailAssetService(id),
    staleTime: 300000,
  });
};
export const useUpdateAssetService = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IAssetServiceDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreAssetService }
  >({
    mutationFn: ({ id, formData }) => updateAssetService(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateAssetService"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteAssetService = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IAssetServiceDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteAssetService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteAssetService"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
