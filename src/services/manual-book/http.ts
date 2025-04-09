import instance from "@/api/axios";
import { IManualBookRes } from "@/interface/responses/manualBook.interface";

export const getAllManualBookHome = async (
  page: number,
  limit: number,
  search?: string | null,
): Promise<IManualBookRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (search) params.set("title", search);
  const response = await instance.get(`/home/manual-book?${params.toString()}`);
  return response.data;
};