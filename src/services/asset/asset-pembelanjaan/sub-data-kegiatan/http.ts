import instance from "@/api/axios";
import { StoreSubDataKegiatan } from "@/interface/request/assetPembelanjaan";
import {
  ISubDataKegiatanRes,
  ISubDataKegiatanOptionRes,
  ISubDataKegiatanDetailRes,
} from "@/interface/responses/asset.Pembelanjaaninterface";

export const getAllSubDataKegiatanOption =
  async (): Promise<ISubDataKegiatanOptionRes> => {
    const response = await instance.get(`/admin/sub-kegiatan/dropdown/list`);
    return response.data;
  };

export const getAllSubDataKegiatan = async (
  page: number,
  limit: number,
  title?: string,
): Promise<ISubDataKegiatanRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(
    `/admin/sub-kegiatan?${params.toString()}`,
  );
  return response.data;
};
export const createSubDataKegiatan = async (
  formData: StoreSubDataKegiatan,
): Promise<ISubDataKegiatanDetailRes> => {
  const response = await instance.post(`/admin/sub-kegiatan/create`, formData);
  return response.data;
};
export const getDetailSubDataKegiatan = async (
  id: string,
): Promise<ISubDataKegiatanDetailRes> => {
  const response = await instance.get(`/admin/sub-kegiatan/${id}`);
  return response.data;
};
export const updateSubDataKegiatan = async (
  id: string,
  formData: StoreSubDataKegiatan,
): Promise<ISubDataKegiatanDetailRes> => {
  const response = await instance.put(
    `/admin/sub-kegiatan/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteSubDataKegiatan = async (
  id: string,
): Promise<ISubDataKegiatanDetailRes> => {
  const response = await instance.delete(`/admin/sub-kegiatan/delete/${id}`);
  return response.data;
};
