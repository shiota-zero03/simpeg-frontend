import { TitleCase } from "@/components/card/TitleCase";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import SPPDIndex from "./SPPD";
import Pelaporan from "./Pelaporan";
import { useState } from "react";

export default function Jabatan() {
  const [selectedTab, setSelectedTab] = useState<string>("data-sppd");

  return (
    <>
      <BreadcrumbAdmin location="/Pegawai" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="SPPD"
          text="Berikut ini menampilkan Daftar Surat Perintah Perjalanan Dinas "
        />
        <div>
          <div className="overflow-x-auto flex min-w-full">
            <div
              onClick={() => setSelectedTab("data-sppd")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "data-sppd" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Data SPPD
            </div>
            <div
              onClick={() => setSelectedTab("rekap")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "rekap" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Rekap Bulanan Perjalanan Dinas
            </div>
            <div
              onClick={() => setSelectedTab("pelaporan")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "pelaporan" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Pelaporan
            </div>
          </div>
          <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
            {selectedTab === "data-sppd" ? <SPPDIndex /> : <></>}
            {/* {selectedTab === "rekap" ? <Surat /> : <></>} */}
            {selectedTab === "pelaporan" ? <Pelaporan /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}
