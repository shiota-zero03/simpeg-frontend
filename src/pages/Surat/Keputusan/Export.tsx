import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import DetailExportSurat from "./DetEx";
import { KeputusanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { useGetDetailKeputusan } from "@/services/surat/surat-keputusan";

export default function ExportSurat() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailKeputusan(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/keputusan-hukuman-disiplin");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("HUKUMAN_DISIPLIN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: KeputusanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        membaca: data.data.membaca,
        menimbang: data.data.menimbang,
        mengingat: data.data.mengingat,
        kesatu: data.data.kesatu,
        nameYangDitetapkan: data.data.nameYangDitetapkan,
        nipYangDitetapkan: data.data.nipYangDitetapkan,
        jabatanYangDitetapkan: data.data.jabatanYangDitetapkan,
        golonganYangDitetapkan: data.data.golonganYangDitetapkan,
        unitYangDitetapkan: data.data.unitYangDitetapkan,
        alasan: data.data.alasan,
        kedua: data.data.kedua,
        ketiga: data.data.ketiga,
        nameJabatan: data.data.nameJabatan,
        nipJabatan: data.data.nipJabatan,
        ttdJabatan: data.data.ttdJabatan,
        tanggalSurat: data.data.tanggalSurat,
        nomorSurat: data.data.nomorSurat,
        tingkat: data.data.tingkat,
        tempatDikeluarkan: data.data.tempatDikeluarkan,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,
        tembusan: data.data.tembusan,
      };
    } else {
      return null;
    }
  }, [id, data]);

  useEffect(() => {
    if (!isFetching && !isFetchingKop && DATA_DETAIL && kopSuratData) {
      // Tunggu render selesai dulu baru trigger print
      setTimeout(() => {
        window.print();
      }, 500);

      // Setelah print ditutup, close tab
      const handleAfterPrint = () => {
        window.close();
      };

      window.addEventListener("afterprint", handleAfterPrint);

      return () => {
        window.removeEventListener("afterprint", handleAfterPrint);
      };
    }
  }, [isFetching, isFetchingKop, DATA_DETAIL, kopSuratData]);

  return (
    <>
      {DATA_DETAIL && kopSuratData && (
        <DetailExportSurat
          DATA_DETAIL={DATA_DETAIL}
          isFetching={isFetching}
          kopSurat={kopSuratData.kopSurat}
        />
      )}
    </>
  );
}
