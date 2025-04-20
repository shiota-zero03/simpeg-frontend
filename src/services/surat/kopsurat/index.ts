import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getKopSuratBySlug, updateKopSurat } from "./http";
import { IKopSuratDetaiRes } from "@/interface/responses/surat.interface";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { StoreKopSurat } from "@/interface/request/surat.interface";

export const useGetKopSuratBySlug = (
  slug:
    | "SURAT_PEMERIKSAAN"
    | "SURAT_PEMANGGILAN"
    | "BERITA_ACARA_PERMINTAAN_KETERANGAN"
    | "BERITA_ACARA_PEMERIKSAAN"
    | "HASIL_PEMERIKSAAN"
    | "HUKUMAN_DISIPLIN",
) => {
  return useQuery({
    queryKey: ["getKopSuratBySlug"],
    queryFn: () => getKopSuratBySlug(slug),
    staleTime: 300000,
  });
};
export const useUpdateKopSurat = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IKopSuratDetaiRes,
    AxiosError<BaseErrorRes>,
    { id: string; formData: StoreKopSurat }
  >({
    mutationFn: ({ id, formData }) => updateKopSurat(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateKopSurat"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
