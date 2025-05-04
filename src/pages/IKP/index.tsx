import { TitleCase } from "@/components/card/TitleCase";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import Admin from "./Admin";
import Penerima from "./Penerima";
import Pengirim from "./Pengirim";
import { useEffect, useState } from "react";
import store from "@/redux/store";

export default function Jabatan() {
  const [selectedTab, setSelectedTab] = useState<string>("pengirim");

  const { role } = store.getState().auth;
  const queryParams = new URLSearchParams(window.location.search);
  const tab = queryParams.get("tab");
  const tabData = tab as string;

  useEffect(() => {
    if (tabData) {
      setSelectedTab(tabData);
    }
  }, [tabData]);

  return (
    <>
      <BreadcrumbAdmin location="/Dialog Kinerja (IKP)" />
      <div className="md:p-8 p-4 grid grid-cols-1 gap-8">
        <TitleCase
          title="Dialog Kinerja (IKP)"
          text="Berikut ini Mengelola Daftar Dialog Kinerja Intruksi Khusus Pimpinan"
        />
        {role !== "PEGAWAI" ? (
          <Admin />
        ) : (
          <div>
            <div className="overflow-x-auto flex min-w-full">
              <div
                onClick={() => setSelectedTab("pengirim")}
                className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "pengirim" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
              >
                Pengirim Instruksi
              </div>
              <div
                onClick={() => setSelectedTab("penerima")}
                className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "penerima" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
              >
                Penerima Instruksi
              </div>
            </div>
            <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
              {selectedTab === "pengirim" ? <Pengirim /> : <></>}
              {selectedTab === "penerima" ? <Penerima /> : <></>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
