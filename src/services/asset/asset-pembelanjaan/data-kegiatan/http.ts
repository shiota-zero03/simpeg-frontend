import instance from "@/api/axios";
import { StoreDataKegiatan } from "@/interface/request/assetPembelanjaan";
import {
  IDataKegiatanRes,
  IDataKegiatanOptionRes,
  IDataKegiatanDetailRes,
} from "@/interface/responses/asset.Pembelanjaaninterface";

export const getAllDataKegiatanOption =
  async (): Promise<IDataKegiatanOptionRes> => {
    const response = await instance.get(`/admin/kegiatan/dropdown/list`);
    return response.data;
  };

export const getAllDataKegiatan = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IDataKegiatanRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(`/admin/kegiatan?${params.toString()}`);
  return response.data;
};
export const createDataKegiatan = async (
  formData: StoreDataKegiatan,
): Promise<IDataKegiatanDetailRes> => {
  const response = await instance.post(`/admin/kegiatan/create`, formData);
  return response.data;
};
export const getDetailDataKegiatan = async (
  id: string,
): Promise<IDataKegiatanDetailRes> => {
  const response = await instance.get(`/admin/kegiatan/${id}`);
  return response.data;
};
export const updateDataKegiatan = async (
  id: string,
  formData: StoreDataKegiatan,
): Promise<IDataKegiatanDetailRes> => {
  const response = await instance.put(`/admin/kegiatan/update/${id}`, formData);
  return response.data;
};
export const deleteDataKegiatan = async (
  id: string,
): Promise<IDataKegiatanDetailRes> => {
  const response = await instance.delete(`/admin/kegiatan/delete/${id}`);
  return response.data;
};
