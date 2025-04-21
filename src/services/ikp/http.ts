import instance from "@/api/axios";
import {
  StoreIKP,
  StoreIKPPerubahan,
  StoreIKPSetuju,
} from "@/interface/request/ikp.interface";
import {
  IIKPListRes,
  IIKPDetailRes,
} from "@/interface/responses/ikp.interface";
import store from "@/redux/store";

export const getAllIKP = async (
  page: number,
  limit: number,
  title?: string,
  monthly?: string,
  yearly?: string,
): Promise<IIKPListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  if (monthly) params.set("monthly", monthly);
  if (yearly) params.set("yearly", yearly);

  const { role } = store.getState().auth;
  let link = `/admin/ikp?${params.toString()}`;
  if (role === "PEGAWAI") {
    link = `/admin/ikp/users/pegawai?${params.toString()}`;
  }
  const response = await instance.get(link);
  return response.data;
};
export const createIKP = async (formData: StoreIKP): Promise<IIKPDetailRes> => {
  const response = await instance.post(`/admin/ikp/create`, formData);
  return response.data;
};
export const getDetailIKP = async (id: string): Promise<IIKPDetailRes> => {
  const response = await instance.get(`/admin/ikp/${id}`);
  return response.data;
};
export const deleteIKP = async (id: string): Promise<IIKPDetailRes> => {
  const response = await instance.delete(`/admin/ikp/delete/${id}`);
  return response.data;
};
export const updateStatusIKP = async (
  id: string,
  formData: { status: string },
): Promise<IIKPDetailRes> => {
  const response = await instance.put(
    `/admin/ikp/update/status/${id}`,
    formData,
  );
  return response.data;
};
export const updateStatusPerubahanIKP = async (
  id: string,
  formData: StoreIKPPerubahan,
): Promise<IIKPDetailRes> => {
  const response = await instance.put(
    `/admin/ikp/update/target/${id}`,
    formData,
  );
  return response.data;
};

export const updateIKP = async (
  id: string,
  formData: StoreIKPSetuju,
): Promise<IIKPDetailRes> => {
  const response = await instance.put(`/admin/ikp/update/${id}`, formData);
  return response.data;
};
