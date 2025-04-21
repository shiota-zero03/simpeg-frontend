import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createKeputusan,
  deleteKeputusan,
  getAllKeputusan,
  getDetailKeputusan,
  updateKeputusan,
} from "./http";
import { IKeputusanDetaiRes } from "@/interface/responses/surat.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreKeputusan } from "@/interface/request/surat.interface";

export const useGetAllKeputusan = (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
) => {
  return useQuery({
    queryKey: ["getAllKeputusan"],
    queryFn: () => getAllKeputusan(page, limit, name, nomorSurat),
    staleTime: 300000,
  });
};
export const useCreateKeputusan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IKeputusanDetaiRes,
    AxiosError<BaseErrorRes>,
    StoreKeputusan
  >({
    mutationFn: (formData) => createKeputusan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["createKeputusan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailKeputusan = (id: string) => {
  return useQuery({
    queryKey: ["getDetailKeputusan", id],
    queryFn: () => getDetailKeputusan(id),
    staleTime: 300000,
  });
};
export const useUpdateKeputusan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IKeputusanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreKeputusan }
  >({
    mutationFn: ({ id, formData }) => updateKeputusan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["updateKeputusan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteKeputusan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IKeputusanDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteKeputusan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deleteKeputusan"],
      });
    },
    onError: (error) => {
      throw error;
    },
  });
};
