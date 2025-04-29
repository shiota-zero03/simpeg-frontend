import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createKegiatanBelanja,
  deleteKegiatanBelanja,
  getAllKegiatanBelanja,
  getAllKegiatanBelanjaOption,
  getDetailKegiatanBelanja,
  updateKegiatanBelanja,
} from "./http";
import { IKegiatanBelanjaDetailRes } from "@/interface/responses/asset.Pembelanjaaninterface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreKegiatanBelanja } from "@/interface/request/assetPembelanjaan";

export const useGetAllKegiatanBelanjaOption = () => {
  return useQuery({
    queryKey: ["getAllKegiatanBelanjaOption"],
    queryFn: () => getAllKegiatanBelanjaOption(),
    staleTime: 300000,
  });
};

export const useGetAllKegiatanBelanja = (
  page: number,
  limit: number,
  title?: string,
) => {
  return useQuery({
    queryKey: ["getAllKegiatanBelanja"],
    queryFn: () => getAllKegiatanBelanja(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateKegiatanBelanja = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IKegiatanBelanjaDetailRes,
    AxiosError<BaseErrorRes>,
    StoreKegiatanBelanja
  >({
    mutationFn: (formData) => createKegiatanBelanja(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createKegiatanBelanja"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailKegiatanBelanja = (id: string) => {
  return useQuery({
    queryKey: ["getDetailKegiatanBelanja", id],
    queryFn: () => getDetailKegiatanBelanja(id),
    staleTime: 300000,
  });
};
export const useUpdateKegiatanBelanja = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IKegiatanBelanjaDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreKegiatanBelanja }
  >({
    mutationFn: ({ id, formData }) => updateKegiatanBelanja(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateKegiatanBelanja"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteKegiatanBelanja = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IKegiatanBelanjaDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteKegiatanBelanja(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteKegiatanBelanja"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
