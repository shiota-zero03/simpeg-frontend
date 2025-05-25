import instance from "@/api/axios";
import { StoreEDisposisi } from "@/interface/request/e-disposisi.interface";
import {
  IEDisposisiListRes,
  IEDisposisiRes,
} from "@/interface/responses/e-disposisi.interface";

export const getAllEDisposisi = async (
  page: number,
  limit: number,
  title?: string,
  startDate?: string | null,
  endDate?: string | null,
): Promise<IEDisposisiListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("nomorSurat", title);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  const response = await instance.get(`/admin/disposisi?${params.toString()}`);
  return response.data;
};
export const createEDisposisi = async (
  formData: StoreEDisposisi,
): Promise<IEDisposisiRes> => {
  const response = await instance.post(`/admin/disposisi/create`, formData);
  return response.data;
};
export const getDetailEDisposisi = async (
  id: string,
): Promise<IEDisposisiRes> => {
  const response = await instance.get(`/admin/disposisi/${id}`);
  return response.data;
};
export const deleteEDisposisi = async (id: string): Promise<IEDisposisiRes> => {
  const response = await instance.delete(`/admin/disposisi/delete/${id}`);
  return response.data;
};

export const teruskanEDisposisi = async (
  id: string,
): Promise<IEDisposisiRes> => {
  const response = await instance.post(`/admin/disposisi/teruskan/${id}`, {});
  return response.data;
};

export const verifikasiEDisposisi = async (
  formData: StoreEDisposisi,
): Promise<IEDisposisiRes> => {
  const response = await instance.post(`/admin/disposisi/verifikasi`, formData);
  return response.data;
};
export const updateEDisposisi = async (
  id: string,
  formData: StoreEDisposisi,
): Promise<IEDisposisiRes> => {
  const response = await instance.put(
    `/admin/disposisi/update/${id}`,
    formData,
  );
  return response.data;
};
