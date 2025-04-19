import { TitleCase } from "@/components/card/TitleCase";
import { Button, Card, CardBody, CardHeader, Input } from "@heroui/react";

import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import ListKaryawan from "./penilaian";
import {
  PenilaianKinerjaDougnhut,
  PenilaianKinerjaLine,
} from "@/components/Charts/penilaian-kinerja";
import { useState } from "react";
import { BiReset, BiSearch } from "react-icons/bi";
import { LuCalendarDays } from "react-icons/lu";

export default function BobotKinerja() {
  const [searchMonth, setSearchMonth] = useState("");
  const handleSearch = () => {};

  const handleReset = () => {
    setSearchMonth("");
  };
  return (
    <>
      <BreadcrumbAdmin location="/Penilaian Kinerja" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Penilaian Kinerja"
          text="Berikut ini menampilkan Penilaian Kinerja Berdasarkan Nilai dan Bobot"
        />
        <Card>
          <CardBody className="grid md:grid-cols-2 grid-cols-1">
            <PenilaianKinerjaLine />
            <PenilaianKinerjaDougnhut />
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardHeader className="px-6">
            <div className="flex sm:flex-row flex-col justify-between gap-2 items-center w-full">
              <div>
                <h1 className="font-semibold">Rekap Penilaian</h1>
              </div>
              <div className="flex sm:flex-row flex-col justify-between gap-2 sm:items-end">
                <div className="flex sm:flex-row flex-col gap-2 items-end w-full">
                  <Input
                    type="month"
                    aria-label="search"
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
                    }}
                  />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    onPress={handleSearch}
                    variant="solid"
                    radius="sm"
                    size="sm"
                    className="bg-accent-success text-white text-xs"
                    isIconOnly
                  >
                    <BiSearch size={12} />
                  </Button>
                  <Button
                    onPress={handleReset}
                    variant="bordered"
                    color="danger"
                    radius="sm"
                    size="sm"
                    isIconOnly
                    className="border-[0.8px] text-xs"
                  >
                    <BiReset size={12} />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardBody>
            <table className="w-full">
              <thead>
                <tr>
                  <th
                    className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                    rowSpan={2}
                  >
                    No
                  </th>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF3F6]">
                    Sangat Rendah
                  </th>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF9D9]">
                    Rendah
                  </th>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#F1F8FF]">
                    Sedang
                  </th>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#E1FFDD]">
                    Tinggi
                  </th>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#CEFFC7]">
                    Sangat Tinggi
                  </th>
                  <th
                    className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                    rowSpan={2}
                  >
                    Total
                  </th>
                </tr>
                <tr>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF3F6]">
                    {"<= 50"}
                  </th>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#FFF9D9]">
                    51 - 60
                  </th>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#F1F8FF]">
                    61 - 70
                  </th>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#E1FFDD]">
                    71 - 80
                  </th>
                  <th className="text-center border-b-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal bg-[#CEFFC7]">
                    81 - 100
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center sm:text-sm text-xs min-w-6 p-2 border-b-2 border-accent-gray">
                    1
                  </td>
                  <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                    0
                  </td>
                  <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                    0
                  </td>
                  <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                    0
                  </td>
                  <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                    0
                  </td>
                  <td className="text-center sm:text-sm text-xs min-w-32 p-2 border-b-2 border-accent-gray">
                    0
                  </td>
                  <td className="text-center sm:text-sm text-xs min-w-16 p-2 border-b-2 border-accent-gray">
                    0
                  </td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
        <div className="bg-white shadow-md rounded-xl border min-h-[64vh]">
          <div>
            <ListKaryawan />
          </div>
        </div>
      </div>
    </>
  );
}
