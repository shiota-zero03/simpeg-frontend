import instance from "@/api/axios";
import {
  StorePegawai,
  StorePelaporanPegawai,
  StoreSuratPegawai,
} from "@/interface/request/pegawai.interface";
import {
  IPegawaiListRes,
  IPegawaiOptionRes,
  IPegawaiRes,
  IPelaporanPegawaiListRes,
  IPelaporanPegawaiRes,
  ISuratPegawaiListRes,
  ISuratPegawaiRes,
} from "@/interface/responses/pegawai.interface";

export const getAllPegawaiOption = async (): Promise<IPegawaiOptionRes> => {
  const response = await instance.get(`/admin/pegawai/dropdown/list`);
  return response.data;
};

export const getAllPegawaiPimpinanOption =
  async (): Promise<IPegawaiOptionRes> => {
    const response = await instance.get(`/admin/pegawai/dropdown/byusers`);
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

export const getAllSuratPegawaiAdmin = async (
  page: number,
  limit: number,
  title?: string,
): Promise<ISuratPegawaiListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(`/admin/type-form/list/admin?${params.toString()}`);
  return response.data;
};
export const getAllSuratPegawai = async (
  page: number,
  limit: number,
  title?: string,
): Promise<ISuratPegawaiListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(`/admin/type-form?${params.toString()}`);
  return response.data;
};
export const createSuratPegawai = async (
  formData: StoreSuratPegawai,
): Promise<ISuratPegawaiRes> => {
  const response = await instance.post(`/admin/type-form/create`, formData);
  return response.data;
};
export const getDetailSuratPegawai = async (
  id: string,
): Promise<ISuratPegawaiRes> => {
  const response = await instance.get(`/admin/type-form/${id}`);
  return response.data;
};
export const updateSuratPegawai = async (
  id: string,
  formData: StoreSuratPegawai,
): Promise<ISuratPegawaiRes> => {
  const response = await instance.put(
    `/admin/type-form/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteSuratPegawai = async (
  id: string,
): Promise<ISuratPegawaiRes> => {
  const response = await instance.delete(`/admin/type-form/delete/${id}`);
  return response.data;
};



export const getAllPelaporanPegawai = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IPelaporanPegawaiListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(`/admin/laporan-pegawai?${params.toString()}`);
  return response.data;
};
export const createPelaporanPegawai = async (
  formData: StorePelaporanPegawai,
): Promise<IPelaporanPegawaiRes> => {
  const response = await instance.post(`/admin/laporan-pegawai/create`, formData);
  return response.data;
};
export const getDetailPelaporanPegawai = async (
  id: string,
): Promise<IPelaporanPegawaiRes> => {
  const response = await instance.get(`/admin/laporan-pegawai/${id}`);
  return response.data;
};
export const updatePelaporanPegawai = async (
  id: string,
  formData: StorePelaporanPegawai,
): Promise<IPelaporanPegawaiRes> => {
  const response = await instance.put(
    `/admin/laporan-pegawai/update/${id}`,
    formData,
  );
  return response.data;
};
export const deletePelaporanPegawai = async (
  id: string,
): Promise<IPelaporanPegawaiRes> => {
  const response = await instance.delete(`/admin/laporan-pegawai/delete/${id}`);
  return response.data;
};
