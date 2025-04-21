import instance from "@/api/axios";
import { StoreKeputusan } from "@/interface/request/surat.interface";
import {
  IKeputusanRes,
  IKeputusanDetaiRes,
} from "@/interface/responses/surat.interface";

export const getAllKeputusan = async (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
): Promise<IKeputusanRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (name) params.set("name", name);
  if (nomorSurat) params.set("nomorSurat", nomorSurat);
  const response = await instance.get(
    `/admin/surat-keputusan?${params.toString()}`,
  );
  return response.data;
};
export const createKeputusan = async (
  formData: StoreKeputusan,
): Promise<IKeputusanDetaiRes> => {
  const response = await instance.post(
    `/admin/surat-keputusan/create`,
    formData,
  );
  return response.data;
};
export const getDetailKeputusan = async (
  id: string,
): Promise<IKeputusanDetaiRes> => {
  const response = await instance.get(`/admin/surat-keputusan/${id}`);
  return response.data;
};
export const updateKeputusan = async (
  id: string,
  formData: StoreKeputusan,
): Promise<IKeputusanDetaiRes> => {
  const response = await instance.put(
    `/admin/surat-keputusan/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteKeputusan = async (
  id: string,
): Promise<IKeputusanDetaiRes> => {
  const response = await instance.delete(`/admin/surat-keputusan/delete/${id}`);
  return response.data;
};
