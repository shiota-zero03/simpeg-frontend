import { IconType } from "react-icons";
import { FaClipboardCheck, FaRegNewspaper } from "react-icons/fa";
import { FaUsersRays } from "react-icons/fa6";
import {
  LuBookMarked,
  LuChartLine,
  LuLayoutGrid,
  LuMails,
  LuPictureInPicture,
  LuTextQuote,
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
        link: "/penilaian-kinerja",
        icon: RiFileEditFill,
      },
      {
        name: "Disiplin Pegawai",
        key: "disiplin-pegawai",
        link: "#",
        icon: FaUsersRays,
        subMenu: [
          {
            name: "Surat Perintah Pemeriksaan",
            key: "surat-perintah-pemeriksaan",
            link: "/surat-perintah-pemeriksaan",
          },
          {
            name: "Surat Pemanggilan",
            key: "surat-pemanggilan",
            link: "/surat-pemanggilan",
          },
          {
            name: "Berita Acara Permintaan Keterangan",
            key: "berita-acara-permintaan-keterangan",
            link: "/berita-acara-permintaan-keterangan",
          },
          {
            name: "Berita Acara Pemeriksaan",
            key: "berita-acara-pemeriksaan",
            link: "/berita-acara-pemeriksaan",
          },
          {
            name: "Laporan Hasil Pemeriksaan",
            key: "laporan-hasil-pemeriksaan",
            link: "/laporan-hasil-pemeriksaan",
          },
          {
            name: "Keputusan Hukuman Disiplin",
            key: "keputusan-hukuman-disiplin",
            link: "/keputusan-hukuman-disiplin",
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
        name: "E-Disposisi",
        key: "e-disposisi",
        link: "/e-disposisi",
        icon: LuTextQuote,
      },
      {
        name: "Manajemen Aset",
        key: "manajemen-aset",
        link: "/manajemen-aset",
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
