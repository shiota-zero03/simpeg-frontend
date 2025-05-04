import instance from "@/api/axios";
import { StoreJabatan } from "@/interface/request/jabatan.interface";
import {
  IJabatanRes,
  IJabatanOptionRes,
  IJabatanDetailRes,
  IJabatanHirarkiRes,
} from "@/interface/responses/jabatan.interface";

export const getAllJabatanHirarki = async (): Promise<IJabatanHirarkiRes> => {
  const response = await instance.get(`/admin/jabatan/dropdown/hirarki`);
  return response.data;
};

export const getAllJabatanOption = async (): Promise<IJabatanOptionRes> => {
  const response = await instance.get(`/admin/jabatan/dropdown/list`);
  return response.data;
};

export const getAllJabatan = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IJabatanRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("jabatan", title);
  const response = await instance.get(`/admin/jabatan?${params.toString()}`);
  return response.data;
};
export const createJabatan = async (
  formData: StoreJabatan,
): Promise<IJabatanDetailRes> => {
  const response = await instance.post(`/admin/jabatan/create`, formData);
  return response.data;
};
export const getDetailJabatan = async (
  id: string,
): Promise<IJabatanDetailRes> => {
  const response = await instance.get(`/admin/jabatan/${id}`);
  return response.data;
};
export const updateJabatan = async (
  id: string,
  formData: StoreJabatan,
): Promise<IJabatanDetailRes> => {
  const response = await instance.put(`/admin/jabatan/update/${id}`, formData);
  return response.data;
};
export const deleteJabatan = async (id: string): Promise<IJabatanDetailRes> => {
  const response = await instance.delete(`/admin/jabatan/delete/${id}`);
  return response.data;
};
