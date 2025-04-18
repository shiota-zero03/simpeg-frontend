import instance from "@/api/axios";
import { StoreSuratPemeriksaan } from "@/interface/request/surat.interface";
import {
  ISuratPemeriksaanRes,
  ISuratPemeriksaanDetaiRes,
} from "@/interface/responses/surat.interface";

export const getAllSuratPemeriksaan = async (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
): Promise<ISuratPemeriksaanRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (name) params.set("name", name);
  if (nomorSurat) params.set("nomorSurat", nomorSurat);
  const response = await instance.get(`/admin/surat-pemeriksaan?${params.toString()}`);
  return response.data;
};
export const createSuratPemeriksaan = async (
  formData: StoreSuratPemeriksaan,
): Promise<ISuratPemeriksaanDetaiRes> => {
  const response = await instance.post(`/admin/surat-pemeriksaan/create`, formData);
  return response.data;
};
export const getDetailSuratPemeriksaan = async (id: string): Promise<ISuratPemeriksaanDetaiRes> => {
  const response = await instance.get(`/admin/surat-pemeriksaan/${id}`);
  return response.data;
};
export const updateSuratPemeriksaan = async (
  id: string,
  formData: StoreSuratPemeriksaan,
): Promise<ISuratPemeriksaanDetaiRes> => {
  const response = await instance.put(`/admin/surat-pemeriksaan/update/${id}`, formData);
  return response.data;
};
export const deleteSuratPemeriksaan = async (id: string): Promise<ISuratPemeriksaanDetaiRes> => {
  const response = await instance.delete(`/admin/surat-pemeriksaan/delete/${id}`);
  return response.data;
};
