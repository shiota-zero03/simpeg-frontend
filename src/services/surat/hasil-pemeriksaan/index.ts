import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHasilPemeriksaan,
  deleteHasilPemeriksaan,
  getAllHasilPemeriksaan,
  getDetailHasilPemeriksaan,
  updateHasilPemeriksaan,
} from "./http";
import { IHasilPemeriksaanDetaiRes } from "@/interface/responses/surat.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreHasilPemeriksaan } from "@/interface/request/surat.interface";

export const useGetAllHasilPemeriksaan = (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
) => {
  return useQuery({
    queryKey: ["getAllHasilPemeriksaan"],
    queryFn: () => getAllHasilPemeriksaan(page, limit, name, nomorSurat),
    staleTime: 300000,
  });
};
export const useCreateHasilPemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IHasilPemeriksaanDetaiRes,
    AxiosError<BaseErrorRes>,
    StoreHasilPemeriksaan
  >({
    mutationFn: (formData) => createHasilPemeriksaan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["createHasilPemeriksaan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailHasilPemeriksaan = (id: string) => {
  return useQuery({
    queryKey: ["getDetailHasilPemeriksaan", id],
    queryFn: () => getDetailHasilPemeriksaan(id),
    staleTime: 300000,
  });
};
export const useUpdateHasilPemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IHasilPemeriksaanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreHasilPemeriksaan }
  >({
    mutationFn: ({ id, formData }) => updateHasilPemeriksaan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["updateHasilPemeriksaan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteHasilPemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IHasilPemeriksaanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteHasilPemeriksaan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deleteHasilPemeriksaan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
