import instance from "@/api/axios";
import { StoreEFilling } from "@/interface/request/efilling.interface";
import {
  IEFillingRes,
  IEFillingDetailRes,
} from "@/interface/responses/efilling.interface";

export const getAllEFilling = async (
  page: number,
  limit: number,
  title?: string,
  startDate?: string | null,
  endDate?: string | null,
): Promise<IEFillingRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("title", title);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  const response = await instance.get(`/admin/efilling?${params.toString()}`);
  return response.data;
};
export const createEFilling = async (
  formData: StoreEFilling,
): Promise<IEFillingDetailRes> => {
  const response = await instance.post(`/admin/efilling/create`, formData);
  return response.data;
};
export const getDetailEFilling = async (
  id: string,
): Promise<IEFillingDetailRes> => {
  const response = await instance.get(`/admin/efilling/${id}`);
  return response.data;
};
export const updateEFilling = async (
  id: string,
  formData: StoreEFilling,
): Promise<IEFillingDetailRes> => {
  const response = await instance.put(`/admin/efilling/update/${id}`, formData);
  return response.data;
};
export const deleteEFilling = async (
  id: string,
): Promise<IEFillingDetailRes> => {
  const response = await instance.delete(`/admin/efilling/delete/${id}`);
  return response.data;
};
