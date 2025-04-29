import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDataBelanja,
  deleteDataBelanja,
  getAllDataBelanja,
  getAllDataBelanjaOption,
  getDetailDataBelanja,
  updateDataBelanja,
} from "./http";
import { IDataBelanjaDetailRes } from "@/interface/responses/asset.Pembelanjaaninterface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreDataBelanja } from "@/interface/request/assetPembelanjaan";

export const useGetAllDataBelanjaOption = () => {
  return useQuery({
    queryKey: ["getAllDataBelanjaOption"],
    queryFn: () => getAllDataBelanjaOption(),
    staleTime: 300000,
  });
};

export const useGetAllDataBelanja = (page: number, limit: number, title?: string) => {
  return useQuery({
    queryKey: ["getAllDataBelanja"],
    queryFn: () => getAllDataBelanja(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateDataBelanja = () => {
  const queryClient = useQueryClient();
  return useMutation<IDataBelanjaDetailRes, AxiosError<BaseErrorRes>, StoreDataBelanja>({
    mutationFn: (formData) => createDataBelanja(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createDataBelanja"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailDataBelanja = (id: string) => {
  return useQuery({
    queryKey: ["getDetailDataBelanja", id],
    queryFn: () => getDetailDataBelanja(id),
    staleTime: 300000,
  });
};
export const useUpdateDataBelanja = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IDataBelanjaDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreDataBelanja }
  >({
    mutationFn: ({ id, formData }) => updateDataBelanja(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateDataBelanja"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteDataBelanja = () => {
  const queryClient = useQueryClient();
  return useMutation<IDataBelanjaDetailRes, AxiosError<BaseErrorRes>, { id: string }>(
    {
      mutationFn: ({ id }) => deleteDataBelanja(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["deleteDataBelanja"] });
      },
      onError: (error) => {
        throw error;
      },
    },
  );
};
