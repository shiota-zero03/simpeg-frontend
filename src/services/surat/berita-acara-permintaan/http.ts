import instance from "@/api/axios";
import { StoreBeritaAcaraPermintaan } from "@/interface/request/surat.interface";
import {
  IBeritaAcaraPermintaanRes,
  IBeritaAcaraPermintaanDetaiRes,
} from "@/interface/responses/surat.interface";

export const getAllBeritaAcaraPermintaan = async (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
): Promise<IBeritaAcaraPermintaanRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (name) params.set("name", name);
  if (nomorSurat) params.set("nomorSurat", nomorSurat);
  const response = await instance.get(
    `/admin/surat-permintaan-keterangan?${params.toString()}`,
  );
  return response.data;
};
export const createBeritaAcaraPermintaan = async (
  formData: StoreBeritaAcaraPermintaan,
): Promise<IBeritaAcaraPermintaanDetaiRes> => {
  const response = await instance.post(
    `/admin/surat-permintaan-keterangan/create`,
    formData,
  );
  return response.data;
};
export const getDetailBeritaAcaraPermintaan = async (
  id: string,
): Promise<IBeritaAcaraPermintaanDetaiRes> => {
  const response = await instance.get(
    `/admin/surat-permintaan-keterangan/${id}`,
  );
  return response.data;
};
export const updateBeritaAcaraPermintaan = async (
  id: string,
  formData: StoreBeritaAcaraPermintaan,
): Promise<IBeritaAcaraPermintaanDetaiRes> => {
  const response = await instance.put(
    `/admin/surat-permintaan-keterangan/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteBeritaAcaraPermintaan = async (
  id: string,
): Promise<IBeritaAcaraPermintaanDetaiRes> => {
  const response = await instance.delete(
    `/admin/surat-permintaan-keterangan/delete/${id}`,
  );
  return response.data;
};
