import { useQuery } from "@tanstack/react-query";
import { getAllManualBookHome } from "./http";

export const useGetAllManualBookHome = (
  page: number,
  limit: number,
  search?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllManualBookHome"],
    queryFn: () => getAllManualBookHome(page, limit, search),
    staleTime: 300000,
  });
};
