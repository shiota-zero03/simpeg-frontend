import { TitleCase } from "@/components/card/TitleCase";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import PegawaiIndex from "./PegawaiIndex";
import Surat from "./Surat";
import { useState } from "react";

export default function Jabatan() {
  const [selectedTab, setSelectedTab] = useState<string>("data-pegawai");

  return (
    <>
      <BreadcrumbAdmin location="/Pegawai" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Data Pegawai"
          text="Berikut ini menampilkan Daftar dari Master Data Pegawai"
        />
        <div>
          <div className="overflow-x-auto flex min-w-full">
            <div
              onClick={() => setSelectedTab("data-pegawai")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "data-pegawai" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Data Pegawai
            </div>
            <div
              onClick={() => setSelectedTab("kgp")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "kgp" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Data Cuti, Kenaikan Gaji & Pangkat
            </div>
            <div
              onClick={() => setSelectedTab("pelaporan")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "pelaporan" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Pelaporan
            </div>
          </div>
          <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
            {selectedTab === "data-pegawai" ? <PegawaiIndex /> : <></>}
            {selectedTab === "kgp" ? <Surat /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}
