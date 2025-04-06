import { IconType } from "react-icons";
import { LuBookMarked, LuLayoutGrid } from "react-icons/lu";
import { PiUserCircleGearLight, PiTreeStructure } from "react-icons/pi";
import { RiCustomerService2Line } from "react-icons/ri";

export interface SidebarProps {
  name: string;
  menu: {
    name: string;
    key: string;
    link: string;
    icon: IconType;

    subMenu?: {
      name: string;
      key: string;
      link: string;
    }[];
  }[];
}

export const SidebarMenuData: SidebarProps[] = [
  {
    name: "MENU UTAMA",
    menu: [
      { name: "Beranda", key: "beranda", link: "/", icon: LuLayoutGrid },
      {
        name: "Peta Jabatan",
        key: "peta-jabatan",
        link: "/peta-jabatan",
        icon: PiTreeStructure,
      },
      { name: "Jabatan", key: "jabatan", link: "/jabatan", icon: LuLayoutGrid },
      { name: "Pegawai", key: "pegawai", link: "/pegawai", icon: LuLayoutGrid },
      { name: "Berita", key: "berita", link: "/berita", icon: LuLayoutGrid },
      {
        name: "Summary Report",
        key: "summary-report",
        link: "/summary-report",
        icon: LuLayoutGrid,
      },
      {
        name: "Penilaian Kinerja",
        key: "penilaian-kinerja",
        link: "#",
        icon: PiUserCircleGearLight,
        subMenu: [
          {
            name: "Berdasarkan Bobot",
            key: "berdasarkan-bobot",
            link: "/berdasarkan-bobot",
          },
          {
            name: "Berdasarkan Nilai",
            key: "berdasarkan-nilai",
            link: "/berdasarkan-nilai",
          },
        ],
      },
      {
        name: "Disiplin Pegawai",
        key: "disiplin-pegawai",
        link: "#",
        icon: PiUserCircleGearLight,
        subMenu: [
          {
            name: "Berdasarkan Bobot",
            key: "berdasarkan-bobot",
            link: "/berdasarkan-bobot",
          },
        ],
      },
      {
        name: "Dialog Kinerja (IKP)",
        key: "dialog-kinerja",
        link: "/dialog-kinerja",
        icon: LuLayoutGrid,
      },
      { name: "SPPD", key: "sppd", link: "/sppd", icon: LuLayoutGrid },
      { name: "Asset", key: "asset", link: "/asset", icon: LuLayoutGrid },
    ],
  },
  {
    name: "MENU DUKUNGAN",
    menu: [
      {
        name: "Buku Petunjuk",
        key: "buku-petunjuk",
        link: "/buku-petunjuk",
        icon: LuBookMarked,
      },
      {
        name: "Hubungi Kami",
        key: "hubungi-kami",
        link: "/hubungi-kami",
        icon: RiCustomerService2Line,
      },
    ],
  },
];
