import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createEDisposisi,
  teruskanEDisposisi,
  verifikasiEDisposisi,
  deleteEDisposisi,
  getAllEDisposisi,
  getDetailEDisposisi,
} from "./http";
import { IEDisposisiRes } from "@/interface/responses/e-disposisi.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreEDisposisi } from "@/interface/request/e-disposisi.interface";

export const useGetAllEDisposisi = (
  page: number,
  limit: number,
  title?: string,
  start?: string | null,
  end?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllEDisposisi"],
    queryFn: () => getAllEDisposisi(page, limit, title, start, end),
    staleTime: 300000,
  });
};
export const useCreateEDisposisi = () => {
  const queryClient = useQueryClient();
  return useMutation<IEDisposisiRes, AxiosError<BaseErrorRes>, StoreEDisposisi>(
    {
      mutationFn: (formData) => createEDisposisi(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["createEDisposisi"] });
      },
      onError: (error) => {
        throw error;
      },
    },
  );
};
export const useGetDetailEDisposisi = (id: string) => {
  return useQuery({
    queryKey: ["getDetailEDisposisi", id],
    queryFn: () => getDetailEDisposisi(id),
    staleTime: 300000,
  });
};

export const useDeleteEDisposisi = () => {
  const queryClient = useQueryClient();
  return useMutation<IEDisposisiRes, AxiosError<BaseErrorRes>, { id: string }>({
    mutationFn: ({ id }) => deleteEDisposisi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteEDisposisi"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useTeruskanEDisposisi = () => {
  const queryClient = useQueryClient();
  return useMutation<IEDisposisiRes, AxiosError<BaseErrorRes>, { id: string }>({
    mutationFn: ({ id }) => teruskanEDisposisi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teruskanEDisposisi"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};

export const useVerifikasiEDisposisi = () => {
  const queryClient = useQueryClient();
  return useMutation<IEDisposisiRes, AxiosError<BaseErrorRes>, StoreEDisposisi>(
    {
      mutationFn: (formData) => verifikasiEDisposisi(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["verifikasiEDisposisi"] });
      },
      onError: (error) => {
        throw error;
      },
    },
  );
};
