import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBeritaAcaraPemeriksaan,
  deleteBeritaAcaraPemeriksaan,
  getAllBeritaAcaraPemeriksaan,
  getDetailBeritaAcaraPemeriksaan,
  updateBeritaAcaraPemeriksaan,
} from "./http";
import { IBeritaAcaraPemeriksaanDetaiRes } from "@/interface/responses/surat.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreBeritaAcaraPemeriksaan } from "@/interface/request/surat.interface";

export const useGetAllBeritaAcaraPemeriksaan = (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
) => {
  return useQuery({
    queryKey: ["getAllBeritaAcaraPemeriksaan"],
    queryFn: () => getAllBeritaAcaraPemeriksaan(page, limit, name, nomorSurat),
    staleTime: 300000,
  });
};
export const useCreateBeritaAcaraPemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IBeritaAcaraPemeriksaanDetaiRes,
    AxiosError<BaseErrorRes>,
    StoreBeritaAcaraPemeriksaan
  >({
    mutationFn: (formData) => createBeritaAcaraPemeriksaan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["createBeritaAcaraPemeriksaan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailBeritaAcaraPemeriksaan = (id: string) => {
  return useQuery({
    queryKey: ["getDetailBeritaAcaraPemeriksaan", id],
    queryFn: () => getDetailBeritaAcaraPemeriksaan(id),
    staleTime: 300000,
  });
};
export const useUpdateBeritaAcaraPemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IBeritaAcaraPemeriksaanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreBeritaAcaraPemeriksaan }
  >({
    mutationFn: ({ id, formData }) =>
      updateBeritaAcaraPemeriksaan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["updateBeritaAcaraPemeriksaan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteBeritaAcaraPemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IBeritaAcaraPemeriksaanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteBeritaAcaraPemeriksaan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deleteBeritaAcaraPemeriksaan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
