import instance from "@/api/axios";
import { StoreHubungiKami } from "@/interface/request/hubungi.interface";
import { IHubungiKamiRes } from "@/interface/responses/hubungiKami.interface";

export const getAllHubungiKamiHome = async (
  page: number,
  limit: number,
  search?: string | null,
): Promise<IHubungiKamiRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (search) params.set("title", search);
  const response = await instance.get(
    `/home/customer-services?${params.toString()}`,
  );
  return response.data;
};

export const getAllHubungiKami = async (
  page: number,
  limit: number,
  search?: string | null,
): Promise<IHubungiKamiRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (search) params.set("title", search);
  const response = await instance.get(
    `/admin/customer-services?${params.toString()}`,
  );
  return response.data;
};

export const updateHubungiKami = async (
  id: string,
  formData: StoreHubungiKami,
): Promise<IHubungiKamiRes> => {
  const response = await instance.put(
    `/admin/customer-services/update/${id}`,
    formData,
  );
  return response.data;
};
