import { TitleCase } from "@/components/card/TitleCase";
import { Card, CardBody, CardHeader, Divider, Input, useDisclosure } from "@heroui/react";
import { useState } from "react";
import { LuSearch } from "react-icons/lu";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { FaFileExcel } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaFilePdf, FaUsers } from "react-icons/fa";
import { YMToIndoFormat } from "@/utils/dateFormater";
import PegawaiModal from "@/components/modals/SummaryReportModal/PegawaiModal";

export default function Jabatan() {
  const [ type, setType ] = useState<string>("")
  const dateDefault = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [search, setSearch] = useState(dateDefault);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <PegawaiModal
        type={type}
        isOpen={isOpen}
        onClose={onClose}
      />
      <BreadcrumbAdmin location="/Summary-Report" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Summary Report Pegawai"
          text="Berikut ini menampilkan Summary Report Data SPPD, Dan Infografis Data Kepegawaian"
        />
        <div className="bg-white shadow-md rounded-xl border min-h-[70vh]">
          <div className="flex lg:items-center items-end lg:px-0 px-4 lg:flex-row flex-col justify-between lg:gap-0 gap-2">
            <div className="pt-8 px-4 w-full text-primary shadow-sm">
              <div className="flex sm:flex-row flex-col justify-between gap-2 sm:items-end">
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
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={`/summary-report/export/pdf?m=${search}`}
                    target="__blank"
                    className="border-[0.8px] text-xs w-32 border-danger text-danger flex items-center justify-center gap-2 p-2 rounded-lg font-medium hover:bg-danger hover:text-white duration-200"
                  >
                    <FaFilePdf size={12} /> Export PDF
                  </Link>
                  <Link
                    to={"#"}
                    className="border-[0.8px] text-xs w-32 border-success text-success flex items-center justify-center gap-2 p-2 rounded-lg font-medium hover:bg-success hover:text-white duration-200"
                  >
                    <FaFileExcel size={12} /> Export Excel
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 px-4 w-full text-primary shadow-sm">
            <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
              <CardSummary
                name={"Jumlah Pegawai"}
                count={100}
                iconBackgroundClass={
                  "bg-gradient-to-b from-[#137269] to-[#24D8C7]"
                }
                textBackgroundClass={"text-[#137269]"}
              />
              <CardSummary
                name={"Jumlah ASN"}
                count={100}
                iconBackgroundClass={
                  "bg-gradient-to-b from-[#AF52DE] to-[#5F2C78]"
                }
                textBackgroundClass={"text-[#AF52DE]"}
              />
              <CardSummary
                name={"Jumlah Non-ASN"}
                count={100}
                iconBackgroundClass={
                  "bg-gradient-to-b from-[#FFBB00] to-[#995900]"
                }
                textBackgroundClass={"text-[#FFBB00]"}
              />
              <CardSummary
                name={"Jabatan Fungsional"}
                count={100}
                iconBackgroundClass={
                  "bg-gradient-to-b from-[#007AFF] to-[#004999]"
                }
                textBackgroundClass={"text-[#007AFF]"}
              />
            </div>
          </div>
          <div className="pt-8 sm:px-4 w-full text-primary shadow-sm">
            <Card className="p-4" shadow="sm" radius="sm">
              <CardHeader>
                <h1 className="font-semibold">
                  Bulan {YMToIndoFormat(search || dateDefault)}
                </h1>
              </CardHeader>
              <CardBody className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h3 className="text-button-primary font-medium text-sm">
                    Data Pegawai
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
                            Pegawai
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
                            Dinas
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            32 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            2
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD I (Tambun)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            8 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            3
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD II (Cibitung)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            7 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            4
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD III (Setu)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            5 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            5
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD IV (Cikarang)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            4 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            6
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD V (Kedunggede)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            6 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            7
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD VI (Babelan)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            5 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            8
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD VII (Tarumajaya)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            4 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            9
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD VIII (Serang)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            4 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            10
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD IX (Cibarusah)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            6 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            11
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD Metrologi Legal
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            2 Orang
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
                            100 Orang
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-button-primary font-medium text-sm">
                    Data Non-ASN
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
                            Pegawai
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
                            Dinas
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            32 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            2
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD I (Tambun)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            8 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            3
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD II (Cibitung)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            7 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            4
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD III (Setu)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            5 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            5
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD IV (Cikarang)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            4 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            6
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD V (Kedunggede)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            6 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            7
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD VI (Babelan)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            5 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            8
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD VII (Tarumajaya)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            4 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            9
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD VIII (Serang)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            4 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            10
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD IX (Cibarusah)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            6 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            11
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD Metrologi Legal
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            2 Orang
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
                            100 Orang
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
                            Pegawai
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
                            Dinas
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            32 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            2
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD I (Tambun)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            8 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            3
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD II (Cibitung)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            7 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            4
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD III (Setu)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            5 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            5
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD IV (Cikarang)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            4 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            6
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD V (Kedunggede)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            6 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            7
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD VI (Babelan)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            5 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            8
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD VII (Tarumajaya)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            4 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            9
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD VIII (Serang)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            4 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            10
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD IX (Cibarusah)
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            6 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            11
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            UPTD Metrologi Legal
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            2 Orang
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
                            100 Orang
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
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
                            Daftar Pegawai Kenaikan Pangkat TMT{" "}
                            {YMToIndoFormat(search || dateDefault)}
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            0 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            2
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            Daftar Pegawai Kenaikan Gaji Berkala TMT{" "}
                            {YMToIndoFormat(search || dateDefault)}
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            0 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            3
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            Daftar Pegawai Pensiun TMT{" "}
                            {YMToIndoFormat(search || dateDefault)}
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            0 Orang
                          </td>
                        </tr>
                        <tr>
                          <td className="border-b-2 border-s-2 border-accent-gray p-2 text-sm w-10">
                            4
                          </td>
                          <td className="border-b-2 border-accent-gray p-2 text-sm font-semibold">
                            Daftar Pegawai Cuti TMT{" "}
                            {YMToIndoFormat(search || dateDefault)}
                          </td>
                          <td className="border-b-2 border-e-2 border-accent-gray p-2 text-sm text-[#33CEB7] underline text-center cursor-pointer" onClick={() => { setType('uptd'); onOpen(); }}>
                            0 Orang
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
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
