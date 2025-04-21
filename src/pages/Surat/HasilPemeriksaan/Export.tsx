import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import DetailExportSurat from "./DetEx";
import { HasilPemeriksaanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { useGetDetailHasilPemeriksaan } from "@/services/surat/hasil-pemeriksaan";

export default function ExportSurat() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailHasilPemeriksaan(
    id || "",
  );
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/laporan-hasil-pemeriksaan");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("HASIL_PEMERIKSAAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: HasilPemeriksaanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        lokasi: data.data.lokasi,
        yangMelaporkan: data.data.yangMelaporkan,
        nipMelaporkan: data.data.nipMelaporkan,
        jabatanMelaporkan: data.data.jabatanMelaporkan,
        pangkatMelaporakn: data.data.pangkatMelaporakn,
        nameKepada: data.data.nameKepada,
        namePermintaan: data.data.namePermintaan,
        tanggalSurat: data.data.tanggalSurat,
        nipPermintaan: data.data.nipPermintaan,
        jabatanPermintaan: data.data.jabatanPermintaan,
        golonganPermintaan: data.data.golonganPermintaan,
        unitPermintaan: data.data.unitPermintaan,
        keterangan: data.data.keterangan,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,
        hasil: data.data.hasil,
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
