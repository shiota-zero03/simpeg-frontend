import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPegawai,
  deletePegawai,
  getAllPegawai,
  getDetailPegawai,
  updatePegawai,
} from "./http";
import { IPegawaiRes } from "@/interface/responses/pegawai.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StorePegawai } from "@/interface/request/pegawai.interface";

export const useGetAllPegawai = (
  page: number,
  limit: number,
  title?: string,
) => {
  return useQuery({
    queryKey: ["getAllPegawai"],
    queryFn: () => getAllPegawai(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreatePegawai = () => {
  const queryClient = useQueryClient();
  return useMutation<IPegawaiRes, AxiosError<BaseErrorRes>, StorePegawai>({
    mutationFn: (formData) => createPegawai(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createPegawai"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailPegawai = (id: string) => {
  return useQuery({
    queryKey: ["getDetailPegawai", id],
    queryFn: () => getDetailPegawai(id),
    staleTime: 300000,
  });
};
export const useUpdatePegawai = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IPegawaiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StorePegawai }
  >({
    mutationFn: ({ id, formData }) => updatePegawai(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updatePegawai"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeletePegawai = () => {
  const queryClient = useQueryClient();
  return useMutation<IPegawaiRes, AxiosError<BaseErrorRes>, { id: string }>({
    mutationFn: ({ id }) => deletePegawai(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deletePegawai"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
