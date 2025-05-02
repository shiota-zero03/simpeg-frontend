import SPPDIndex from "./SPPDBiasa";
import SPPDDalamKota from "./SPPDDalamKota";
import { useState, useEffect } from "react";

export default function Jabatan() {
  const [selectedTab, setSelectedTab] = useState<string>("biasa");

  const queryParams = new URLSearchParams(window.location.search);
  const tab = queryParams.get("tabs");
  const tabData = tab as string;

  useEffect(() => {
    if (tabData) {
      setSelectedTab(tabData);
    }
  }, [tabData]);

  return (
    <>
      <div className="md:p-8 p-4 ">
        <div className="overflow-x-auto flex min-w-full">
          <div
            onClick={() => setSelectedTab("biasa")}
            className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "biasa" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
          >
            Perjalanan Dinas Biasa
          </div>
          <div
            onClick={() => setSelectedTab("dalamkota")}
            className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "dalamkota" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
          >
            Perjalanan Dinas Dalam Kota
          </div>
        </div>
        <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
          {selectedTab === "biasa" ? <SPPDIndex /> : <></>}
          {selectedTab === "dalamkota" ? <SPPDDalamKota /> : <></>}
        </div>
      </div>
    </>
  );
}
