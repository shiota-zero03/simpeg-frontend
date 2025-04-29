import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAsset,
  deleteAsset,
  getAllAsset,
  getAllAssetOption,
  getAllAssetOptionWithHolder,
  getDetailAsset,
  updateAsset,
} from "./http";
import { IAssetDetailRes } from "@/interface/responses/asset.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreAsset } from "@/interface/request/asset.interface";

export const useGetAllAssetOptionWithHolder = () => {
  return useQuery({
    queryKey: ["getAllAssetOptionWithHolder"],
    queryFn: () => getAllAssetOptionWithHolder(),
    staleTime: 300000,
  });
};

export const useGetAllAssetOption = () => {
  return useQuery({
    queryKey: ["getAllAssetOption"],
    queryFn: () => getAllAssetOption(),
    staleTime: 300000,
  });
};

export const useGetAllAsset = (page: number, limit: number, title?: string) => {
  return useQuery({
    queryKey: ["getAllAsset"],
    queryFn: () => getAllAsset(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation<IAssetDetailRes, AxiosError<BaseErrorRes>, StoreAsset>({
    mutationFn: (formData) => createAsset(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createAsset"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailAsset = (id: string) => {
  return useQuery({
    queryKey: ["getDetailAsset", id],
    queryFn: () => getDetailAsset(id),
    staleTime: 300000,
  });
};
export const useUpdateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IAssetDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreAsset }
  >({
    mutationFn: ({ id, formData }) => updateAsset(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateAsset"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteAsset = () => {
  const queryClient = useQueryClient();
  return useMutation<IAssetDetailRes, AxiosError<BaseErrorRes>, { id: string }>(
    {
      mutationFn: ({ id }) => deleteAsset(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["deleteAsset"] });
      },
      onError: (error) => {
        throw error;
      },
    },
  );
};
