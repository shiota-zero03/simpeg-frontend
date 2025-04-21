import instance from "@/api/axios";
import { StoreBeritaAcaraPemeriksaan } from "@/interface/request/surat.interface";
import {
  IBeritaAcaraPemeriksaanRes,
  IBeritaAcaraPemeriksaanDetaiRes,
} from "@/interface/responses/surat.interface";

export const getAllBeritaAcaraPemeriksaan = async (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
): Promise<IBeritaAcaraPemeriksaanRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (name) params.set("name", name);
  if (nomorSurat) params.set("nomorSurat", nomorSurat);
  const response = await instance.get(
    `/admin/berita-acara-pemeriksaan?${params.toString()}`,
  );
  return response.data;
};
export const createBeritaAcaraPemeriksaan = async (
  formData: StoreBeritaAcaraPemeriksaan,
): Promise<IBeritaAcaraPemeriksaanDetaiRes> => {
  const response = await instance.post(
    `/admin/berita-acara-pemeriksaan/create`,
    formData,
  );
  return response.data;
};
export const getDetailBeritaAcaraPemeriksaan = async (
  id: string,
): Promise<IBeritaAcaraPemeriksaanDetaiRes> => {
  const response = await instance.get(`/admin/berita-acara-pemeriksaan/${id}`);
  return response.data;
};
export const updateBeritaAcaraPemeriksaan = async (
  id: string,
  formData: StoreBeritaAcaraPemeriksaan,
): Promise<IBeritaAcaraPemeriksaanDetaiRes> => {
  const response = await instance.put(
    `/admin/berita-acara-pemeriksaan/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteBeritaAcaraPemeriksaan = async (
  id: string,
): Promise<IBeritaAcaraPemeriksaanDetaiRes> => {
  const response = await instance.delete(
    `/admin/berita-acara-pemeriksaan/delete/${id}`,
  );
  return response.data;
};
