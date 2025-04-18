import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDetailSuratPemeriksaan } from "@/services/surat/pemeriksaan";
import DetailExportSurat from "./DetEx";
import { SuratPemeriksaanRes } from "@/interface/responses/surat.interface";

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

  useEffect(() => {
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
