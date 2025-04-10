import instance from "@/api/axios";
import { StoreGaleri } from "@/interface/request/galeri.interface";
import {
  IGaleriListRes,
  IGaleriRes,
} from "@/interface/responses/galeri.interface";

export const getAllGaleriHome = async (
  page: number,
  limit: number,
  search?: string | null,
): Promise<IGaleriListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (search) params.set("title", search);
  const response = await instance.get(`/home/gallery?${params.toString()}`);
  return response.data;
};

export const getDetailGaleriHome = async (id: string): Promise<IGaleriRes> => {
  const response = await instance.get(`/home/gallery/${id}`);
  return response.data;
};

export const getAllGaleri = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IGaleriListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("title", title);
  const response = await instance.get(`/admin/gallery?${params.toString()}`);
  return response.data;
};
export const createGaleri = async (
  formData: StoreGaleri,
): Promise<IGaleriRes> => {
  const response = await instance.post(`/admin/gallery/create`, formData);
  return response.data;
};
export const getDetailGaleri = async (id: string): Promise<IGaleriRes> => {
  const response = await instance.get(`/admin/gallery/${id}`);
  return response.data;
};
export const updateGaleri = async (
  id: string,
  formData: StoreGaleri,
): Promise<IGaleriRes> => {
  const response = await instance.put(`/admin/gallery/update/${id}`, formData);
  return response.data;
};
export const deleteGaleri = async (id: string): Promise<IGaleriRes> => {
  const response = await instance.delete(`/admin/gallery/delete/${id}`);
  return response.data;
};
