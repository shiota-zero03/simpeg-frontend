import { useQuery } from "@tanstack/react-query";
import { getAllPenilaian, getDetailPenilaian } from "./http";

export const useGetAllPenilaian = (
  page: number,
  limit: number,
  title?: string,
  monthly?: string,
  yearly?: string,
) => {
  return useQuery({
    queryKey: ["getAllPenilaian"],
    queryFn: () => getAllPenilaian(page, limit, title, monthly, yearly),
    staleTime: 300000,
  });
};
export const useGetDetailPenilaian = (id: string) => {
  return useQuery({
    queryKey: ["getDetailPenilaian"],
    queryFn: () => getDetailPenilaian(id),
    staleTime: 300000,
  });
};
