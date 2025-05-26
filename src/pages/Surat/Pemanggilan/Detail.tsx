import { TitleCase } from "@/components/card/TitleCase";
import { Card, CardBody, CardHeader } from "@heroui/react";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { ErrorToast } from "@/utils/ToastMessage";
import { LuArrowLeft } from "react-icons/lu";
import { FaFilePdf } from "react-icons/fa";
import DetailExportSurat from "./DetEx";
import { SuratPemanggilanRes } from "@/interface/responses/surat.interface";
import { Commet } from "react-loading-indicators";
import { useGetDetailSuratPemanggilan } from "@/services/surat/pemanggilan";
import { useGetKopSuratBySlug } from "@/services/surat/kopsurat";

export default function DetailPemeriksaan() {
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
    refetch();
    refetchKop();
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

  return (
    <>
      <BreadcrumbAdmin location="/Surat-Pemanggilan/Detail" />
      {isFetching || isFetchingKop ? (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      ) : (
        <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
          <div className="flex">
            <Link
              to={`/surat-pemanggilan`}
              className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
            >
              <LuArrowLeft /> Kembali
            </Link>
          </div>
          <TitleCase title="Detail Surat Pemanggilan" />
          <Card className="border" shadow="none">
            <CardHeader className="p-8">
              <Link
                to={`/surat-pemanggilan/export-data/${id}`}
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
