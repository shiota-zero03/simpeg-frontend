import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailSuratPemeriksaan } from "@/services/surat/pemeriksaan";
import DetailExportSurat from "./DetEx";
import { SuratPemeriksaanRes } from "@/interface/responses/surat.interface";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";

export default function ExportSurat() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailSuratPemeriksaan(
    id || "",
  );
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/surat-perintah-pemeriksaan");
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

  const DATA_DETAIL: SuratPemeriksaanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        nomorSurat: data.data.nomorSurat,
        tempatDikeluarkan: data.data.tempatDikeluarkan,
        tanggalSurat: data.data.tanggalSurat,
        pemberiPerintah: data.data.pemberiPerintah,
        nipPemberiPerintah: data.data.nipPemberiPerintah,
        jabatanPemberiPerintah: data.data.jabatanPemberiPerintah,
        diPerintah: data.data.diPerintah,
        nipDiPerintah: data.data.nipDiPerintah,
        jabatanDiPerintah: data.data.jabatanDiPerintah,
        keterangan: data.data.keterangan,
        namaTtd: data.data.namaTtd,
        nipTtd: data.data.nipTtd,
        jabatanTtd: data.data.jabatanTtd,
        DiPerintahSuratPemeriksaan: data.data.DiPerintahSuratPemeriksaan,
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
