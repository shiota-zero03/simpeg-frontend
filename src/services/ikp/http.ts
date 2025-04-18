import instance from "@/api/axios";
import { StoreIKP } from "@/interface/request/ikp.interface";
import {
  IIKPListRes,
  IIKPDetailRes,
} from "@/interface/responses/ikp.interface";

export const getAllIKP = async (
  page: number,
  limit: number,
  title?: string,
  monthly?: string,
  yearly?: string,
): Promise<IIKPListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  if (monthly) params.set("monthly", monthly);
  if (yearly) params.set("yearly", yearly);
  const response = await instance.get(`/admin/ikp?${params.toString()}`);
  return response.data;
};
export const createIKP = async (formData: StoreIKP): Promise<IIKPDetailRes> => {
  const response = await instance.post(`/admin/ikp/create`, formData);
  return response.data;
};
export const getDetailIKP = async (id: string): Promise<IIKPDetailRes> => {
  const response = await instance.get(`/admin/unit/${id}`);
  return response.data;
};
export const updateIKP = async (
  id: string,
  formData: StoreIKP,
): Promise<IIKPDetailRes> => {
  const response = await instance.put(`/admin/unit/update/${id}`, formData);
  return response.data;
};
export const deleteIKP = async (id: string): Promise<IIKPDetailRes> => {
  const response = await instance.delete(`/admin/ikp/delete/${id}`);
  return response.data;
};
