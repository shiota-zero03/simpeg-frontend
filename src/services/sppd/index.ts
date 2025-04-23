import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSPPD,
  deleteSPPD,
  getAllSPPD,
  getDetailSPPD,
  updateSPPD,
} from "./http";
import { ISPPDDetailRes } from "@/interface/responses/sppd.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreSPPD } from "@/interface/request/sppd.interface";

export const useGetAllSPPD = (
  page: number,
  limit: number,
  title?: string,
  job?: string,
  start?: string | null,
  end?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllSPPD"],
    queryFn: () => getAllSPPD(page, limit, title, job, start, end),
    staleTime: 300000,
  });
};
export const useCreateSPPD = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISPPDDetailRes,
    AxiosError<BaseErrorRes>,
    StoreSPPD
  >({
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
  return useMutation<
    ISPPDDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteSPPD(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteSPPD"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
