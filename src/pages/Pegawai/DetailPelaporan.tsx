import { TitleCase } from "@/components/card/TitleCase";
import { Card, CardBody, CardHeader } from "@heroui/react";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { LuArrowLeft } from "react-icons/lu";
import { FaFilePdf } from "react-icons/fa";
import DetailExport from "./PelaporanDetail";
import { Commet } from "react-loading-indicators";
import { useGetDetailPelaporanPegawai } from "@/services/pegawai";
import { PelaporanPegawaiRes } from "@/interface/responses/pegawai.interface";

export default function DetailPemeriksaan() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailPelaporanPegawai(
    id || "",
  );
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/pegawai?tab=pelaporan");
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

  return (
    <>
      <BreadcrumbAdmin location="/Pegawai/Detail" />
      {isFetching ? (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      ) : (
        <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
          <div className="flex">
            <Link
              to={`/pegawai?tab=pelaporan`}
              className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
            >
              <LuArrowLeft /> Kembali
            </Link>
          </div>
          <TitleCase title="Detail Laporan Pegawai" />
          <Card className="border" shadow="none">
            <CardHeader className="p-8">
              <Link
                to={`/pegawai/export-pelaporan/${id}`}
                target="__blank"
                className="flex gap-2 items-center text-danger border border-danger font-semibold p-2 text-sm rounded-md ms-auto"
              >
                <FaFilePdf size={18} /> Export .pdf
              </Link>
            </CardHeader>
            <CardBody className="flex flex-col">
              {DATA_DETAIL && (
                <DetailExport
                  DATA_DETAIL={DATA_DETAIL}
                  isFetching={isFetching}
                />
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
