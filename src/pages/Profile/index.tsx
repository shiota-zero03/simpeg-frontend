import DataProfile from "./Profile";
import SPPD from "./SPPD";
import { useMemo, useState } from "react";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";
import ViewPenilaian from "./Penilaian";
import { useGetProfile } from "@/services/auth";
import store from "@/redux/store";

export default function Profile() {

  const { role } = store.getState().auth;

  const [selectedTab, setSelectedTab] = useState<string>("profile");

  const { data } = useGetProfile();

  const DATA_FETCHING = useMemo(() => {
    if (!data) return null;
    return data.data;
  }, [data]);

  return (
    <>
      <BreadcrumbAdmin location="/Profile" />
      <div className="md:p-8 p-4 grid grid-cols-1">
        <div className="overflow-x-auto flex min-w-full">
          <div
            onClick={() => setSelectedTab("profile")}
            className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "profile" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
          >
            Profil Akun
          </div>
          {role === "PEGAWAI" && (
            <div
              onClick={() => setSelectedTab("riwayat-penilaian")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "riwayat-penilaian" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Riwayat Penilaian Kinerja
            </div>
          )}
          {role === "PEGAWAI" && (
            <div
              onClick={() => setSelectedTab("riwayat-perjalanan")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "riwayat-perjalanan" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Riwayat Perjalanan Dinas
            </div>
          )}
          {role === "PEGAWAI" && (
            <div
              onClick={() => setSelectedTab("pemegang-asset")}
              className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "pemegang-asset" ? "bg-[#E1FFDD] text-success" : "bg-white"} min-w-60 text-center py-2 text-sm cursor-pointer`}
            >
              Aset
            </div>
          )}
        </div>
        <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
          {selectedTab === "profile" && <DataProfile />}
          {selectedTab === "riwayat-penilaian" && (
            <ViewPenilaian dataNilaiBobot={DATA_FETCHING || null} />
          )}
          {selectedTab === "riwayat-perjalanan" && <SPPD />}
        </div>
      </div>
    </>
  );
}
