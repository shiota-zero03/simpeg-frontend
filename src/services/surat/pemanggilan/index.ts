import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSuratPemanggilan,
  deleteSuratPemanggilan,
  getAllSuratPemanggilan,
  getDetailSuratPemanggilan,
  updateSuratPemanggilan,
} from "./http";
import { ISuratPemanggilanDetaiRes } from "@/interface/responses/surat.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreSuratPemanggilan } from "@/interface/request/surat.interface";

export const useGetAllSuratPemanggilan = (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
) => {
  return useQuery({
    queryKey: ["getAllSuratPemanggilan"],
    queryFn: () => getAllSuratPemanggilan(page, limit, name, nomorSurat),
    staleTime: 300000,
  });
};
export const useCreateSuratPemanggilan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISuratPemanggilanDetaiRes,
    AxiosError<BaseErrorRes>,
    StoreSuratPemanggilan
  >({
    mutationFn: (formData) => createSuratPemanggilan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createSuratPemanggilan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailSuratPemanggilan = (id: string) => {
  return useQuery({
    queryKey: ["getDetailSuratPemanggilan", id],
    queryFn: () => getDetailSuratPemanggilan(id),
    staleTime: 300000,
  });
};
export const useUpdateSuratPemanggilan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISuratPemanggilanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreSuratPemanggilan }
  >({
    mutationFn: ({ id, formData }) => updateSuratPemanggilan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateSuratPemanggilan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteSuratPemanggilan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISuratPemanggilanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteSuratPemanggilan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteSuratPemanggilan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
