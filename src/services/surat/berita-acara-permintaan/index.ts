import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBeritaAcaraPermintaan,
  deleteBeritaAcaraPermintaan,
  getAllBeritaAcaraPermintaan,
  getDetailBeritaAcaraPermintaan,
  updateBeritaAcaraPermintaan,
} from "./http";
import { IBeritaAcaraPermintaanDetaiRes } from "@/interface/responses/surat.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreBeritaAcaraPermintaan } from "@/interface/request/surat.interface";

export const useGetAllBeritaAcaraPermintaan = (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
) => {
  return useQuery({
    queryKey: ["getAllBeritaAcaraPermintaan"],
    queryFn: () => getAllBeritaAcaraPermintaan(page, limit, name, nomorSurat),
    staleTime: 300000,
  });
};
export const useCreateBeritaAcaraPermintaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IBeritaAcaraPermintaanDetaiRes,
    AxiosError<BaseErrorRes>,
    StoreBeritaAcaraPermintaan
  >({
    mutationFn: (formData) => createBeritaAcaraPermintaan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["createBeritaAcaraPermintaan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailBeritaAcaraPermintaan = (id: string) => {
  return useQuery({
    queryKey: ["getDetailBeritaAcaraPermintaan", id],
    queryFn: () => getDetailBeritaAcaraPermintaan(id),
    staleTime: 300000,
  });
};
export const useUpdateBeritaAcaraPermintaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IBeritaAcaraPermintaanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreBeritaAcaraPermintaan }
  >({
    mutationFn: ({ id, formData }) => updateBeritaAcaraPermintaan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["updateBeritaAcaraPermintaan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteBeritaAcaraPermintaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IBeritaAcaraPermintaanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteBeritaAcaraPermintaan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deleteBeritaAcaraPermintaan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
