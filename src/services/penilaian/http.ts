import instance from "@/api/axios";
import {
  IPenilaianDetailRes,
  IPenilaianListRes,
} from "@/interface/responses/penilaian.interface";

export const getAllPenilaian = async (
  page: number,
  limit: number,
  title?: string,
  monthly?: string,
  yearly?: string,
): Promise<IPenilaianListRes> => {
  const params = new URLSearchParams();

  if (page) params.set("page", page.toString());
  if (limit) params.set("limit", limit.toString());
  if (title) params.set("name", title);
  if (monthly) params.set("monthly", monthly);
  if (yearly) params.set("yearly", yearly);
  const response = await instance.get(`/admin/penilaian?${params.toString()}`);
  return response.data;
};

export const getDetailPenilaian = async (
  id: string,
): Promise<IPenilaianDetailRes> => {
  const response = await instance.get(`/admin/penilaian/${id}`);
  return response.data;
};
