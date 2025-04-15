import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createUnit,
  deleteUnit,
  getAllUnit,
  getAllUnitOption,
  getDetailUnit,
  updateUnit,
} from "./http";
import { IUnitDetailRes } from "@/interface/responses/unit.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreUnit } from "@/interface/request/unit.interface";

export const useGetAllUnitOption = () => {
  return useQuery({
    queryKey: ["getAllUnitOption"],
    queryFn: () => getAllUnitOption(),
    staleTime: 300000,
  });
};

export const useGetAllUnit = (page: number, limit: number, title?: string) => {
  return useQuery({
    queryKey: ["getAllUnit"],
    queryFn: () => getAllUnit(page, limit, title),
    staleTime: 300000,
  });
};
export const useCreateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation<IUnitDetailRes, AxiosError<BaseErrorRes>, StoreUnit>({
    mutationFn: (formData) => createUnit(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["createUnit"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useGetDetailUnit = (id: string) => {
  return useQuery({
    queryKey: ["getDetailUnit", id],
    queryFn: () => getDetailUnit(id),
    staleTime: 300000,
  });
};
export const useUpdateUnit = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IUnitDetailRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreUnit }
  >({
    mutationFn: ({ id, formData }) => updateUnit(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateUnit"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
export const useDeleteUnit = () => {
  const queryClient = useQueryClient();
  return useMutation<IUnitDetailRes, AxiosError<BaseErrorRes>, { id: string }>({
    mutationFn: ({ id }) => deleteUnit(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deleteUnit"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
