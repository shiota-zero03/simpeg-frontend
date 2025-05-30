import DataKegiatan from "./pembelanjaan/DataKegiatan";
import DataSubKegiatan from "./pembelanjaan/DataSubKegiatan";
import DataBelanja from "./pembelanjaan/DataBelanja";
import ItemBelanja from "./pembelanjaan/ItemBelanja";
import { useEffect, useState } from "react";

export default function Asset() {
  const [selectedTab, setSelectedTab] = useState<string>("kegiatan");

  const queryParams = new URLSearchParams(window.location.search);
  const tab = queryParams.get("stab");
  const tabData = tab as string;

  useEffect(() => {
    if (tabData) {
      setSelectedTab(tabData);
    }
  }, [tabData]);

  return (
    <>
      <div className="md:p-8 p-4">
        <div>
          <div className="overflow-x-auto flex min-w-full">
            <div
              onClick={() => setSelectedTab("kegiatan")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "kegiatan" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Data Kegiatan
            </div>
            <div
              onClick={() => setSelectedTab("sub-kegiatan")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "sub-kegiatan" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Data Sub-Kegiatan
            </div>
            <div
              onClick={() => setSelectedTab("belanja-pekerjaan")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "belanja-pekerjaan" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Belanja / Pekerjaan
            </div>
            <div
              onClick={() => setSelectedTab("item-belanja")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "item-belanja" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Item Belanja
            </div>
          </div>
          <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
            {selectedTab === "kegiatan" ? <DataKegiatan /> : <></>}
            {selectedTab === "sub-kegiatan" ? <DataSubKegiatan /> : <></>}
            {selectedTab === "belanja-pekerjaan" ? <DataBelanja /> : <></>}
            {selectedTab === "item-belanja" ? <ItemBelanja /> : <></>}
          </div>
        </div>
      </div>
    </>
  );
}
