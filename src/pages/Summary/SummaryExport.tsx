import {
  useGetAllPegawaiAdmin,
  useGetAllPegawaiOption,
} from "@/services/pegawai";
import { useGetAllUnitOption } from "@/services/unit";
import { YMToIndoFormat } from "@/utils/dateFormater";
import { Divider } from "@heroui/react";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import {
  EselonData,
  GolonganData,
  pendidikanTerakhir,
} from "@/constants/DummyData";
import GrafikPegawai from "@/components/Charts/GrafikLaporanPegawai";
import { Commet } from "react-loading-indicators";

export default function SummaryExport() {
  const dateDefault = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;

  const queryParams = new URLSearchParams(window.location.search);
  const m = queryParams.get("m");
  const searchMonth = m as string;

  const search = searchMonth || dateDefault;

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

  const { data, refetch, isFetching } = useGetAllPegawaiOption();
  const {
    data: dataUnit,
    refetch: refetchUnit,
    isFetching: isFetchingUnit,
  } = useGetAllUnitOption();

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

  const { totalKetersediaan, totalASN, totalNonASN } = useMemo(() => {
    let totalKetersediaan = 0;
    let totalASN = 0;
    let totalNonASN = 0;

    DATA_FETCHING_UNIT?.forEach((item) => {
      totalKetersediaan += item.jabatan.reduce(
        (total, current) => total + (current.ketersediaan || 0),
        0,
      );

      totalASN +=
        DATA_FETCHING?.filter(
          (it) => it.jabatan?.unit?.id === item.id && it.statusAsn === true,
        ).length || 0;

      totalNonASN +=
        DATA_FETCHING?.filter(
          (it) => it.jabatan?.unit?.id === item.id && it.statusAsn === false,
        ).length || 0;
    });

    return { totalKetersediaan, totalASN, totalNonASN };
  }, [DATA_FETCHING_UNIT, DATA_FETCHING]);

  useEffect(() => {
    if (
      !isFetching &&
      !isFetchingUnit &&
      !isFetchingDataSurat &&
      DATA_FETCHING_UNIT &&
      DATA_FETCHING
    ) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
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
  }, [
    isFetching,
    isFetchingUnit,
    DATA_FETCHING,
    DATA_FETCHING_UNIT,
    isFetchingDataSurat,
  ]);

  return (
    <>
      <style>{`
                @media print {
                    @page {
                        size: potrait;
                        margin: 0;
                        padding: 1.5cm;
                    }
                    body {
                        margin: 0;
                        font-family: "Arial", serif;
                    }
                    * {
                        font-family: "Arial", serif !important;
                    }
                }
            `}</style>
      {isFetching && isFetchingDataSurat && isFetchingUnit && (
        <div className="inset-0 fixed flex items-center justify-center z-20">
          <Commet color="#32cd32" size="medium" text="" textColor="" />
        </div>
      )}
      <div className="text-center font-semibold text-[14pt]">
        <h1>SUMMARY REPORT</h1>
        <h1>INFOGRAFIS DATA KEPEGAWAIAN</h1>
      </div>
      <Divider className="mb-1 mt-4" />
      <Divider className="mt-1 mb-4" />
      <div className="flex flex-col gap-2">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th
                  className="border-accent-gray p-2 text-sm bg-gray-300 text-black rounded-tl-lg text-start"
                  colSpan={2}
                >
                  Komposisi Pegawai
                </th>
                <th className="border-accent-gray p-2 text-sm bg-primary bg-gray-300 text-black text-center">
                  Ketersediaan
                </th>
                <th className="border-accent-gray p-2 text-sm bg-primary bg-gray-300 text-black text-center">
                  Pegawai ASN
                </th>
                <th className="border-accent-gray p-2 text-sm bg-primary bg-gray-300 text-black text-center rounded-tr-lg">
                  Pegawai Non-ASN
                </th>
              </tr>
              <tr>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white align-top">
                  No
                </th>
                <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-start align-top">
                  Jumlah Pegawai
                </th>
                <th className="min-w-20 border-accent-gray p-2 text-sm bg-primary text-white text-center align-top">
                  {totalKetersediaan}
                </th>
                <th className="min-w-20 border-accent-gray p-2 text-sm bg-primary text-white text-center align-top">
                  {totalASN}
                </th>
                <th className="min-w-20 border-accent-gray p-2 text-sm bg-primary text-white text-center align-top">
                  {totalNonASN}
                </th>
              </tr>
            </thead>
            <tbody>
              {DATA_FETCHING_UNIT?.map((item, index) => {
                const ketersediaanUnit = item.jabatan.reduce(
                  (total, current) => total + (current.ketersediaan || 0),
                  0,
                );

                const jumlahASN = DATA_FETCHING
                  ? DATA_FETCHING.filter(
                      (it) =>
                        it.jabatan?.unit?.id === item.id &&
                        it.statusAsn === true,
                    ).length
                  : 0;

                const jumlahNonASN = DATA_FETCHING
                  ? DATA_FETCHING.filter(
                      (it) =>
                        it.jabatan?.unit?.id === item.id &&
                        it.statusAsn === false,
                    ).length
                  : 0;

                return (
                  <tr key={index}>
                    <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                      {index + 1}
                    </td>
                    <td className="border-b-2 border-accent-gray p-2 text-sm">
                      {item.nameUnit}
                    </td>
                    <td className="border-b-2 border-accent-gray p-2 text-sm text-center">
                      {ketersediaanUnit}
                    </td>
                    <td className="border-b-2 border-accent-gray p-2 text-sm text-center">
                      {jumlahASN}
                    </td>
                    <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-center">
                      {jumlahNonASN}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-md">
                  No
                </th>
                <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-start">
                  Jabatan Fungsional
                </th>
                <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-md text-start">
                  Nama Pegawai
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                  1
                </td>
                <td
                  className="border-b-2 border-accent-gray border-e-2 p-2 text-sm font-semibold"
                  colSpan={2}
                >
                  Analis Perdagangan (
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
                  Orang )
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top" />
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Analis Perdagangan Ahli Madya
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      it.jabatan?.nameJob.toLowerCase() ===
                      "analis perdagangan ahli madya",
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          it.jabatan?.nameJob.toLowerCase() ===
                          "analis perdagangan ahli madya",
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top" />
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Analis Perdagangan Ahli Muda
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      it.jabatan?.nameJob.toLowerCase() ===
                      "analis perdagangan ahli muda",
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          it.jabatan?.nameJob.toLowerCase() ===
                          "analis perdagangan ahli muda",
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top" />
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Analis Perdagangan Ahli Pertama
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      it.jabatan?.nameJob.toLowerCase() ===
                      "analis perdagangan ahli pertama",
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          it.jabatan?.nameJob.toLowerCase() ===
                          "analis perdagangan ahli pertama",
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                  2
                </td>
                <td
                  className="border-b-2 border-accent-gray border-e-2 p-2 text-sm font-semibold"
                  colSpan={2}
                >
                  Pengawas Perdagangan (
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
                  Orang )
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top" />
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Pengawas Perdagangan Ahli Madya
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      it.jabatan?.nameJob.toLowerCase() ===
                      "pengawas perdagangan ahli madya",
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          it.jabatan?.nameJob.toLowerCase() ===
                          "pengawas perdagangan ahli madya",
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top" />
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Pengawas Perdagangan Ahli Muda
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      it.jabatan?.nameJob.toLowerCase() ===
                      "pengawas perdagangan ahli muda",
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          it.jabatan?.nameJob.toLowerCase() ===
                          "pengawas perdagangan ahli muda",
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top" />
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Pengawas Perdagangan Ahli Pertama
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      it.jabatan?.nameJob.toLowerCase() ===
                      "pengawas perdagangan ahli pertama",
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          it.jabatan?.nameJob.toLowerCase() ===
                          "pengawas perdagangan ahli pertama",
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                  3
                </td>
                <td
                  className="border-b-2 border-accent-gray border-e-2 p-2 text-sm font-semibold"
                  colSpan={2}
                >
                  Penera (
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
                  Orang )
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top" />
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Penera Ahli Madya
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      it.jabatan?.nameJob.toLowerCase() === "penera ahli madya",
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          it.jabatan?.nameJob.toLowerCase() ===
                          "penera ahli madya",
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top" />
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Penera Ahli Muda
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      it.jabatan?.nameJob.toLowerCase() === "penera ahli muda",
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          it.jabatan?.nameJob.toLowerCase() ===
                          "penera ahli muda",
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top" />
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Penera Ahli Pertama
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      it.jabatan?.nameJob.toLowerCase() ===
                      "penera ahli pertama",
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          it.jabatan?.nameJob.toLowerCase() ===
                          "penera ahli pertama",
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br />
      {/* <div className="grid grid-cols-2 gap-2">
                <div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                        <thead>
                            <tr>
                            <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-md">
                                No
                            </th>
                            <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-start">
                                Golongan
                            </th>
                            <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-md text-start">
                                Jumlah Pegawai
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {GolonganData.map((item, index) => (
                                <tr key={index}>
                                    <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                                        {index + 1}
                                    </td>
                                    <td className="border-b-2 border-accent-gray p-2 text-sm">
                                        {item.nama}
                                    </td>
                                    <td
                                        className="border-b-2 border-e-2 border-accent-gray p-2 text-sm"
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
                            <tr>
                                <th
                                    colSpan={2}
                                    className="border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-md text-start"
                                >
                                    Total
                                </th>
                                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-br-md text-start">
                                {
                                    DATA_FETCHING
                                        ? GolonganData?.reduce((total, unit) => {
                                            const count = DATA_FETCHING.filter(
                                            (it) => it.group === unit.key
                                            ).length;
                                            return total + count;
                                        }, 0)
                                        : 0
                                    }{" "}
                                    Orang
                                </th>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                <div>
                    <div className="mb-2">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-md">
                                            No
                                        </th>
                                        <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-left">
                                            Eselon
                                        </th>
                                        <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-md text-left">
                                            Jumlah Pegawai
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {EselonData.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                                        {index + 1}
                                        </td>
                                        <td className="border-b-2 border-accent-gray p-2 text-sm">
                                        {item.nama}
                                        </td>
                                        <td
                                        className="border-b-2 border-e-2 border-accent-gray p-2 text-sm"
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
                                    <tr>
                                        <th
                                            colSpan={2}
                                            className="border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-md text-start"
                                        >
                                            Total
                                        </th>
                                        <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-br-md text-start">
                                        {
                                            DATA_FETCHING
                                                ? EselonData?.reduce((total, unit) => {
                                                    const count = DATA_FETCHING.filter(
                                                    (it) => it.jabatan?.eselon === unit.nama
                                                    ).length;
                                                    return total + count;
                                                }, 0)
                                                : 0
                                            }{" "}
                                            Orang
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mb-2">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                                            No
                                        </th>
                                        <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-start">
                                            Pendidikan
                                        </th>
                                        <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-start">
                                            Jumlah Pegawai
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendidikanTerakhir.map((item, index) => (
                                        <tr key={index}>
                                            <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                                                {index + 1}
                                            </td>
                                            <td className="border-b-2 border-accent-gray p-2 text-sm">
                                                {item.name}
                                            </td>
                                            <td
                                                className="border-b-2 border-e-2 border-accent-gray p-2 text-sm"
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
                                    <tr>
                                        <th
                                            colSpan={2}
                                            className="border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-md text-start"
                                        >
                                            Total
                                        </th>
                                        <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-br-md text-start">
                                            {DATA_FETCHING
                                                ? pendidikanTerakhir?.reduce((total, unit) => {
                                                    const count = DATA_FETCHING.filter(
                                                    (it) => it.education === unit.key
                                                    ).length;
                                                    return total + count;
                                                }, 0)
                                                : 0
                                            }{" "}
                                            Orang
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-md">
                                            No
                                        </th>
                                        <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-left">
                                            Jenis Kelamin
                                        </th>
                                        <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-md text-left">
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
                                            className="border-b-2 border-e-2 border-accent-gray p-2 text-sm"
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
                                            className="border-b-2 border-e-2 border-accent-gray p-2 text-sm"
                                        >
                                            {DATA_FETCHING
                                            ? DATA_FETCHING.filter(
                                                (it) => it.gender === "PEREMPUAN",
                                                ).length
                                            : 0}{" "}
                                            Orang
                                        </td>
                                    </tr>
                                    <tr>
                                        <th
                                            colSpan={2}
                                            className="border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-md text-start"
                                        >
                                            Total
                                        </th>
                                        <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-br-md text-start">
                                            {DATA_FETCHING
                                                ? DATA_FETCHING.filter(
                                                    (it) => (it.gender === "LAKI_LAKI" || it.gender === "PEREMPUAN"),
                                                    ).length
                                                : 0}{" "}
                                            Orang
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div> */}
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-md">
                  No
                </th>
                <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-start">
                  Golongan
                </th>
                <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-md text-start">
                  Jumlah Pegawai
                </th>
              </tr>
            </thead>
            <tbody>
              {GolonganData.map((item, index) => (
                <tr key={index}>
                  <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                    {index + 1}
                  </td>
                  <td className="border-b-2 border-accent-gray p-2 text-sm">
                    {item.nama}
                  </td>
                  <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                    {DATA_FETCHING
                      ? DATA_FETCHING.filter((it) => it.group === item.key)
                          .length
                      : 0}{" "}
                    Orang
                  </td>
                </tr>
              ))}
              <tr>
                <th
                  colSpan={2}
                  className="border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-md text-start"
                >
                  Total
                </th>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-br-md text-start">
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
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-md">
                  No
                </th>
                <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-left">
                  Eselon
                </th>
                <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-md text-left">
                  Jumlah Pegawai
                </th>
              </tr>
            </thead>
            <tbody>
              {EselonData.map((item, index) => (
                <tr key={index}>
                  <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                    {index + 1}
                  </td>
                  <td className="border-b-2 border-accent-gray p-2 text-sm">
                    {item.nama}
                  </td>
                  <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                    {DATA_FETCHING
                      ? DATA_FETCHING.filter(
                          (it) => it.jabatan?.eselon === item.nama,
                        ).length
                      : 0}{" "}
                    Orang
                  </td>
                </tr>
              ))}
              <tr>
                <th
                  colSpan={2}
                  className="border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-md text-start"
                >
                  Total
                </th>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-br-md text-start">
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
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-lg">
                  No
                </th>
                <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-start">
                  Pendidikan
                </th>
                <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-lg text-start">
                  Jumlah Pegawai
                </th>
              </tr>
            </thead>
            <tbody>
              {pendidikanTerakhir.map((item, index) => (
                <tr key={index}>
                  <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                    {index + 1}
                  </td>
                  <td className="border-b-2 border-accent-gray p-2 text-sm">
                    {item.name}
                  </td>
                  <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                    {DATA_FETCHING
                      ? DATA_FETCHING.filter((it) => it.education === item.key)
                          .length
                      : 0}{" "}
                    Orang
                  </td>
                </tr>
              ))}
              <tr>
                <th
                  colSpan={2}
                  className="border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-md text-start"
                >
                  Total
                </th>
                <th className="border-b-2 border-accent-gray p-2 text-sm bg-primary text-white rounded-br-md text-start">
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
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-md">
                  No
                </th>
                <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-left">
                  Jenis Kelamin
                </th>
                <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-md text-left">
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
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING
                    ? DATA_FETCHING.filter((it) => it.gender === "LAKI_LAKI")
                        .length
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
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING
                    ? DATA_FETCHING.filter((it) => it.gender === "PEREMPUAN")
                        .length
                    : 0}{" "}
                  Orang
                </td>
              </tr>
              <tr>
                <th
                  colSpan={2}
                  className="border-accent-gray p-2 text-sm bg-primary text-white rounded-bl-md text-start"
                >
                  Total
                </th>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-br-md text-start">
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
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <div className="print:break-after-page">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="border-accent-gray p-2 text-sm bg-primary text-white rounded-tl-md">
                  No
                </th>
                <th className="min-w-60 border-accent-gray p-2 text-sm bg-primary text-white text-left">
                  Daftar Kenaikan Pangkat, Kegiatan Gaji Berkala, Pensiun dan
                  Cuti
                </th>
                <th className="min-w-40 border-accent-gray p-2 text-sm bg-primary text-white rounded-tr-md text-left">
                  Nama Pegawai
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top">
                  1
                </td>
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Daftar Kenaikan Pangkat Pegawai{" "}
                  {YMToIndoFormat(search || dateDefault)}
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {dataSurat.pangkat.length > 0
                    ? dataSurat.pangkat.map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.user.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top">
                  2
                </td>
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Daftar Kenaikan Gaji Berkala Pegawai{" "}
                  {YMToIndoFormat(search || dateDefault)}
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {dataSurat.gaji.length > 0
                    ? dataSurat.gaji.map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.user.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top">
                  3
                </td>
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Daftar Pegawai Cuti {YMToIndoFormat(search || dateDefault)}
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {dataSurat.cuti.length > 0
                    ? dataSurat.cuti.map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.user.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
              <tr>
                <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10 align-top">
                  4
                </td>
                <td className="border-b-2 border-accent-gray p-2 text-sm align-top">
                  Daftar Pegawai Pensiun {YMToIndoFormat(search || dateDefault)}
                </td>
                <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm">
                  {DATA_FETCHING.filter(
                    (it) =>
                      dayjs(it.pensionDate).format("YYYY-MM") ===
                      (search || dateDefault),
                  ).length > 0
                    ? DATA_FETCHING.filter(
                        (it) =>
                          dayjs(it.pensionDate).format("YYYY-MM") ===
                          (search || dateDefault),
                      ).map((item, index) => {
                        return (
                          <div>
                            {index + 1}. {item.name}
                          </div>
                        );
                      })
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <GrafikPegawai data={DATA_FETCHING} />
    </>
  );
}
