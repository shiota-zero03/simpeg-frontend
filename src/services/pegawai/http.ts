import instance from "@/api/axios";
import { StorePegawai } from "@/interface/request/pegawai.interface";
import {
  IPegawaiListRes,
  IPegawaiOptionRes,
  IPegawaiRes,
} from "@/interface/responses/pegawai.interface";

export const getAllPegawaiOption = async (): Promise<IPegawaiOptionRes> => {
  const response = await instance.get(`/admin/pegawai/dropdown/list`);
  return response.data;
};

export const getAllPegawai = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IPegawaiListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(`/admin/pegawai?${params.toString()}`);
  return response.data;
};
export const createPegawai = async (
  formData: StorePegawai,
): Promise<IPegawaiRes> => {
  const response = await instance.post(`/auth/register`, formData);
  return response.data;
};
export const getDetailPegawai = async (id: string): Promise<IPegawaiRes> => {
  const response = await instance.get(`/admin/pegawai/${id}`);
  return response.data;
};
export const updatePegawai = async (
  id: string,
  formData: StorePegawai,
): Promise<IPegawaiRes> => {
  const response = await instance.put(`/admin/pegawai/update/${id}`, formData);
  return response.data;
};
export const deletePegawai = async (id: string): Promise<IPegawaiRes> => {
  const response = await instance.delete(`/admin/pegawai/delete/${id}`);
  return response.data;
};
