import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import DetailExportSurat from "./DetEx";
import { BeritaAcaraPemeriksaanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { useGetDetailBeritaAcaraPemeriksaan } from "@/services/surat/berita-acara-pemeriksaan";

export default function ExportSurat() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } =
    useGetDetailBeritaAcaraPemeriksaan(id || "");
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/berita-acara-pemeriksaan");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("BERITA_ACARA_PEMERIKSAAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: BeritaAcaraPemeriksaanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        tanggalSurat: data.data.tanggalSurat,
        nomorSurat: data.data.nomorSurat,
        keterangan: data.data.keterangan,
        pemeriksa: data.data.pemeriksa,
        nipPemeriksa: data.data.nipPemeriksa,
        jabatanPemeriksa: data.data.jabatanPemeriksa,
        pangkatPemeriksa: data.data.pangkatPemeriksa,
        golonganPemeriksa: data.data.golonganPemeriksa,
        unitPemeriksa: data.data.unitPemeriksa,
        diPeriksa: data.data.diPeriksa,
        nipDiPeriksa: data.data.nipDiPeriksa,
        jabatanDiPeriksa: data.data.jabatanDiPeriksa,
        pangkatDiPeriksa: data.data.pangkatDiPeriksa,
        golonganDiPeriksa: data.data.golonganDiPeriksa,
        unitDiPeriksa: data.data.unitDiPeriksa,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,
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
