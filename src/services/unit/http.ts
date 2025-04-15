import instance from "@/api/axios";
import { StoreUnit } from "@/interface/request/unit.interface";
import {
  IUnitRes,
  IUnitOptionRes,
  IUnitDetailRes,
} from "@/interface/responses/unit.interface";

export const getAllUnitOption = async (): Promise<IUnitOptionRes> => {
  const response = await instance.get(`/admin/unit/dropdown/list`);
  return response.data;
};

export const getAllUnit = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IUnitRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(`/admin/unit?${params.toString()}`);
  return response.data;
};
export const createUnit = async (
  formData: StoreUnit,
): Promise<IUnitDetailRes> => {
  const response = await instance.post(`/admin/unit/create`, formData);
  return response.data;
};
export const getDetailUnit = async (
  id: string,
): Promise<IUnitDetailRes> => {
  const response = await instance.get(`/admin/unit/${id}`);
  return response.data;
};
export const updateUnit = async (
  id: string,
  formData: StoreUnit,
): Promise<IUnitDetailRes> => {
  const response = await instance.put(`/admin/unit/update/${id}`, formData);
  return response.data;
};
export const deleteUnit = async (id: string): Promise<IUnitDetailRes> => {
  const response = await instance.delete(`/admin/unit/delete/${id}`);
  return response.data;
};
