import { TitleCase } from "@/components/card/TitleCase";
import { Tab, Tabs } from "@heroui/react";

import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";

export default function BobotKinerja() {
  return (
    <>
      <BreadcrumbAdmin location="/Penilaian Kinerja" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Penilaian Kinerja"
          text="Berikut ini menampilkan Penilaian Kinerja Berdasarkan Bobot"
        />
        <div className="bg-white shadow-md rounded-xl border min-h-[64vh]">
          <div className="md:p-4 p-2">
            <Tabs
              variant="bordered"
              radius="sm"
              size="sm"
              classNames={{
                tabList: "!border-[0.8px] !rounded-lg p-1",
                tab: "!rounded-lg",
                tabContent:
                  "group-data-[selected=true]:!text-accent-primary group-data-[selected=true]:!font-semibold",
              }}
            >
              <Tab title="Rekap Penilaian" className="!rounded-sm">
                <div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th
                            className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                            rowSpan={3}
                          >
                            No
                          </th>
                          <th
                            className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                            colSpan={5}
                          >
                            Rekap Kategori Penilaian Keseluruhan Pegawai
                          </th>
                          <th
                            className="border-y-2 border-accent-gray p-2 sm:text-sm text-xs text-gray-600 font-normal"
                            rowSpan={3}
                          >
                            Total
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
              </Tab>
              <Tab title="Daftar Penialian" className="!rounded-sm"></Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
