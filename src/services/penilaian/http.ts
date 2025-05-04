import instance from "@/api/axios";
import { StorePenilaian } from "@/interface/request/penilaian.interface";
import {
  IPenilaianDetailRes,
  IPenilaianGrafikRes,
  IPenilaianListRes,
} from "@/interface/responses/penilaian.interface";

export const getAllPenilaianCount = async (
  yearly?: string,
): Promise<IPenilaianGrafikRes> => {
  const params = new URLSearchParams();

  if (yearly) params.set("yearly", yearly);
  const response = await instance.get(
    `/admin/penilaian/count/data?${params.toString()}`,
  );
  return response.data;
};

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
  monthly?: string,
  yearly?: string,
): Promise<IPenilaianDetailRes> => {
  const params = new URLSearchParams();
  if (monthly) params.set("monthly", monthly);
  if (yearly) params.set("yearly", yearly);
  const response = await instance.get(
    `/admin/penilaian/${id}?${params.toString()}`,
  );
  return response.data;
};

export const createPenilaian = async (
  formData: StorePenilaian,
): Promise<IPenilaianDetailRes> => {
  const response = await instance.post(`/admin/penilaian/create`, formData);
  return response.data;
};
