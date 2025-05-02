import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createJabatan,
  deleteJabatan,
  getAllJabatan,
  getAllJabatanHirarki,
  getAllJabatanOption,
  getDetailJabatan,
  updateJabatan,
} from "./http";
import { IJabatanDetailRes } from "@/interface/responses/jabatan.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreJabatan } from "@/interface/request/jabatan.interface";

export const useGetAllJabatanHirarki = () => {
  return useQuery({
    queryKey: ["getAllJabatanHirarki"],
    queryFn: () => getAllJabatanHirarki(),
    staleTime: 300000,
  });
};

export const useGetAllJabatanOption = () => {
  return useQuery({
    queryKey: ["getAllJabatanOption"],
    queryFn: () => getAllJabatanOption(),
    staleTime: 300000,
  });
};

export const useGetAllJabatan = (
  page: number,
  limit: number,
  title?: string,
) => {
  return useQuery({
    queryKey: ["getAllJabatan"],
    queryFn: () => getAllJabatan(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateJabatan = () => {
  const queryClient = useQueryClient();
  return useMutation<IJabatanDetailRes, AxiosError<BaseErrorRes>, StoreJabatan>(
    {
      mutationFn: (formData) => createJabatan(formData),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["createJabatan"] });
      },
      onError: (error) => {
        throw error;
      },
    },
  );
};
export const useGetDetailJabatan = (id: string) => {
  return useQuery({
    queryKey: ["getDetailJabatan", id],
    queryFn: () => getDetailJabatan(id),
    staleTime: 300000,
  });
};
export const useUpdateJabatan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IJabatanDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreJabatan }
  >({
    mutationFn: ({ id, formData }) => updateJabatan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateJabatan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteJabatan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IJabatanDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteJabatan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteJabatan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
