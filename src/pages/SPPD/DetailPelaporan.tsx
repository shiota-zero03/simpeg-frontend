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
import {
  useGetAllSPPDUserAll,
  useGetDetailPelaporanSPPD,
} from "@/services/sppd";
import { PelaporanSPPDRes } from "@/interface/responses/sppd.interface";
import { DMYIndoToFormat } from "@/utils/dateFormater";

export default function DetailPemeriksaan() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data, isFetching, refetch, error } = useGetDetailPelaporanSPPD(
    id || "",
  );
  useEffect(() => {
    if (!isFetching && error) {
      ErrorToast({ text: "Data tidak ditemukan" });
      navigate("/sppd?tab=pelaporan");
    }
  }, [isFetching, refetch]);

  const DATA_DETAIL: PelaporanSPPDRes | null = useMemo(() => {
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

  const createdAtDate = data?.data?.createdAt
    ? new Date(data.data.createdAt)
    : new Date(); // fallback kalau belum ada data

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Menambahkan leading zero untuk bulan
    const day = date.getDate().toString().padStart(2, "0"); // Menambahkan leading zero untuk hari
    return `${year}-${month}-${day}`;
  };

  const startDate = new Date(
    createdAtDate.getFullYear(),
    createdAtDate.getMonth(),
    1,
  );
  const endDate = new Date(
    createdAtDate.getFullYear(),
    createdAtDate.getMonth() + 1,
    1,
  );

  const startDateFormatted = formatDate(startDate);
  const endDateFormatted = formatDate(endDate);

  const {
    data: dataRekap,
    isFetching: isFetchingRekap,
    refetch: refetchRekap,
  } = useGetAllSPPDUserAll(startDateFormatted, endDateFormatted);

  /* eslint-disable @typescript-eslint/no-unused-vars */
  const DATA_FETCHING = useMemo(() => {
    if (dataRekap) {
      const parsedData = dataRekap.data.response.map((item, index) => {
        const startDate = new Date(item.sppd.startDate);
        const endDate = new Date(item.sppd.endDate);

        return {
          no: index + 1,
          nama: item.user.name || "-",
          norek: item.sppd.kodeRekening || "-",
          nosp: item.sppd.nomorSurat || "-",
          tgl: `${item.sppd.startDate ? DMYIndoToFormat(item.sppd.startDate) : ""} - ${item.sppd.endDate ? DMYIndoToFormat(item.sppd.endDate) : ""}`,
          tujuan: item.sppd.location || "-",
          uraian: item.sppd.reasoning || "-",
          transport: item.budgets[0] ? item.budgets[0].transport || 0 : 0,
          xtransport: item.budgets[0] ? item.budgets[0].volTransport || 0 : 0,
          jumlahtransport: item.budgets[0]
            ? (item.budgets[0].transport || 0) *
              (item.budgets[0].volTransport || 0)
            : 0,
          representatif: item.budgets[0]
            ? item.budgets[0].representatif || 0
            : 0,
          xrepresentatif: item.budgets[0]
            ? item.budgets[0].volRepresentatif || 0
            : 0,
          jumlahrepresentatif: item.budgets[0]
            ? (item.budgets[0].representatif || 0) *
              (item.budgets[0].volRepresentatif || 0)
            : 0,
          daily: item.budgets[0] ? item.budgets[0].dailyAllowance || 0 : 0,
          xdaily: item.budgets[0] ? item.budgets[0].volDailyAllowance || 0 : 0,
          jumlahdaily: item.budgets[0]
            ? (item.budgets[0].dailyAllowance || 0) *
              (item.budgets[0].volDailyAllowance || 0)
            : 0,
          total: item.budgets[0]
            ? (item.budgets[0].transport || 0) *
                (item.budgets[0].volTransport || 0) +
              (item.budgets[0].representatif || 0) *
                (item.budgets[0].volRepresentatif || 0) +
              (item.budgets[0].dailyAllowance || 0) *
                (item.budgets[0].volDailyAllowance || 0)
            : 0,
          type: item.sppd.type,
          startDate,
          endDate,
          issame: false,
        };
      });

      for (let i = 0; i < parsedData.length; i++) {
        for (let j = 0; j < parsedData.length; j++) {
          if (
            i !== j &&
            parsedData[i].nama === parsedData[j].nama &&
            parsedData[i].startDate <= parsedData[j].endDate &&
            parsedData[i].endDate >= parsedData[j].startDate
          ) {
            parsedData[i].issame = true;
            break;
          }
        }
      }

      return parsedData.map(({ startDate, endDate, ...rest }) => rest);
    } else return [];
  }, [dataRekap, data]);
  /* eslint-enable @typescript-eslint/no-unused-vars */

  useEffect(() => {
    refetch();
    refetchRekap();
  }, []);

  useEffect(() => {
    refetchRekap();
  }, [data]);

  return (
    <>
      <BreadcrumbAdmin location="/SPPD/Detail-Pelaporan" />
      {isFetching || isFetchingRekap ? (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      ) : (
        <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
          <div className="flex">
            <Link
              to={`/sppd?tab=pelaporan`}
              className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
            >
              <LuArrowLeft /> Kembali
            </Link>
          </div>
          <TitleCase title="Detail Laporan SPPD" />
          <Card className="border" shadow="none">
            <CardHeader className="p-8">
              <Link
                to={`/sppd/export-pelaporan/${id}`}
                target="__blank"
                className="flex gap-2 items-center text-danger border border-danger font-semibold p-2 text-sm rounded-md ms-auto"
              >
                <FaFilePdf size={18} /> Export .pdf
              </Link>
            </CardHeader>
            <CardBody className="flex flex-col md:px-20 px-4">
              {DATA_DETAIL && (
                <DetailExport
                  DATA_DETAIL={DATA_DETAIL}
                  isFetching={isFetching}
                  data={DATA_FETCHING}
                />
              )}
            </CardBody>
          </Card>
        </div>
      )}
    </>
  );
}
