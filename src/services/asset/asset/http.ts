import instance from "@/api/axios";
import { StoreAsset } from "@/interface/request/asset.interface";
import {
  IAssetRes,
  IAssetOptionRes,
  IAssetDetailRes,
} from "@/interface/responses/asset.interface";

export const getAllAssetOption = async (): Promise<IAssetOptionRes> => {
  const response = await instance.get(`/admin/asset/dropdown/list`);
  return response.data;
};

export const getAllAsset = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IAssetRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  const response = await instance.get(`/admin/asset?${params.toString()}`);
  return response.data;
};
export const createAsset = async (
  formData: StoreAsset,
): Promise<IAssetDetailRes> => {
  const response = await instance.post(`/admin/asset/create`, formData);
  return response.data;
};
export const getDetailAsset = async (id: string): Promise<IAssetDetailRes> => {
  const response = await instance.get(`/admin/asset/${id}`);
  return response.data;
};
export const updateAsset = async (
  id: string,
  formData: StoreAsset,
): Promise<IAssetDetailRes> => {
  const response = await instance.put(`/admin/asset/update/${id}`, formData);
  return response.data;
};
export const deleteAsset = async (id: string): Promise<IAssetDetailRes> => {
  const response = await instance.delete(`/admin/asset/delete/${id}`);
  return response.data;
};
