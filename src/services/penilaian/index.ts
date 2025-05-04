import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPenilaian, getAllPenilaian, getAllPenilaianCount, getDetailPenilaian } from "./http";
import { IPenilaianDetailRes } from "@/interface/responses/penilaian.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StorePenilaian } from "@/interface/request/penilaian.interface";

export const useGetAllPenilaianGrafik = (
  yearly?: string,
) => {
  return useQuery({
    queryKey: ["getAllPenilaianCount"],
    queryFn: () => getAllPenilaianCount(yearly),
    staleTime: 300000,
  });
};
export const useGetAllPenilaian = (
  page: number,
  limit: number,
  title?: string,
  monthly?: string,
  yearly?: string,
) => {
  return useQuery({
    queryKey: ["getAllPenilaian"],
    queryFn: () => getAllPenilaian(page, limit, title, monthly, yearly),
    staleTime: 300000,
  });
};
export const useGetDetailPenilaian = (
  id: string,
  monthly?: string,
  yearly?: string,
) => {
  return useQuery({
    queryKey: ["getDetailPenilaian", monthly, yearly],
    queryFn: () => getDetailPenilaian(id, monthly, yearly),
    staleTime: 300000,
  });
};

export const useCreatePenilaian = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IPenilaianDetailRes,
    AxiosError<BaseErrorRes>,
    StorePenilaian
  >({
    mutationFn: (formData) => createPenilaian(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createPenilaian"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
