import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createDataKegiatan,
  deleteDataKegiatan,
  getAllDataKegiatan,
  getAllDataKegiatanOption,
  getDetailDataKegiatan,
  updateDataKegiatan,
} from "./http";
import { IDataKegiatanDetailRes } from "@/interface/responses/asset.Pembelanjaaninterface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreDataKegiatan } from "@/interface/request/assetPembelanjaan";

export const useGetAllDataKegiatanOption = () => {
  return useQuery({
    queryKey: ["getAllDataKegiatanOption"],
    queryFn: () => getAllDataKegiatanOption(),
    staleTime: 300000,
  });
};

export const useGetAllDataKegiatan = (page: number, limit: number, title?: string) => {
  return useQuery({
    queryKey: ["getAllDataKegiatan"],
    queryFn: () => getAllDataKegiatan(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateDataKegiatan = () => {
  const queryClient = useQueryClient();
  return useMutation<IDataKegiatanDetailRes, AxiosError<BaseErrorRes>, StoreDataKegiatan>({
    mutationFn: (formData) => createDataKegiatan(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createDataKegiatan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailDataKegiatan = (id: string) => {
  return useQuery({
    queryKey: ["getDetailDataKegiatan", id],
    queryFn: () => getDetailDataKegiatan(id),
    staleTime: 300000,
  });
};
export const useUpdateDataKegiatan = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IDataKegiatanDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreDataKegiatan }
  >({
    mutationFn: ({ id, formData }) => updateDataKegiatan(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateDataKegiatan"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteDataKegiatan = () => {
  const queryClient = useQueryClient();
  return useMutation<IDataKegiatanDetailRes, AxiosError<BaseErrorRes>, { id: string }>(
    {
      mutationFn: ({ id }) => deleteDataKegiatan(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["deleteDataKegiatan"] });
      },
      onError: (error) => {
        throw error;
      },
    },
  );
};
