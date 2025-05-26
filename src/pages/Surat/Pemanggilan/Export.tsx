import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import DetailExportSurat from "./DetEx";
import { SuratPemanggilanRes } from "@/interface/responses/surat.interface";
import { useGetDetailSuratPemanggilan } from "@/services/surat/pemanggilan";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";

export default function ExportSurat() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailSuratPemanggilan(
    id || "",
  );
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/surat-pemanggilan");
    }
  }, [isFetching, refetch]);

  const {
    data: allKop,
    isFetching: isFetchingKop,
    refetch: refetchKop,
  } = useGetKopSuratBySlug("SURAT_PEMANGGILAN");

  const kopSuratData = useMemo(() => {
    if (!allKop) return null;
    return allKop.data;
  }, [allKop]);

  useEffect(() => {
    refetchKop();
    refetch();
  }, []);

  const DATA_DETAIL: SuratPemanggilanRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        nomorSurat: data.data.nomorSurat,
        nomorPemanggilan: data.data.nomorPemanggilan,
        tanggalSurat: data.data.tanggalSurat,
        waktu: data.data.waktu,
        tempat: data.data.tempat,
        keterangan: data.data.keterangan,
        pemanggil: data.data.pemanggil,
        nipPemanggil: data.data.nipPemanggil,
        jabatanPemanggil: data.data.jabatanPemanggil,
        unitPemanggil: data.data.unitPemanggil,
        diPanggil: data.data.diPanggil,
        nipDiPanggil: data.data.nipDiPanggil,
        jabatanDiPanggil: data.data.jabatanDiPanggil,
        unitDiPanggil: data.data.unitDiPanggil,
        namaTtd: data.data.namaTtd,
        nipTtd: data.data.nipTtd,
        jabatanTtd: data.data.jabatanTtd,
        DiPanggilSuratPemanggilan: data.data.DiPanggilSuratPemanggilan,
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
