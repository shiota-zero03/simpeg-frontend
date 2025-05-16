import { TitleCase } from "@/components/card/TitleCase";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import SPPDIndex from "./SPPD";
import Pelaporan from "./Pelaporan";
import SPPDRekap from "./SPPDRekap";
import { useEffect, useState } from "react";
import store from "@/redux/store";

export default function Jabatan() {
  const { role } = store.getState().auth;

  const [selectedTab, setSelectedTab] = useState<string>("data-sppd");

  const queryParams = new URLSearchParams(window.location.search);
  const tab = queryParams.get("tab");
  const tabData = tab as string;

  useEffect(() => {
    if (role === "SUPERUSERS" || role === "ADMIN_SPPD") {
      if (tabData) {
        setSelectedTab(tabData);
      }
    } else if (role === "PEGAWAI") {
      setSelectedTab("data-sppd");
     } else {
      setSelectedTab("rekap");
    }
  }, [tabData, role]);

  return (
    <>
      <BreadcrumbAdmin location="/SPPD" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="SPPD"
          text="Berikut ini menampilkan Daftar Surat Perintah Perjalanan Dinas "
        />
        <div>
          <div className="overflow-x-auto flex min-w-full">
            {(role === "SUPERUSERS" || role === "ADMIN_SPPD" || role === "PEGAWAI") && (
              <div
                onClick={() => setSelectedTab("data-sppd")}
                className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "data-sppd" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
              >
                Data SPPD
              </div>
            )}
            {(role !== "PEGAWAI") && (
              <div
                onClick={() => setSelectedTab("rekap")}
                className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "rekap" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
              >
                Rekap Bulanan Perjalanan Dinas
              </div>
            )}
            {(role === "SUPERUSERS" || role === "ADMIN_SPPD") && (
              <div
                onClick={() => setSelectedTab("pelaporan")}
                className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "pelaporan" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
              >
                Pelaporan
              </div>
            )}
          </div>
          <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
            {selectedTab === "data-sppd" ? <SPPDIndex /> : <></>}
            {selectedTab === "rekap" ? <SPPDRekap /> : <></>}
            {selectedTab === "pelaporan" ? <Pelaporan /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}
