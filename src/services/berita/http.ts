import instance from "@/api/axios";
import { StoreBerita } from "@/interface/request/berita.interface";
import {
  IBeritaListRes,
  IBeritaRes,
} from "@/interface/responses/berita.interface";

export const getAllBeritaHome = async (
  page: number,
  limit: number,
  search?: string | null,
): Promise<IBeritaListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (search) params.set("title", search);
  const response = await instance.get(`/home/berita?${params.toString()}`);
  return response.data;
};

export const getDetailBeritaHome = async (id: string): Promise<IBeritaRes> => {
  const response = await instance.get(`/home/berita/${id}`);
  return response.data;
};

export const getAllBerita = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IBeritaListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("title", title);
  const response = await instance.get(`/admin/berita?${params.toString()}`);
  return response.data;
};
export const createBerita = async (
  formData: StoreBerita,
): Promise<IBeritaRes> => {
  const response = await instance.post(`/admin/berita/create`, formData);
  return response.data;
};
export const getDetailBerita = async (id: string): Promise<IBeritaRes> => {
  const response = await instance.get(`/admin/berita/${id}`);
  return response.data;
};
export const updateBerita = async (
  id: string,
  formData: StoreBerita,
): Promise<IBeritaRes> => {
  const response = await instance.put(`/admin/berita/update/${id}`, formData);
  return response.data;
};
export const deleteBerita = async (id: string): Promise<IBeritaRes> => {
  const response = await instance.delete(`/admin/berita/delete/${id}`);
  return response.data;
};
