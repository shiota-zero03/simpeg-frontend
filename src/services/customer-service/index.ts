import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllHubungiKami,
  getAllHubungiKamiHome,
  updateHubungiKami,
} from "./http";
import { IHubungiKamiRes } from "@/interface/responses/hubungiKami.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreHubungiKami } from "@/interface/request/hubungi.interface";

export const useGetAllHubungiKamiHome = (
  page: number,
  limit: number,
  search?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllHubungiKamiHome"],
    queryFn: () => getAllHubungiKamiHome(page, limit, search),
    staleTime: 300000,
  });
};

export const useGetAllHubungiKami = (
  page: number,
  limit: number,
  search?: string | null,
) => {
  return useQuery({
    queryKey: ["getAllHubungiKami"],
    queryFn: () => getAllHubungiKami(page, limit, search),
    staleTime: 300000,
  });
};

export const useUpdateHubungiKami = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IHubungiKamiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreHubungiKami }
  >({
    mutationFn: ({ id, formData }) => updateHubungiKami(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateHubungiKami"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
