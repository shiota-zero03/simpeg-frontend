import instance from "@/api/axios";
import { StoreKopSurat } from "@/interface/request/surat.interface";
import { IKopSuratDetaiRes } from "@/interface/responses/surat.interface";

export const getKopSuratBySlug = async (
  slug:
    | "SURAT_PEMERIKSAAN"
    | "SURAT_PEMANGGILAN"
    | "BERITA_ACARA_PERMINTAAN_KETERANGAN"
    | "BERITA_ACARA_PEMERIKSAAN"
    | "HASIL_PEMERIKSAAN"
    | "HUKUMAN_DISIPLIN",
): Promise<IKopSuratDetaiRes> => {
  const response = await instance.get(`/admin/kop-surat/slug/${slug}`);
  return response.data;
};

export const updateKopSurat = async (
  id: string,
  formData: StoreKopSurat,
): Promise<IKopSuratDetaiRes> => {
  const response = await instance.put(
    `/admin/kop-surat/update/${id}`,
    formData,
  );
  return response.data;
};
