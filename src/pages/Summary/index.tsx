import { TitleCase } from "@/components/card/TitleCase";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  useDisclosure,
} from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import { LuSearch } from "react-icons/lu";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { FaFileExcel } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaFilePdf, FaUsers } from "react-icons/fa";
import { YMToIndoFormat } from "@/utils/dateFormater";
import PegawaiModal from "@/components/modals/SummaryReportModal/PegawaiModal";
import {
  useGetAllPegawaiAdmin,
  useGetAllPegawaiOption,
} from "@/services/pegawai";
import { useGetAllUnitOption } from "@/services/unit";
import { PegawaiRes } from "@/interface/responses/pegawai.interface";
import {
  EselonData,
  GolonganData,
  pendidikanTerakhir,
} from "@/constants/DummyData";
import dayjs from "dayjs";
import { Commet } from "react-loading-indicators";
import GrafikPegawai from "@/components/Charts/GrafikLaporanPegawai";

export default function Jabatan() {
  const dateDefault = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [search, setSearch] = useState(dateDefault);

  const getStartAndEndDate = (month: string) => {
    const [year, mon] = month.split("-").map(Number);
    const startDate = `${year}-${String(mon).padStart(2, "0")}-01`;
    const endDate = new Date(year, mon, 0); // tanggal terakhir bulan tsb
    const formattedEndDate = `${year}-${String(mon).padStart(2, "0")}-${String(endDate.getDate()).padStart(2, "0")}`;

    return { startDate, endDate: formattedEndDate };
  };

  const {
    data: allDataSurat,
    isFetching: isFetchingDataSurat,
    refetch: refetchDataSurat,
  } = useGetAllPegawaiAdmin(
    1,
    500,
    "",
    getStartAndEndDate(search || dateDefault).startDate,
    getStartAndEndDate(search || dateDefault).endDate,
  );

  const dataSurat = useMemo(() => {
    if (allDataSurat) {
      const dataForSurat = allDataSurat.data.response;
      return {
        cuti: dataForSurat.filter((it) => it.typeForm === "CUTI"),
        pangkat: dataForSurat.filter(
          (it) => it.typeForm === "KENAIKAN_PANGKAT",
        ),
        gaji: dataForSurat.filter((it) => it.typeForm === "KENAIKAN_GAJI"),
      };
    } else {
      return {
        cuti: [],
        pangkat: [],
        gaji: [],
      };
    }
  }, [search, dateDefault, allDataSurat]);

  useEffect(() => {
    refetchDataSurat();
  }, [search, dateDefault]);

  const [showData, setShowData] = useState<PegawaiRes[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data, refetch } = useGetAllPegawaiOption();
  const { data: dataUnit, refetch: refetchUnit } = useGetAllUnitOption();

  const DATA_FETCHING = useMemo(() => {
    if (data) return data.data;
    else return [];
  }, [data]);

  const DATA_FETCHING_UNIT = useMemo(() => {
    if (dataUnit && dataUnit.data) {
      const filteredUnits = dataUnit.data?.filter(
        (item) =>
          item.nameUnit.toLowerCase().includes("dinas") ||
          item.nameUnit.toLowerCase().includes("uptd"),
      );

      return [...filteredUnits].sort((a, b) => a.id - b.id); // ascending berdasarkan id
    } else {
      return null;
    }
  }, [dataUnit]);

  useEffect(() => {
    refetch();
    refetchDataSurat();
    refetchUnit();
  }, []);

  const [selectedTab, setSelectedTab] = useState<string>("tabel");

  return (
    <>
      <PegawaiModal pegawai={showData} isOpen={isOpen} onClose={onClose} />
      <BreadcrumbAdmin location="/Summary-Report" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Summary Report Pegawai"
          text="Berikut ini menampilkan Summary Report Infografis Data Kepegawaian"
        />
        <div className="bg-white shadow-md rounded-xl border min-h-[70vh]">
          <div className="flex lg:items-center items-end lg:px-0 px-4 lg:flex-row flex-col justify-between lg:gap-0 gap-2">
            <div className="pt-8 px-4 w-full text-primary shadow-sm">
              <div className="flex lg:flex-row flex-col justify-between gap-2 sm:items-end">
                <div className="flex items-center gap-1">
                  <Button
                    radius="sm"
                    onPress={() => setSelectedTab("tabel")}
                    variant={selectedTab === "tabel" ? "solid" : "bordered"}
                    color="primary"
                    className="border-[0.8px]"
                  >
                    Tabel
                  </Button>
                  <Button
                    radius="sm"
                    onPress={() => setSelectedTab("grafik")}
                    variant={selectedTab === "grafik" ? "solid" : "bordered"}
                    color="primary"
                    className="border-[0.8px]"
                  >
                    Grafik
                  </Button>
                </div>
                <div className="flex sm:flex-row flex-col gap-2 items-end w-full">
                  <Input
                    label="Filter Bulan dan Tahun"
                    labelPlacement="outside"
                    type="month"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari nama jabatan disini"
                    startContent={
                      <LuSearch className="text-accent-gray text-xs" />
                    }
                    classNames={{
                      inputWrapper: "border-[0.8px] m-0 p-1 border-primary",
                      input: "text-xs",
                      label: "font-medium",
                    }}
                  />
                </div>
                <div className="flex sm:flex-row flex-col items-center justify-end gap-2">
                  <Link
                    to={`/summary-report/export/pdf?m=${search}`}
                    target="__blank"
                    className="border-[0.8px] text-xs w-32 border-danger text-danger flex items-center justify-center gap-2 p-2 rounded-lg font-medium hover:bg-danger hover:text-white duration-200"
                  >
                    <FaFilePdf size={12} /> Export PDF
                  </Link>
                  <Link
                    to={`/summary-report/export/excel?m=${search}`}
                    target="__blank"
                    className="border-[0.8px] text-xs w-32 border-success text-success flex items-center justify-center gap-2 p-2 rounded-lg font-medium hover:bg-success hover:text-white duration-200"
                  >
                    <FaFileExcel size={12} /> Export Excel
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 px-4 w-full text-primary shadow-sm">
            <div className="grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
              <CardSummary
                name={"Jumlah Pegawai"}
                count={DATA_FETCHING ? DATA_FETCHING.length : 0}
                iconBackgroundClass={
                  "bg-gradient-to-b from-[#137269] to-[#24D8C7]"
                }
                textBackgroundClass={"text-[#137269]"}
              />
              <CardSummary
                name={"Jumlah ASN"}
                count={
                  DATA_FETCHING
                    ? DATA_FETCHING.filter((it) => it.statusAsn === true).length
                    : 0
                }
                iconBackgroundClass={
                  "bg-gradient-to-b from-[#AF52DE] to-[#5F2C78]"
                }
                textBackgroundClass={"text-[#AF52DE]"}
              />
              <CardSummary
                name={"Jumlah Non-ASN"}
                count={
                  DATA_FETCHING
                    ? DATA_FETCHING.filter((it) => it.statusAsn === false)
                        .length
                    : 0
                }
                iconBackgroundClass={
                  "bg-gradient-to-b from-[#FFBB00] to-[#995900]"
                }
                textBackgroundClass={"text-[#FFBB00]"}
              />
              <CardSummary
                name={"Jabatan Fungsional"}
                count={
                  DATA_FETCHING
                    ? DATA_FETCHING.filter(
                        (it) => it.jabatan.fungsional === true,
                      ).length
                    : 0
                }
                iconBackgroundClass={
                  "bg-gradient-to-b from-[#007AFF] to-[#004999]"
                }
                textBackgroundClass={"text-[#007AFF]"}
              />
            </div>
          </div>
          {selectedTab === "tabel" ? (
            <div className="pt-8 sm:px-4 w-full text-primary shadow-sm">
              <Card className="p-4" shadow="sm" radius="sm">
                <CardHeader>
                  <h1 className="font-semibold">
                    Bulan {YMToIndoFormat(search || dateDefault)}
                  </h1>
                </CardHeader>
                <CardBody className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2 relative">
                    {isFetchingDataSurat && (
                      <div className="inset-0 absolute flex items-center justify-center z-20">
                        <Commet
                          color="#32cd32"
                          size="medium"
                          text=""
                          textColor=""
                        />
                      </div>
                    )}
                    <h3 className="text-button-primary font-medium text-sm">
                      Kenaikan Pangkat, Kegiatan Gaji Berkala, Pensiun dan Cuti
                    </h3>
                    <Divider className="w-24 bg-button-primary" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                              No
                            </th>
                            <th className="border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                              Daftar
                            </th>
                            <th className="border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-center">
                              Jumlah Orang
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                              1
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Daftar Kenaikan Pangkat Pegawai{" "}
                              {YMToIndoFormat(search || dateDefault)}
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  dataSurat.pangkat.map((item) => ({
                                    id: item.user.id,
                                    name: item.user.name,
                                    nip: item.user.nip,
                                    jabatan: item.user.jabatan,
                                  })) as unknown as PegawaiRes[],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {dataSurat.pangkat.length} Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                              2
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Daftar Kenaikan Gaji Berkala Pegawai{" "}
                              {YMToIndoFormat(search || dateDefault)}
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  dataSurat.gaji.map((item) => ({
                                    id: item.user.id,
                                    name: item.user.name,
                                    nip: item.user.nip,
                                    jabatan: item.user.jabatan,
                                  })) as unknown as PegawaiRes[],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {dataSurat.gaji.length} Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                              3
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Daftar Pegawai Cuti{" "}
                              {YMToIndoFormat(search || dateDefault)}
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  dataSurat.cuti.map((item) => ({
                                    id: item.user.id,
                                    name: item.user.name,
                                    nip: item.user.nip,
                                    jabatan: item.user.jabatan,
                                  })) as unknown as PegawaiRes[],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {dataSurat.cuti.length} Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                              4
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Daftar Pegawai Pensiun{" "}
                              {YMToIndoFormat(search || dateDefault)}
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          dayjs(it.pensionDate).format(
                                            "YYYY-MM",
                                          ) === (search || dateDefault),
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      dayjs(it.pensionDate).format(
                                        "YYYY-MM",
                                      ) === (search || dateDefault),
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-button-primary font-medium text-sm">
                      Data Pegawai ASN
                    </h3>
                    <Divider className="w-24 bg-button-primary" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                              No
                            </th>
                            <th className="border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                              Unit
                            </th>
                            <th className="border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-center">
                              Jumlah Orang
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {DATA_FETCHING_UNIT?.map((item, index) => (
                            <tr key={index}>
                              <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                                {index + 1}
                              </td>
                              <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                                {item.nameUnit}
                              </td>
                              <td
                                className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                                onClick={() => {
                                  setShowData(
                                    DATA_FETCHING
                                      ? DATA_FETCHING.filter(
                                          (it) =>
                                            it.jabatan?.unit?.id === item.id &&
                                            it.statusAsn === true,
                                        )
                                      : [],
                                  );
                                  setTimeout(() => {
                                    onOpen();
                                  }, 400);
                                }}
                              >
                                {DATA_FETCHING
                                  ? DATA_FETCHING.filter(
                                      (it) =>
                                        it.jabatan?.unit?.id === item.id &&
                                        it.statusAsn === true,
                                    ).length
                                  : 0}{" "}
                                Orang
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th
                              colSpan={2}
                              className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-lg"
                            >
                              Total
                            </th>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-br-lg text-center">
                              {DATA_FETCHING
                                ? DATA_FETCHING_UNIT?.reduce((total, unit) => {
                                    const count = DATA_FETCHING.filter(
                                      (it) =>
                                        it.jabatan?.unit?.id === unit.id &&
                                        it.statusAsn === true,
                                    ).length;
                                    return total + count;
                                  }, 0)
                                : 0}{" "}
                              Orang
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-button-primary font-medium text-sm">
                      Data Pegawai Non-ASN
                    </h3>
                    <Divider className="w-24 bg-button-primary" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                              No
                            </th>
                            <th className="border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                              Unit
                            </th>
                            <th className="border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-center">
                              Jumlah Orang
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {DATA_FETCHING_UNIT?.map((item, index) => (
                            <tr key={index}>
                              <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                                {index + 1}
                              </td>
                              <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                                {item.nameUnit}
                              </td>
                              <td
                                className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                                onClick={() => {
                                  setShowData(
                                    DATA_FETCHING
                                      ? DATA_FETCHING.filter(
                                          (it) =>
                                            it.jabatan?.unit?.id === item.id &&
                                            it.statusAsn === false,
                                        )
                                      : [],
                                  );
                                  setTimeout(() => {
                                    onOpen();
                                  }, 400);
                                }}
                              >
                                {DATA_FETCHING
                                  ? DATA_FETCHING.filter(
                                      (it) =>
                                        it.jabatan?.unit?.id === item.id &&
                                        it.statusAsn === false,
                                    ).length
                                  : 0}{" "}
                                Orang
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th
                              colSpan={2}
                              className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-lg"
                            >
                              Total
                            </th>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-br-lg text-center">
                              {DATA_FETCHING
                                ? DATA_FETCHING_UNIT?.reduce((total, unit) => {
                                    const count = DATA_FETCHING.filter(
                                      (it) =>
                                        it.jabatan?.unit?.id === unit.id &&
                                        it.statusAsn === false,
                                    ).length;
                                    return total + count;
                                  }, 0)
                                : 0}{" "}
                              Orang
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-button-primary font-medium text-sm">
                      Jabatan Fungsional
                    </h3>
                    <Divider className="w-24 bg-button-primary" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                              No
                            </th>
                            <th className="border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                              Jabatan Fungsional
                            </th>
                            <th className="border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-center">
                              Jumlah Orang
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                              1
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Analis Perdagangan
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                            "analis perdagangan ahli madya" ||
                                          it.jabatan?.nameJob.toLowerCase() ===
                                            "analis perdagangan ahli muda" ||
                                          it.jabatan?.nameJob.toLowerCase() ===
                                            "analis perdagangan ahli pertama",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                        "analis perdagangan ahli madya" ||
                                      it.jabatan?.nameJob.toLowerCase() ===
                                        "analis perdagangan ahli muda" ||
                                      it.jabatan?.nameJob.toLowerCase() ===
                                        "analis perdagangan ahli pertama",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10" />
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Analis Perdagangan Ahli Madya
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                          "analis perdagangan ahli madya",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                      "analis perdagangan ahli madya",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10" />
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Analis Perdagangan Ahli Muda
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                          "analis perdagangan ahli muda",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                      "analis perdagangan ahli muda",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10" />
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Analis Perdagangan Ahli Pertama
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                          "analis perdagangan ahli pertama",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                      "analis perdagangan ahli pertama",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                              2
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Pengawas Perdagangan
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                            "pengawas perdagangan ahli madya" ||
                                          it.jabatan?.nameJob.toLowerCase() ===
                                            "pengawas perdagangan ahli muda" ||
                                          it.jabatan?.nameJob.toLowerCase() ===
                                            "pengawas perdagangan ahli pertama",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                        "pengawas perdagangan ahli madya" ||
                                      it.jabatan?.nameJob.toLowerCase() ===
                                        "pengawas perdagangan ahli muda" ||
                                      it.jabatan?.nameJob.toLowerCase() ===
                                        "pengawas perdagangan ahli pertama",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10" />
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Pengawas Perdagangan Ahli Madya
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                          "pengawas perdagangan ahli madya",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                      "pengawas perdagangan ahli madya",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10" />
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Pengawas Perdagangan Ahli Muda
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                          "pengawas perdagangan ahli muda",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                      "pengawas perdagangan ahli muda",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10" />
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Pengawas Perdagangan Ahli Pertama
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                          "pengawas perdagangan ahli pertama",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                      "pengawas perdagangan ahli pertama",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                        </tbody>
                        <tbody>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                              3
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Penera
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                            "penera ahli madya" ||
                                          it.jabatan?.nameJob.toLowerCase() ===
                                            "penera ahli muda" ||
                                          it.jabatan?.nameJob.toLowerCase() ===
                                            "penera ahli pertama",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                        "penera ahli madya" ||
                                      it.jabatan?.nameJob.toLowerCase() ===
                                        "penera ahli muda" ||
                                      it.jabatan?.nameJob.toLowerCase() ===
                                        "penera ahli pertama",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10" />
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Penera Ahli Madya
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                          "penera ahli madya",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                      "penera ahli madya",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10" />
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Penera Ahli Muda
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                          "penera ahli muda",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                      "penera ahli muda",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10" />
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Penera Ahli Pertama
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) =>
                                          it.jabatan?.nameJob.toLowerCase() ===
                                          "penera ahli pertama",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.jabatan?.nameJob.toLowerCase() ===
                                      "penera ahli pertama",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-button-primary font-medium text-sm">
                      Total Pegawai Berdasarkan Eselon
                    </h3>
                    <Divider className="w-24 bg-button-primary" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                              No
                            </th>
                            <th className="border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                              Eselon
                            </th>
                            <th className="border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-center">
                              Jumlah Orang
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {EselonData.map((item, index) => (
                            <tr key={index}>
                              <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                                {index + 1}
                              </td>
                              <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                                {item.nama}
                              </td>
                              <td
                                className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                                onClick={() => {
                                  setShowData(
                                    DATA_FETCHING
                                      ? DATA_FETCHING.filter(
                                          (it) =>
                                            it.jabatan?.eselon === item.nama,
                                        )
                                      : [],
                                  );
                                  setTimeout(() => {
                                    onOpen();
                                  }, 400);
                                }}
                              >
                                {DATA_FETCHING
                                  ? DATA_FETCHING.filter(
                                      (it) => it.jabatan?.eselon === item.nama,
                                    ).length
                                  : 0}{" "}
                                Orang
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th
                              colSpan={2}
                              className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-lg"
                            >
                              Total
                            </th>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-br-lg text-center">
                              {DATA_FETCHING
                                ? EselonData?.reduce((total, unit) => {
                                    const count = DATA_FETCHING.filter(
                                      (it) => it.jabatan?.eselon === unit.nama,
                                    ).length;
                                    return total + count;
                                  }, 0)
                                : 0}{" "}
                              Orang
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-button-primary font-medium text-sm">
                      Total Pegawai Berdasarkan Golongan
                    </h3>
                    <Divider className="w-24 bg-button-primary" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                              No
                            </th>
                            <th className="border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                              Golongan
                            </th>
                            <th className="border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-center">
                              Jumlah Orang
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {GolonganData.map((item, index) => (
                            <tr key={index}>
                              <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                                {index + 1}
                              </td>
                              <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                                {item.nama}
                              </td>
                              <td
                                className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                                onClick={() => {
                                  setShowData(
                                    DATA_FETCHING
                                      ? DATA_FETCHING.filter(
                                          (it) => it.group === item.key,
                                        )
                                      : [],
                                  );
                                  setTimeout(() => {
                                    onOpen();
                                  }, 400);
                                }}
                              >
                                {DATA_FETCHING
                                  ? DATA_FETCHING.filter(
                                      (it) => it.group === item.key,
                                    ).length
                                  : 0}{" "}
                                Orang
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th
                              colSpan={2}
                              className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-lg"
                            >
                              Total
                            </th>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-br-lg text-center">
                              {DATA_FETCHING
                                ? GolonganData?.reduce((total, unit) => {
                                    const count = DATA_FETCHING.filter(
                                      (it) => it.group === unit.key,
                                    ).length;
                                    return total + count;
                                  }, 0)
                                : 0}{" "}
                              Orang
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-button-primary font-medium text-sm">
                      Total Pegawai Berdasarkan Pendidikan
                    </h3>
                    <Divider className="w-24 bg-button-primary" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                              No
                            </th>
                            <th className="border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                              Pendidikan
                            </th>
                            <th className="border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-center">
                              Jumlah Orang
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendidikanTerakhir.map((item, index) => (
                            <tr key={index}>
                              <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                                {index + 1}
                              </td>
                              <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                                {item.name}
                              </td>
                              <td
                                className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                                onClick={() => {
                                  setShowData(
                                    DATA_FETCHING
                                      ? DATA_FETCHING.filter(
                                          (it) => it.education === item.key,
                                        )
                                      : [],
                                  );
                                  setTimeout(() => {
                                    onOpen();
                                  }, 400);
                                }}
                              >
                                {DATA_FETCHING
                                  ? DATA_FETCHING.filter(
                                      (it) => it.education === item.key,
                                    ).length
                                  : 0}{" "}
                                Orang
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <th
                              colSpan={2}
                              className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-lg"
                            >
                              Total
                            </th>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-br-lg text-center">
                              {DATA_FETCHING
                                ? pendidikanTerakhir?.reduce((total, unit) => {
                                    const count = DATA_FETCHING.filter(
                                      (it) => it.education === unit.key,
                                    ).length;
                                    return total + count;
                                  }, 0)
                                : 0}{" "}
                              Orang
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-button-primary font-medium text-sm">
                      Total Pegawai Berdasarkan Jenis Kelamin
                    </h3>
                    <Divider className="w-24 bg-button-primary" />
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                              No
                            </th>
                            <th className="border-b-2 min-w-60 border-accent-gray p-2 text-sm bg-primary text-white">
                              Jenis Kelamin
                            </th>
                            <th className="border-b-2 min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-center">
                              Jumlah Orang
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                              1
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Laki - Laki
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) => it.gender === "LAKI_LAKI",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) => it.gender === "LAKI_LAKI",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                              2
                            </td>
                            <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                              Perempuan
                            </td>
                            <td
                              className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer"
                              onClick={() => {
                                setShowData(
                                  DATA_FETCHING
                                    ? DATA_FETCHING.filter(
                                        (it) => it.gender === "PEREMPUAN",
                                      )
                                    : [],
                                );
                                setTimeout(() => {
                                  onOpen();
                                }, 400);
                              }}
                            >
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) => it.gender === "PEREMPUAN",
                                  ).length
                                : 0}{" "}
                              Orang
                            </td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <th
                              colSpan={2}
                              className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-lg"
                            >
                              Total
                            </th>
                            <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-br-lg text-center">
                              {DATA_FETCHING
                                ? DATA_FETCHING.filter(
                                    (it) =>
                                      it.gender === "LAKI_LAKI" ||
                                      it.gender === "PEREMPUAN",
                                  ).length
                                : 0}{" "}
                              Orang
                            </th>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          ) : (
            <div className="pt-8 sm:px-4 w-full text-primary shadow-sm">
              <GrafikPegawai data={DATA_FETCHING} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const CardSummary = ({
  name,
  count,
  iconBackgroundClass,
  textBackgroundClass,
}: {
  name: string;
  count: number;
  iconBackgroundClass: string;
  textBackgroundClass: string;
}) => {
  return (
    <Card shadow="sm" radius="sm">
      <CardBody>
        <div className="flex items-center gap-4 p-3">
          <div
            className={`${iconBackgroundClass} text-white p-2.5 rounded-lg shadow-md`}
          >
            <FaUsers size={24} />
          </div>
          <div className="flex flex-col gap-1">
            <p>{name}</p>
            <h1 className={`text-2xl font-bold ${textBackgroundClass}`}>
              {count}
            </h1>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
