import { TitleCase } from "@/components/card/TitleCase";
import { Button, Input, useDisclosure } from "@heroui/react";

import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import { Link } from "react-router-dom";
import { LuArrowLeft, LuCalendarDays } from "react-icons/lu";
import { LucideCalendarDays, LucideFileArchive, LucidePencilLine } from "lucide-react";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import EditPenilaianBobot from "@/components/modals/Penilaian/EditPenilaianBobot";

export default function ViewBobotKinerja() {
  const [ searchMonth, setSearchMonth ] = useState<string>("")

  const { isOpen, onOpen, onClose } = useDisclosure();

  const dataPenilaian = [
    { variabel: 'Kinerja', bobot: 50, nilai: 80, lampiran: "https://www.google.com" },
    { variabel: 'Disiplin', bobot: 20, nilai: 20, lampiran: "https://www.google.com" },
    { variabel: 'Loyalitas', bobot: 5, nilai: 60, lampiran: "https://www.google.com" },
    { variabel: 'Kerjasama', bobot: 5, nilai: 80, lampiran: "https://www.google.com" },
    { variabel: 'Attitude', bobot: 20, nilai: 20, lampiran: "" }
  ]

  return (
    <>
      <EditPenilaianBobot
        nama="Lincoln George"
        jabatan="Kepala Dinas UPTD"
        nip="198203028014061400"
        isOpen={isOpen}
        onClose={onClose}
        handleClose={onClose}
      />
      <BreadcrumbAdmin location="/Penilaian Kinerja" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <div className="flex">
          <Link
            to={`/penilaian-kinerja/berdasarkan-bobot`}
            className="flex items-center text-accent-primary gap-2 py-1 px-2 border border-accent-primary rounded-full font-medium text-xs hover:bg-accent-primary hover:text-white duration-200"
          >
            <LuArrowLeft /> Kembali
          </Link>
        </div>
        <TitleCase
          title="Detail Penilaian Kinerja"
        />
        <div className="bg-white shadow-md rounded-xl border min-h-[64vh] flex flex-col gap-1">
          <div className="md:p-4 p-2">
            <div className="border rounded-lg p-4 max-w-80 overflow-x-auto">
              <table>
                <tbody>
                  <tr>
                    <th className="text-start">NIP</th>
                    <th className="text-start">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: 198203028014061400</th>
                  </tr>
                  <tr>
                    <th className="text-start">Nama</th>
                    <th className="text-start">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Lincoln George</th>
                  </tr>
                  <tr>
                    <th className="text-start">Jabatan</th>
                    <th className="text-start">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: Kepala Dinas UPTD</th>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-between my-6">
              <div className="flex items-center gap-2 font-semibold">
                <LucideCalendarDays className="text-button-primary" size={18} /> 14 April 2025
              </div>
              <div className="flex items-end gap-2">
                <div className="flex sm:flex-row flex-col gap-2 items-end w-full">
                  <Input
                    type="month"
                    label="Pilih Periode"
                    labelPlacement="outside"
                    value={searchMonth}
                    onChange={(e) => {
                      setSearchMonth(e.target.value);
                    }}
                    radius="sm"
                    size="sm"
                    variant="bordered"
                    placeholder="Cari nama pegawai disini"
                    startContent={
                      <LuCalendarDays className="text-accent-gray text-xs" />
                    }
                    classNames={{
                      inputWrapper: "border-[0.8px]",
                      input: "text-xs",
                      label: "font-semibold"
                    }}
                  />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Link
                    to={'#'}
                    className="border-[0.8px] text-xs flex items-center p-1.5 border-danger text-danger rounded-md w-28 gap-2 justify-center"
                  >
                    <FaFilePdf size={12} /> Export .pdf
                  </Link>
                  <Button
                    onPress={onOpen}
                    variant="solid"
                    radius="sm"
                    size="sm"
                    startContent={<LucidePencilLine size={12} />}
                    className="border-[0.8px] w-28 text-xs text-info bg-alert-info"
                  >
                    Edit Data
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th
                        className="border-y-2 border-s-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                        rowSpan={3}
                      >
                        No
                      </th>
                      <th
                        className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                        rowSpan={3}
                      >
                        Variabel dan Kualifikasi
                      </th>
                      <th
                        className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                        rowSpan={3}
                      >
                        Bobot
                      </th>
                      <th
                        className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                        colSpan={5}
                      >
                        Rekap Kategori Penilaian Keseluruhan Pegawai
                      </th>
                      <th
                        className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                      >
                        Nilai Akhir
                      </th>
                      <th
                        className="border-y-2 border-e-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                        rowSpan={3}
                      >
                        Lampiran
                      </th>
                    </tr>
                    <tr>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF3F6]">
                        Sangat Rendah
                      </th>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF9D9]">
                        Rendah
                      </th>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#F1F8FF]">
                        Sedang
                      </th>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#E1FFDD]">
                        Tinggi
                      </th>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#CEFFC7]">
                        Sangat Tinggi
                      </th>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal" rowSpan={2}>
                        (nilai * bobot)/100
                      </th>
                    </tr>
                    <tr>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF3F6]">
                        {"<= 50"}
                      </th>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF9D9]">
                        51 - 60
                      </th>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#F1F8FF]">
                        61 - 70
                      </th>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#E1FFDD]">
                        71 - 80
                      </th>
                      <th className="border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#CEFFC7]">
                        81 - 100
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPenilaian.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center border-s-2 sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{index + 1}</td>
                        <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{item.variabel}</td>
                        <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{item.bobot}</td>
                        <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{item.nilai <= 50 ? item.nilai : "-"}</td>
                        <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{(item.nilai <= 60 && item.nilai >= 51) ? item.nilai : "-"}</td>
                        <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{(item.nilai <= 70 && item.nilai >= 61) ? item.nilai : "-"}</td>
                        <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{(item.nilai <= 80 && item.nilai >= 71) ? item.nilai : "-"}</td>
                        <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{(item.nilai <= 100 && item.nilai >= 81) ? item.nilai : "-"}</td>
                        <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{(item.nilai * item.bobot) / 100}</td>
                        <td className="flex items-center justify-center text-info border-e-2 sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">{item.lampiran ? <Link to={item.lampiran} target="__blank"><LucideFileArchive /></Link> : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th
                        className="border-y-2 border-s-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-semibold"
                        colSpan={2}
                      >
                        Total Nilai
                      </th>
                      <th
                        className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-semibold"
                      >
                        100
                      </th>
                      <th
                        colSpan={5}
                        className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-semibold"
                      />
                      <th
                        className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-semibold"
                      >
                        {
                          dataPenilaian.reduce((total, item) => {
                            const skor = (item.nilai * item.bobot)/100;
                            return total + skor;
                          }, 0)
                        }
                      </th>
                      <th
                        className="border-y-2 border-e-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-semibold"
                      />
                    </tr>
                  </tfoot>
                </table>
              </div>
              <br />
              <div className="overflow-x-auto">
                <table className="w-auto">
                  <tbody>
                    <tr>
                      <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#FFF3F6]">
                        {"Nilai <= 50"}
                      </td>
                      <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF3F6]">
                        |
                      </td>
                      <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#FFF3F6]">
                        Tidak dapat direkomendasikan
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#FFF9D9]">
                        {"Nilai 51 - 60"}
                      </td>
                      <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF9D9]">
                        |
                      </td>
                      <td className="p-2 pe-8 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#FFF9D9]">
                        Dapat dipertimbangkan untuk direkomendasikan dengan
                        catatan
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#F1F8FF]">
                        {"Nilai 61 - 70"}
                      </td>
                      <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#F1F8FF]">
                        |
                      </td>
                      <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#F1F8FF]">
                        Dapat dipertimbangkan untuk direkomendasikan dengan
                        catatan
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#E1FFDD]">
                        {"Nilai 71 - 80"}
                      </td>
                      <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#E1FFDD]">
                        |
                      </td>
                      <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#E1FFDD]">
                        Direkomendasikan dengan catatan
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2 sm:text-sm text-xs min-w-24 text-gray-600 font-normal bg-[#CEFFC7]">
                        {"Nilai 81 - 100"}
                      </td>
                      <td className="p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#CEFFC7]">
                        |
                      </td>
                      <td className="p-2 sm:text-sm text-xs min-w-96 text-gray-600 font-normal bg-[#CEFFC7]">
                        Direkomendasikan
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
