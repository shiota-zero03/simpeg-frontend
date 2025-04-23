import { Button } from "@heroui/react";
import DataProfile from "./Profile";
import { useState } from "react";
import BreadcrumbAdmin from "@/components/breadcrumbs/BreadcrumbsAdmin";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState<string>("profile");

  return (
    <>
      <BreadcrumbAdmin location="/Profile" />
      <div className="md:p-8 p-4 grid grid-cols-1">
        <div className="overflow-x-auto flex min-w-full">
          <Button
            size="sm"
            radius="none"
            onPress={() => setSelectedTab("profile")}
            className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "profile" ? "bg-[#E1FFDD] text-success" : "bg-white"}`}
          >
            Profil Akun
          </Button>
          <Button
            size="sm"
            radius="none"
            onPress={() => setSelectedTab("riwayat-penilaian")}
            className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "riwayat-penilaian" ? "bg-[#E1FFDD] text-success" : "bg-white"}`}
          >
            Riwayat Penilaian Kinerja
          </Button>
          <Button
            size="sm"
            radius="none"
            onPress={() => setSelectedTab("riwayat-perjalanan")}
            className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "riwayat-perjalanan" ? "bg-[#E1FFDD] text-success" : "bg-white"}`}
          >
            Riwayat Perjalanan Dinas
          </Button>
          <Button
            size="sm"
            radius="none"
            onPress={() => setSelectedTab("pemegang-asset")}
            className={`rounded-t-xl border-t border-x px-4 ${selectedTab === "riwayat-perjalanan" ? "bg-[#E1FFDD] text-success" : "bg-white"}`}
          >
            Riwayat Perjalanan Dinas
          </Button>
        </div>
        <div className="bg-white shadow-md rounded-b-xl border min-h-[70vh]">
          {selectedTab === "profile" && <DataProfile />}
        </div>
      </div>
    </>
  );
}
