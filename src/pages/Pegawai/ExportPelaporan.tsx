import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { useNavigate, useParams } from "react-router-dom";
import DetailExport from "./PelaporanDetail";
import { PelaporanPegawaiRes } from "@/interface/responses/pegawai.interface";
import { useGetDetailPelaporanPegawai } from "@/services/pegawai";

export default function ExportSurat() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailPelaporanPegawai(
    id || "",
  );
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/pegawai");
    }
  }, [isFetching, refetch]);

  useEffect(() => {
    refetch();
  }, []);

  const DATA_DETAIL: PelaporanPegawaiRes | null = useMemo(() => {
    if (data) {
      return {
        id: data.data.id,
        latarBelakang: data.data.latarBelakang,
        sasaran: data.data.sasaran,
        maksud: data.data.maksud,
        tujuan: data.data.tujuan,
        dasarHukum: data.data.dasarHukum,
        isiLaporan: data.data.isiLaporan,
        jabatanPengelola: data.data.jabatanPengelola,
        pengelola: data.data.pengelola,
        nipPengelola: data.data.nipPengelola,
        subgadin: data.data.subgadin,
        jabatanSubagin: data.data.jabatanSubagin,
        nipSubagin: data.data.nipSubagin,
        sekertaris: data.data.sekertaris,
        jabatanSekertaris: data.data.jabatanSekertaris,
        nipSekertaris: data.data.nipSekertaris,
        createdAt: data.data.createdAt,
        updatedAt: data.data.updatedAt,
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
        <DetailExport
            DATA_DETAIL={DATA_DETAIL}
            isFetching={isFetching}
        />
      )}
    </>
  );
}
