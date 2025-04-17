import { IconType } from "react-icons";
import { FaClipboardCheck, FaRegNewspaper } from "react-icons/fa";
import { FaUsersRays } from "react-icons/fa6";
import {
  LuBookMarked,
  LuChartLine,
  LuLayoutGrid,
  LuMails,
  LuPictureInPicture,
} from "react-icons/lu";
import {
  PiTreeStructure,
  PiOfficeChair,
  PiUserList,
  PiSuitcaseSimpleLight,
  PiBuildingApartment,
} from "react-icons/pi";
import {
  RiCustomerService2Line,
  RiFileEditFill,
  RiFileList3Line,
} from "react-icons/ri";

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
      {
        name: "Unit",
        key: "unit",
        link: "/unit",
        icon: PiBuildingApartment,
      },
      {
        name: "Jabatan",
        key: "position",
        link: "/position",
        icon: PiOfficeChair,
      },
      { name: "Pegawai", key: "pegawai", link: "/pegawai", icon: PiUserList },
      {
        name: "Summary Report",
        key: "summary-report",
        link: "/summary-report",
        icon: LuChartLine,
      },
      {
        name: "Penilaian Kinerja",
        key: "penilaian-kinerja",
        link: "#",
        icon: RiFileEditFill,
        subMenu: [
          {
            name: "Berdasarkan Bobot",
            key: "berdasarkan-bobot",
            link: "/penilaian-kinerja/berdasarkan-bobot",
          },
          {
            name: "Berdasarkan Nilai",
            key: "berdasarkan-nilai",
            link: "/penilaian-kinerja/berdasarkan-nilai",
          },
        ],
      },
      {
        name: "Disiplin Pegawai",
        key: "disiplin-pegawai",
        link: "#",
        icon: FaUsersRays,
        subMenu: [
          {
            name: "Surat Perintah Pemeriksaan",
            key: "pengaduan",
            link: "#",
          },
          {
            name: "Surat Pemanggilan",
            key: "pengaduan",
            link: "#",
          },
          {
            name: "Berita Acara Permintaan Keterangan",
            key: "pengaduan",
            link: "#",
          },
          {
            name: "Berita Acara Pemeriksaan",
            key: "pengaduan",
            link: "#",
          },
          {
            name: "Laporan Hasil Pemeriksaan",
            key: "pengaduan",
            link: "#",
          },
          {
            name: "Keputusan Hukuman Disiplin",
            key: "pengaduan",
            link: "#",
          },
        ],
      },
      {
        name: "Dialog Kinerja (IKP)",
        key: "dialog-kinerja",
        link: "dialog-kinerja",
        icon: RiFileList3Line,
      },
      { name: "SPPD", key: "sppd", link: "/sppd", icon: LuMails },
      {
        name: "Manajemen Asset",
        key: "asset",
        link: "#",
        icon: PiSuitcaseSimpleLight,
      },
      {
        name: "E-Filling",
        key: "e-filling",
        link: "/e-filling",
        icon: FaClipboardCheck,
      },
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
  {
    name: "Menu Content",
    menu: [
      { name: "Berita", key: "news", link: "/news", icon: FaRegNewspaper },
      {
        name: "Galeri dan Dokumentasi",
        key: "galeri-dokumentasi",
        link: "/galeri-dokumentasi",
        icon: LuPictureInPicture,
      },
    ],
  },
];
