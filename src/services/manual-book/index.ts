import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllManualBook,
  getAllManualBookHome,
  updateManualBook,
} from "./http";
import { IManualBookRes } from "@/interface/responses/manualBook.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreManualBook } from "@/interface/request/manualBook.interface";

export const useGetAllManualBookHome = (
  page: number,
  limit: number,
  search?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllManualBookHome"],
    queryFn: () => getAllManualBookHome(page, limit, search),
    staleTime: 300000,
  });
};

export const useGetAllManualBook = (
  page: number,
  limit: number,
  search?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllManualBook"],
    queryFn: () => getAllManualBook(page, limit, search),
    staleTime: 300000,
  });
};

export const useUpdateManualBook = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IManualBookRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreManualBook }
  >({
    mutationFn: ({ id, formData }) => updateManualBook(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateManualBook"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
