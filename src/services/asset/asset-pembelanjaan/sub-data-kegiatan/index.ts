import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSubDataKegiatan,
  deleteSubDataKegiatan,
  getAllSubDataKegiatan,
  getAllSubDataKegiatanOption,
  getDetailSubDataKegiatan,
  updateSubDataKegiatan,
} from "./http";
import { ISubDataKegiatanDetailRes } from "@/interface/responses/asset.Pembelanjaaninterface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreSubDataKegiatan } from "@/interface/request/assetPembelanjaan";

export const useGetAllSubDataKegiatanOption = () => {
  return useQuery({
    queryKey: ["getAllSubDataKegiatanOption"],
    queryFn: () => getAllSubDataKegiatanOption(),
    staleTime: 300000,
  });
};

export const useGetAllSubDataKegiatan = (
  page: number,
  limit: number,
  title?: string,
) => {
  return useQuery({
    queryKey: ["getAllSubDataKegiatan"],
    queryFn: () => getAllSubDataKegiatan(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateSubDataKegiatan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISubDataKegiatanDetailRes,
    AxiosError<BaseErrorRes>,
    StoreSubDataKegiatan
  >({
    mutationFn: (formData) => createSubDataKegiatan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createSubDataKegiatan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailSubDataKegiatan = (id: string) => {
  return useQuery({
    queryKey: ["getDetailSubDataKegiatan", id],
    queryFn: () => getDetailSubDataKegiatan(id),
    staleTime: 300000,
  });
};
export const useUpdateSubDataKegiatan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISubDataKegiatanDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreSubDataKegiatan }
  >({
    mutationFn: ({ id, formData }) => updateSubDataKegiatan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateSubDataKegiatan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteSubDataKegiatan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    ISubDataKegiatanDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteSubDataKegiatan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteSubDataKegiatan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
