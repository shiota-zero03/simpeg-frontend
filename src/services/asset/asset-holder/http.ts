import instance from "@/api/axios";
import { StoreAssetHolder } from "@/interface/request/assetHolder.interface";
import {
  IAssetHolderRes,
  IAssetHolderOptionRes,
  IAssetHolderDetailRes,
} from "@/interface/responses/assetHolder.interface";

export const getAllAssetHolderOption = async (): Promise<IAssetHolderOptionRes> => {
  const response = await instance.get(`/admin/asset-holder/dropdown/list`);
  return response.data;
};

export const getAllAssetHolder = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IAssetHolderRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(`/admin/asset-holder?${params.toString()}`);
  return response.data;
};
export const createAssetHolder = async (
  formData: StoreAssetHolder,
): Promise<IAssetHolderDetailRes> => {
  const response = await instance.post(`/admin/asset-holder/create`, formData);
  return response.data;
};
export const getDetailAssetHolder = async (id: string): Promise<IAssetHolderDetailRes> => {
  const response = await instance.get(`/admin/asset-holder/${id}`);
  return response.data;
};
export const updateAssetHolder = async (
  id: string,
  formData: StoreAssetHolder,
): Promise<IAssetHolderDetailRes> => {
  const response = await instance.put(`/admin/asset-holder/update/${id}`, formData);
  return response.data;
};
export const deleteAssetHolder = async (id: string): Promise<IAssetHolderDetailRes> => {
  const response = await instance.delete(`/admin/asset-holder/delete/${id}`);
  return response.data;
};
