import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createGaleri,
  deleteGaleri,
  getAllGaleri,
  getAllGaleriHome,
  getDetailGaleri,
  getDetailGaleriHome,
  updateGaleri,
} from "./http";
import { IGaleriRes } from "@/interface/responses/galeri.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreGaleri } from "@/interface/request/galeri.interface";

export const useGetAllGaleriHome = (
  page: number,
  limit: number,
  search?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllGaleriHome"],
    queryFn: () => getAllGaleriHome(page, limit, search),
    staleTime: 300000,
  });
};
export const useGetDetailGaleriHome = (id: string) => {
  return useQuery({
    queryKey: ["getDetailGaleriHome", id],
    queryFn: () => getDetailGaleriHome(id),
    staleTime: 300000,
  });
};

export const useGetAllGaleri = (
  page: number,
  limit: number,
  title?: string,
) => {
  return useQuery({
    queryKey: ["getAllGaleri"],
    queryFn: () => getAllGaleri(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateGaleri = () => {
  const queryClient = useQueryClient();
  return useMutation<IGaleriRes, AxiosError<BaseErrorRes>, StoreGaleri>({
    mutationFn: (formData) => createGaleri(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createGaleri"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailGaleri = (id: string) => {
  return useQuery({
    queryKey: ["getDetailGaleri", id],
    queryFn: () => getDetailGaleri(id),
    staleTime: 300000,
  });
};
export const useUpdateGaleri = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IGaleriRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreGaleri }
  >({
    mutationFn: ({ id, formData }) => updateGaleri(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateGaleri"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteGaleri = () => {
  const queryClient = useQueryClient();
  return useMutation<IGaleriRes, AxiosError<BaseErrorRes>, { id: string }>({
    mutationFn: ({ id }) => deleteGaleri(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteGaleri"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
