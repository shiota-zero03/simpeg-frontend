import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import DetailExportSurat from "./DetEx";
import { BeritaAcaraPermintaanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { useGetDetailBeritaAcaraPermintaan } from "@/services/surat/berita-acara-permintaan";

export default function ExportSurat() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } =
    useGetDetailBeritaAcaraPermintaan(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/berita-acara-permintaan-keterangan");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("SURAT_PEMERIKSAAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: BeritaAcaraPermintaanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        nomorSurat: data.data.nomorSurat,
        nomorSuratKeterangan: data.data.nomorSuratKeterangan,
        tanggalSurat: data.data.tanggalSurat,
        waktu: data.data.waktu,
        tempat: data.data.tempat,
        keterangan: data.data.keterangan,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,
        TimPemeriksa: data.data.TimPemeriksa,
        PihakDimintai: data.data.PihakDimintai,
        Pertanyaan: data.data.Pertanyaan,
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
