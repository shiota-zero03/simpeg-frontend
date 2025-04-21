import { useQuery } from "@tanstack/react-query";
import { getAllPenilaian } from "./http";

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
