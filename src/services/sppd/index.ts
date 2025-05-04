import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPelaporanSPPD,
  createSPPD,
  deletePelaporanSPPD,
  deleteSPPD,
  getAllPelaporanSPPD,
  getAllSPPD,
  getAllSPPDRekap,
  getAllSPPDRekapAll,
  getAllSPPDUser,
  getDetailPelaporanSPPD,
  getDetailSPPD,
  updatePelaporanSPPD,
  updateSPPD,
} from "./http";
import {
  IPelaporanSPPDRes,
  ISPPDDetailRes,
} from "@/interface/responses/sppd.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import {
  StorePelaporanSPPD,
  StoreSPPD,
} from "@/interface/request/sppd.interface";

export const useGetAllSPPDUserAll = (
  start?: string | null,
  end?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllSPPDRekapAll", start, end],
    queryFn: () => getAllSPPDRekapAll(start, end),
    staleTime: 300000,
  });
};
export const useGetAllSPPDUser = (
  page: number,
  limit: number,
  title?: string,
  type?: string,
  nomorSurat?: string,
  start?: string | null,
  end?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllSPPDUser", type],
    queryFn: () =>
      getAllSPPDUser(page, limit, title, type, nomorSurat, start, end),
    staleTime: 300000,
  });
};
export const useGetAllSPPDRekap = (
  page: number,
  limit: number,
  title?: string,
  type?: string,
  nomorSurat?: string,
  start?: string | null,
  end?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllSPPDRekap", type],
    queryFn: () =>
      getAllSPPDRekap(page, limit, title, type, nomorSurat, start, end),
    staleTime: 300000,
  });
};
export const useGetAllSPPD = (
  page: number,
  limit: number,
  title?: string,
  type?: string,
  nomorSurat?: string,
  start?: string | null,
  end?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllSPPD", type],
    queryFn: () => getAllSPPD(page, limit, title, type, nomorSurat, start, end),
    staleTime: 300000,
  });
};
export const useCreateSPPD = () => {
  const queryClient = useQueryClient();
  return useMutation<ISPPDDetailRes, AxiosError<BaseErrorRes>, StoreSPPD>({
    mutationFn: (formData) => createSPPD(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createSPPD"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailSPPD = (id: string) => {
  return useQuery({
    queryKey: ["getDetailSPPD", id],
    queryFn: () => getDetailSPPD(id),
    staleTime: 300000,
  });
};
export const useUpdateSPPD = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISPPDDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreSPPD }
  >({
    mutationFn: ({ id, formData }) => updateSPPD(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateSPPD"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteSPPD = () => {
  const queryClient = useQueryClient();
  return useMutation<ISPPDDetailRes, AxiosError<BaseErrorRes>, { id: string }>({
    mutationFn: ({ id }) => deleteSPPD(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteSPPD"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetAllPelaporanSPPD = (
  page: number,
  limit: number,
  title?: string,
) => {
  return useQuery({
    queryKey: ["getAllPelaporanSPPD"],
    queryFn: () => getAllPelaporanSPPD(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreatePelaporanSPPD = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IPelaporanSPPDRes,
    AxiosError<BaseErrorRes>,
    StorePelaporanSPPD
  >({
    mutationFn: (formData) => createPelaporanSPPD(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createPelaporanSPPD"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailPelaporanSPPD = (id: string) => {
  return useQuery({
    queryKey: ["getDetailPelaporanSPPD", id],
    queryFn: () => getDetailPelaporanSPPD(id),
    staleTime: 300000,
  });
};
export const useUpdatePelaporanSPPD = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IPelaporanSPPDRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StorePelaporanSPPD }
  >({
    mutationFn: ({ id, formData }) => updatePelaporanSPPD(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updatePelaporanSPPD"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeletePelaporanSPPD = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IPelaporanSPPDRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deletePelaporanSPPD(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deletePelaporanSPPD"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
