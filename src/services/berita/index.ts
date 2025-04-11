import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBerita,
  deleteBerita,
  getAllBerita,
  getAllBeritaHome,
  getDetailBerita,
  getDetailBeritaHome,
  updateBerita,
} from "./http";
import { IBeritaRes } from "@/interface/responses/berita.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreBerita } from "@/interface/request/berita.interface";

export const useGetAllBeritaHome = (
  page: number,
  limit: number,
  search?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllBeritaHome"],
    queryFn: () => getAllBeritaHome(page, limit, search),
    staleTime: 300000,
  });
};
export const useGetDetailBeritaHome = (id: string) => {
  return useQuery({
    queryKey: ["getDetailBeritaHome", id],
    queryFn: () => getDetailBeritaHome(id),
    staleTime: 300000,
  });
};

export const useGetAllBerita = (
  page: number,
  limit: number,
  title?: string,
) => {
  return useQuery({
    queryKey: ["getAllBerita"],
    queryFn: () => getAllBerita(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateBerita = () => {
  const queryClient = useQueryClient();
  return useMutation<IBeritaRes, AxiosError<BaseErrorRes>, StoreBerita>({
    mutationFn: (formData) => createBerita(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createBerita"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailBerita = (id: string) => {
  return useQuery({
    queryKey: ["getDetailBerita", id],
    queryFn: () => getDetailBerita(id),
    staleTime: 300000,
  });
};
export const useUpdateBerita = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IBeritaRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreBerita }
  >({
    mutationFn: ({ id, formData }) => updateBerita(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateBerita"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteBerita = () => {
  const queryClient = useQueryClient();
  return useMutation<IBeritaRes, AxiosError<BaseErrorRes>, { id: string }>({
    mutationFn: ({ id }) => deleteBerita(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteBerita"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
