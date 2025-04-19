import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import DetailExportSurat from "./DetEx";
import { SuratPemanggilanRes } from "@/interface/responses/surat.interface";
import { useGetDetailSuratPemanggilan } from "@/services/surat/pemanggilan";

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

  useEffect(() => {
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
      };
    } else {
      return null;
    }
  }, [id, data]);

  useEffect(() => {
    if (!isFetching && DATA_DETAIL) {
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
  }, [isFetching, DATA_DETAIL]);

  return (
    <>
      {DATA_DETAIL && (
        <DetailExportSurat DATA_DETAIL={DATA_DETAIL} isFetching={isFetching} />
      )}
    </>
  );
}
