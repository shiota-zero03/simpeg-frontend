import instance from "@/api/axios";
import { StoreKegiatanBelanja } from "@/interface/request/assetPembelanjaan";
import {
  IKegiatanBelanjaRes,
  IKegiatanBelanjaOptionRes,
  IKegiatanBelanjaDetailRes,
} from "@/interface/responses/asset.Pembelanjaaninterface";

export const getAllKegiatanBelanjaOption =
  async (): Promise<IKegiatanBelanjaOptionRes> => {
    const response = await instance.get(
      `/admin/kegiatan-belanja/dropdown/list`,
    );
    return response.data;
  };

export const getAllKegiatanBelanja = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IKegiatanBelanjaRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(
    `/admin/kegiatan-belanja?${params.toString()}`,
  );
  return response.data;
};
export const createKegiatanBelanja = async (
  formData: StoreKegiatanBelanja,
): Promise<IKegiatanBelanjaDetailRes> => {
  const response = await instance.post(
    `/admin/kegiatan-belanja/create`,
    formData,
  );
  return response.data;
};
export const getDetailKegiatanBelanja = async (
  id: string,
): Promise<IKegiatanBelanjaDetailRes> => {
  const response = await instance.get(`/admin/kegiatan-belanja/${id}`);
  return response.data;
};
export const updateKegiatanBelanja = async (
  id: string,
  formData: StoreKegiatanBelanja,
): Promise<IKegiatanBelanjaDetailRes> => {
  const response = await instance.put(
    `/admin/kegiatan-belanja/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteKegiatanBelanja = async (
  id: string,
): Promise<IKegiatanBelanjaDetailRes> => {
  const response = await instance.delete(
    `/admin/kegiatan-belanja/delete/${id}`,
  );
  return response.data;
};
