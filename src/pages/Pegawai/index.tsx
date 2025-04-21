import { TitleCase } from "@/components/card/TitleCase";
import { Button } from "@heroui/react";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import PegawaiIndex from "./PegawaiIndex";
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
            <Button
              size="sm"
              radius="none"
              onPress={() => setSelectedTab("data-pegawai")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "data-pegawai" ? "bg-[#E1FFDD] text-success" : "bg-white"}`}
            >
              Data Pegawai
            </Button>
            <Button
              size="sm"
              radius="none"
              onPress={() => setSelectedTab("pelaporan")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "pelaporan" ? "bg-[#E1FFDD] text-success" : "bg-white"}`}
            >
              Pelaporan
            </Button>
          </div>
          <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
            {selectedTab === "data-pegawai" ? <PegawaiIndex /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}
