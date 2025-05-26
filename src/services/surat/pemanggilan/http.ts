import instance from "@/api/axios";
import { StoreSuratPemanggilan } from "@/interface/request/surat.interface";
import {
  ISuratPemanggilanRes,
  ISuratPemanggilanDetaiRes,
  ISuratDDPemanggilanDetaiRes,
} from "@/interface/responses/surat.interface";

export const getAllSuratPemanggilan = async (
  page: number,
  limit: number,
  name?: string,
  nomorSurat?: string,
): Promise<ISuratPemanggilanRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (name) params.set("name", name);
  if (nomorSurat) params.set("nomorSurat", nomorSurat);
  const response = await instance.get(
    `/admin/surat-pemanggilan?${params.toString()}`,
  );
  return response.data;
};
export const getAllListSuratPemanggilan =
  async (): Promise<ISuratDDPemanggilanDetaiRes> => {
    const response = await instance.get(
      `/admin/surat-pemanggilan/list/dropdown`,
    );
    return response.data;
  };
export const createSuratPemanggilan = async (
  formData: StoreSuratPemanggilan,
): Promise<ISuratPemanggilanDetaiRes> => {
  const response = await instance.post(
    `/admin/surat-pemanggilan/create`,
    formData,
  );
  return response.data;
};
export const getDetailSuratPemanggilan = async (
  id: string,
): Promise<ISuratPemanggilanDetaiRes> => {
  const response = await instance.get(`/admin/surat-pemanggilan/${id}`);
  return response.data;
};
export const updateSuratPemanggilan = async (
  id: string,
  formData: StoreSuratPemanggilan,
): Promise<ISuratPemanggilanDetaiRes> => {
  const response = await instance.put(
    `/admin/surat-pemanggilan/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteSuratPemanggilan = async (
  id: string,
): Promise<ISuratPemanggilanDetaiRes> => {
  const response = await instance.delete(
    `/admin/surat-pemanggilan/delete/${id}`,
  );
  return response.data;
};
