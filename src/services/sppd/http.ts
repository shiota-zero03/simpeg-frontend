import instance from "@/api/axios";
import { StorePelaporanSPPD, StoreSPPD } from "@/interface/request/sppd.interface";
import { ISPPDRes, ISPPDDetailRes, IPelaporanSPPDRes, IPelaporanSPPDListRes } from "@/interface/responses/sppd.interface";

export const getAllSPPD = async (
  page: number,
  limit: number,
  title?: string,
  job?: string,
  startDate?: string | null,
  endDate?: string | null,
): Promise<ISPPDRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("title", title);
  if (job) params.set("job", job);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  const response = await instance.get(`/admin/sppd?${params.toString()}`);
  return response.data;
};
export const createSPPD = async (
  formData: StoreSPPD,
): Promise<ISPPDDetailRes> => {
  const response = await instance.post(`/admin/sppd/create`, formData);
  return response.data;
};
export const getDetailSPPD = async (id: string): Promise<ISPPDDetailRes> => {
  const response = await instance.get(`/admin/sppd/${id}`);
  return response.data;
};
export const updateSPPD = async (
  id: string,
  formData: StoreSPPD,
): Promise<ISPPDDetailRes> => {
  const response = await instance.put(`/admin/sppd/update/${id}`, formData);
  return response.data;
};
export const deleteSPPD = async (id: string): Promise<ISPPDDetailRes> => {
  const response = await instance.delete(`/admin/sppd/delete/${id}`);
  return response.data;
};


export const getAllPelaporanSPPD = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IPelaporanSPPDListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(`/admin/laporan-sppd?${params.toString()}`);
  return response.data;
};
export const createPelaporanSPPD = async (
  formData: StorePelaporanSPPD,
): Promise<IPelaporanSPPDRes> => {
  const response = await instance.post(`/admin/laporan-sppd/create`, formData);
  return response.data;
};
export const getDetailPelaporanSPPD = async (
  id: string,
): Promise<IPelaporanSPPDRes> => {
  const response = await instance.get(`/admin/laporan-sppd/${id}`);
  return response.data;
};
export const updatePelaporanSPPD = async (
  id: string,
  formData: StorePelaporanSPPD,
): Promise<IPelaporanSPPDRes> => {
  const response = await instance.put(
    `/admin/laporan-sppd/update/${id}`,
    formData,
  );
  return response.data;
};
export const deletePelaporanSPPD = async (
  id: string,
): Promise<IPelaporanSPPDRes> => {
  const response = await instance.delete(`/admin/laporan-sppd/delete/${id}`);
  return response.data;
};
