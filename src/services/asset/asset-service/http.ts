import instance from "@/api/axios";
import { StoreAssetService } from "@/interface/request/assetService.interface";
import {
  IAssetServiceRes,
  IAssetServiceOptionRes,
  IAssetServiceDetailRes,
} from "@/interface/responses/assetService.interface";

export const getAllAssetServiceOption = async (): Promise<IAssetServiceOptionRes> => {
  const response = await instance.get(`/admin/pajak-services/dropdown/list`);
  return response.data;
};

export const getAllAssetService = async (
  page: number,
  limit: number,
  title?: string,
): Promise<IAssetServiceRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("search", title);
  const response = await instance.get(`/admin/pajak-services?${params.toString()}`);
  return response.data;
};
export const createAssetService = async (
  formData: StoreAssetService,
): Promise<IAssetServiceDetailRes> => {
  const response = await instance.post(`/admin/pajak-services/create`, formData);
  return response.data;
};
export const getDetailAssetService = async (id: string): Promise<IAssetServiceDetailRes> => {
  const response = await instance.get(`/admin/pajak-services/${id}`);
  return response.data;
};
export const updateAssetService = async (
  id: string,
  formData: StoreAssetService,
): Promise<IAssetServiceDetailRes> => {
  const response = await instance.put(`/admin/pajak-services/update/${id}`, formData);
  return response.data;
};
export const deleteAssetService = async (id: string): Promise<IAssetServiceDetailRes> => {
  const response = await instance.delete(`/admin/pajak-services/delete/${id}`);
  return response.data;
};
