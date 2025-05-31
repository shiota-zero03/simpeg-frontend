import { TitleCase } from "@/components/card/TitleCase";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import AssetIndex from "./AssetIndex";
import PemegangIndex from "./PemegangIndex";
import BelanjaIndex from "./Belanja";
import ServisPajak from "./ServisPajak";
import { useEffect, useState } from "react";
import store from "@/redux/store";

export default function Asset() {
  const { role } = store.getState().auth;
  const [selectedTab, setSelectedTab] = useState<string>("barang-kendaraan");

  const queryParams = new URLSearchParams(window.location.search);
  const tab = queryParams.get("tab");
  const tabData = tab as string;

  useEffect(() => {
    if (role?.includes("UPTD")) {
      setSelectedTab("pemegang");
    } else {
      if (tabData) {
        setSelectedTab(tabData);
      }
    }
  }, [tabData, role]);

  return (
    <>
      <BreadcrumbAdmin location="/Manajemen-Aset" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase title="Aset" text="Berikut ini Mengelola Daftar Aset" />
        <div>
          <div className="overflow-x-auto flex min-w-full">
            {!role?.includes("UPTD") ? (
              <div
                onClick={() => setSelectedTab("barang-kendaraan")}
                className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "barang-kendaraan" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
              >
                Barang / Kendaraan
              </div>
            ) : null}
            <div
              onClick={() => setSelectedTab("pemegang")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "pemegang" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Pemegang / Penanggung Jawab
            </div>
            {!role?.includes("UPTD") ? (
              <div
                onClick={() => setSelectedTab("pembelanjaan")}
                className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "pembelanjaan" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
              >
                Kegiatan Pembelanjaan
              </div>
            ) : null}
            {!role?.includes("UPTD") ? (
              <div
                onClick={() => setSelectedTab("servis")}
                className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "servis" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
              >
                Servis & Pajak
              </div>
            ) : null}
          </div>
          <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
            {selectedTab === "barang-kendaraan" ? <AssetIndex /> : <></>}
            {selectedTab === "pemegang" ? <PemegangIndex /> : <></>}
            {selectedTab === "pembelanjaan" ? <BelanjaIndex /> : <></>}
            {selectedTab === "servis" ? <ServisPajak /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}
