import instance from "@/api/axios";
import { StoreAssetService } from "@/interface/request/assetService.interface";
import {
  IAssetServiceRes,
  IAssetServiceOptionRes,
  IAssetServiceDetailRes,
  AssetServiceRes,
} from "@/interface/responses/assetService.interface";

export const getAllAssetServiceOption =
  async (): Promise<IAssetServiceOptionRes> => {
    const response = await instance.get(`/admin/pajak-services/dropdown/list`);
    return response.data;
  };

export const getAllAssetService = async (
  page: number,
  limit: number,
  title?: string,
  startDate?: string | null,
  endDate?: string | null,
): Promise<IAssetServiceRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("search", title);
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);
  const response = await instance.get(
    `/admin/pajak-services?${params.toString()}`,
  );
  return response.data;
};

export const getAllAssetServiceExport = async (
  startDate?: string | null,
  endDate?: string | null,
): Promise<AssetServiceRes[]> => {
  const params = new URLSearchParams();
  if (startDate) params.set("startDate", startDate);
  if (endDate) params.set("endDate", endDate);

  let currentPage = 1;
  let lastPage = 1;
  const allLoker: AssetServiceRes[] = [];
  const seenIds = new Set<number>();

  do {
    const res: { data: IAssetServiceRes } = await instance.get(
      `/admin/pajak-services?page=${currentPage}&limit=50&${params.toString()}`,
    );
    const result = res.data.data;
    const jobs = result.response;
    lastPage = result.pagination.totalPages || 1;

    jobs.forEach((job: AssetServiceRes) => {
      if (!seenIds.has(job.id)) {
        seenIds.add(job.id);
        allLoker.push(job);
      }
    });

    currentPage++;
  } while (currentPage <= lastPage);
  return allLoker;
};
export const createAssetService = async (
  formData: StoreAssetService,
): Promise<IAssetServiceDetailRes> => {
  const response = await instance.post(
    `/admin/pajak-services/create`,
    formData,
  );
  return response.data;
};
export const getDetailAssetService = async (
  id: string,
): Promise<IAssetServiceDetailRes> => {
  const response = await instance.get(`/admin/pajak-services/${id}`);
  return response.data;
};
export const updateAssetService = async (
  id: string,
  formData: StoreAssetService,
): Promise<IAssetServiceDetailRes> => {
  const response = await instance.put(
    `/admin/pajak-services/update/${id}`,
    formData,
  );
  return response.data;
};
export const deleteAssetService = async (
  id: string,
): Promise<IAssetServiceDetailRes> => {
  const response = await instance.delete(`/admin/pajak-services/delete/${id}`);
  return response.data;
};
