import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSuratPemeriksaan,
  deleteSuratPemeriksaan,
  getAllListSuratPemeriksaan,
  getAllSuratPemeriksaan,
  getDetailSuratPemeriksaan,
  updateSuratPemeriksaan,
} from "./http";
import { ISuratPemeriksaanDetaiRes } from "@/interface/responses/surat.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreSuratPemeriksaan } from "@/interface/request/surat.interface";

export const useGetAllSuratPemeriksaan = (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
) => {
  return useQuery({
    queryKey: ["getAllSuratPemeriksaan"],
    queryFn: () => getAllSuratPemeriksaan(page, limit, name, nomorSurat),
    staleTime: 300000,
  });
};
export const useGetAllListSuratPemeriksaan = () => {
  return useQuery({
    queryKey: ["getAllListSuratPemeriksaan"],
    queryFn: () => getAllListSuratPemeriksaan(),
    staleTime: 300000,
  });
};
export const useCreateSuratPemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISuratPemeriksaanDetaiRes,
    AxiosError<BaseErrorRes>,
    StoreSuratPemeriksaan
  >({
    mutationFn: (formData) => createSuratPemeriksaan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createSuratPemeriksaan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailSuratPemeriksaan = (id: string) => {
  return useQuery({
    queryKey: ["getDetailSuratPemeriksaan", id],
    queryFn: () => getDetailSuratPemeriksaan(id),
    staleTime: 300000,
  });
};
export const useUpdateSuratPemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISuratPemeriksaanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreSuratPemeriksaan }
  >({
    mutationFn: ({ id, formData }) => updateSuratPemeriksaan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateSuratPemeriksaan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteSuratPemeriksaan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISuratPemeriksaanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteSuratPemeriksaan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteSuratPemeriksaan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
