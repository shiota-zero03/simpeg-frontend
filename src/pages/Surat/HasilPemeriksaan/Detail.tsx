import { TitleCase } from "@/components/card/TitleCase";
import { Card, CardBody, CardHeader } from "@heroui/react";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { LuArrowLeft } from "react-icons/lu";
import { FaFilePdf } from "react-icons/fa";
import DetailExportSurat from "./DetEx";
import { HasilPemeriksaanRes } from "@/interface/responses/surat.interface";
import { Commet } from "react-loading-indicators";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";
import { useGetDetailHasilPemeriksaan } from "@/services/surat/hasil-pemeriksaan";

export default function DetailPemeriksaan() {
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
    refetch();
    refetchKop();
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

  return (
    <>
      <BreadcrumbAdmin location="/Laporan-Hasil-Pemeriksaan/Detail" />
      {isFetching || isFetchingKop ? (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      ) : (
        <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
          <div className="flex">
            <Link
              to={`/laporan-hasil-pemeriksaan`}
              className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
            >
              <LuArrowLeft /> Kembali
            </Link>
          </div>
          <TitleCase title="Detail Laporan Hasil Pemeriksaan" />
          <Card className="border" shadow="none">
            <CardHeader className="p-8">
              <Link
                to={`/laporan-hasil-pemeriksaan/export-data/${id}`}
                target="__blank"
                className="flex gap-2 items-center text-danger border border-danger font-semibold p-2 text-sm rounded-md ms-auto"
              >
                <FaFilePdf size={18} /> Export .pdf
              </Link>
            </CardHeader>
            <CardBody className="flex flex-col">
              {DATA_DETAIL && kopSuratData && (
                <DetailExportSurat
                  DATA_DETAIL={DATA_DETAIL}
                  isFetching={isFetching}
                  kopSurat={kopSuratData.kopSurat || ""}
                />
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
