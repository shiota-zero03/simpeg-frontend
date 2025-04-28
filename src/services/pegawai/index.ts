import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPegawai,
  createSuratPegawai,
  deletePegawai,
  deleteSuratPegawai,
  getAllPegawai,
  getAllPegawaiOption,
  getAllPegawaiPimpinanOption,
  getAllSuratPegawai,
  getDetailPegawai,
  getDetailSuratPegawai,
  updatePegawai,
  updateSuratPegawai,
} from "./http";
import {
  IPegawaiRes,
  ISuratPegawaiRes,
} from "@/interface/responses/pegawai.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import {
  StorePegawai,
  StoreSuratPegawai,
} from "@/interface/request/pegawai.interface";

export const useGetAllPegawaiOption = () => {
  return useQuery({
    queryKey: ["getAllPegawaiOption"],
    queryFn: () => getAllPegawaiOption(),
    staleTime: 300000,
  });
};

export const useGetAllPegawaiPimpinanOption = () => {
  return useQuery({
    queryKey: ["getAllPegawaiPimpinanOption"],
    queryFn: () => getAllPegawaiPimpinanOption(),
    staleTime: 300000,
  });
};

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

export const useGetAllSuratPegawai = (
  page: number,
  limit: number,
  title?: string,
) => {
  return useQuery({
    queryKey: ["getAllSuratPegawai"],
    queryFn: () => getAllSuratPegawai(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateSuratPegawai = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISuratPegawaiRes,
    AxiosError<BaseErrorRes>,
    StoreSuratPegawai
  >({
    mutationFn: (formData) => createSuratPegawai(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createSuratPegawai"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailSuratPegawai = (id: string) => {
  return useQuery({
    queryKey: ["getDetailSuratPegawai", id],
    queryFn: () => getDetailSuratPegawai(id),
    staleTime: 300000,
  });
};
export const useUpdateSuratPegawai = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISuratPegawaiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreSuratPegawai }
  >({
    mutationFn: ({ id, formData }) => updateSuratPegawai(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateSuratPegawai"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteSuratPegawai = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISuratPegawaiRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteSuratPegawai(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteSuratPegawai"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
