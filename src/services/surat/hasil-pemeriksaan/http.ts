import instance from "@/api/axios";
import { StoreHasilPemeriksaan } from "@/interface/request/surat.interface";
import {
  IHasilPemeriksaanRes,
  IHasilPemeriksaanDetaiRes,
} from "@/interface/responses/surat.interface";

export const getAllHasilPemeriksaan = async (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
): Promise<IHasilPemeriksaanRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (name) params.set("name", name);
  if (nomorSurat) params.set("nomorSurat", nomorSurat);
  const response = await instance.get(
    `/admin/hasil-pemeriksaan?${params.toString()}`,
  );
  return response.data;
};
export const createHasilPemeriksaan = async (
  formData: StoreHasilPemeriksaan,
): Promise<IHasilPemeriksaanDetaiRes> => {
  const response = await instance.post(
    `/admin/hasil-pemeriksaan/create`,
    formData,
  );
  return response.data;
};
export const getDetailHasilPemeriksaan = async (
  id: string,
): Promise<IHasilPemeriksaanDetaiRes> => {
  const response = await instance.get(`/admin/hasil-pemeriksaan/${id}`);
  return response.data;
};
export const updateHasilPemeriksaan = async (
  id: string,
  formData: StoreHasilPemeriksaan,
): Promise<IHasilPemeriksaanDetaiRes> => {
  const response = await instance.put(
    `/admin/hasil-pemeriksaan/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteHasilPemeriksaan = async (
  id: string,
): Promise<IHasilPemeriksaanDetaiRes> => {
  const response = await instance.delete(
    `/admin/hasil-pemeriksaan/delete/${id}`,
  );
  return response.data;
};
