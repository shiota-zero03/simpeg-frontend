import instance from "@/api/axios";
import { StoreDataBelanja } from "@/interface/request/assetPembelanjaan";
import {
  IDataBelanjaRes,
  IDataBelanjaOptionRes,
  IDataBelanjaDetailRes,
} from "@/interface/responses/asset.Pembelanjaaninterface";

export const getAllDataBelanjaOption =
  async (): Promise<IDataBelanjaOptionRes> => {
    const response = await instance.get(`/admin/item-belanja/dropdown/list`);
    return response.data;
  };

export const getAllDataBelanja = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IDataBelanjaRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(
    `/admin/item-belanja?${params.toString()}`,
  );
  return response.data;
};
export const createDataBelanja = async (
  formData: StoreDataBelanja,
): Promise<IDataBelanjaDetailRes> => {
  const response = await instance.post(`/admin/item-belanja/create`, formData);
  return response.data;
};
export const getDetailDataBelanja = async (
  id: string,
): Promise<IDataBelanjaDetailRes> => {
  const response = await instance.get(`/admin/item-belanja/${id}`);
  return response.data;
};
export const updateDataBelanja = async (
  id: string,
  formData: StoreDataBelanja,
): Promise<IDataBelanjaDetailRes> => {
  const response = await instance.put(
    `/admin/item-belanja/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteDataBelanja = async (
  id: string,
): Promise<IDataBelanjaDetailRes> => {
  const response = await instance.delete(`/admin/item-belanja/delete/${id}`);
  return response.data;
};
