export const GaleryDummy: {
  image: string;
  title: string | null;
}[] = [
  {
    image:
      "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    title: "Upaya Pemerintah Jaga Kinerja Perdagangan Internasional",
  },
  {
    image:
      "https://cdn.rri.co.id/berita-foto/Voice_of_Indonesia/o/1717570131020-EfUuLMebWqGnAyZmx0NMTuU0zNG4P4CdXc6IZCo3/2ei0y5egvgoekzc.jpeg",
    title:
      "Mendag RI Menerima Kunjungan Direktur Jendral Kementrian Ekonomi dan Perdagangan",
  },
  {
    image:
      "https://cdn.rri.co.id/berita-foto/Voice_of_Indonesia/o/1717570131020-EfUuLMebWqGnAyZmx0NMTuU0zNG4P4CdXc6IZCo3/2ei0y5egvgoekzc.jpeg",
    title: null,
  },
];

export const BeritaDummy: {
  id: number;
  thumbnail: string;
  title: string;
  createdAt: string;
  content: string;
  slug: string;
}[] = [
  {
    id: 1,
    thumbnail:
      "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    title:
      "1. Ini Peringkat Prestasi Daerah pada MTQ ke-38 Tingkat Jawa Barat 2024",
    slug: "lorem-ipsum",
    createdAt: "2025-01-05T09:00:00Z",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 2,
    thumbnail:
      "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    title:
      "2. Ini Peringkat Prestasi Daerah pada MTQ ke-38 Tingkat Jawa Barat 2024",
    slug: "lorem-ipsum",
    createdAt: "2025-01-05T09:00:00Z",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 3,
    thumbnail:
      "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    title:
      "3. Ini Peringkat Prestasi Daerah pada MTQ ke-38 Tingkat Jawa Barat 2024",
    slug: "lorem-ipsum",
    createdAt: "2025-01-05T09:00:00Z",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 4,
    thumbnail:
      "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    title:
      "4. Ini Peringkat Prestasi Daerah pada MTQ ke-38 Tingkat Jawa Barat 2024",
    slug: "lorem-ipsum",
    createdAt: "2025-01-05T09:00:00Z",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 5,
    thumbnail:
      "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    title:
      "5. Ini Peringkat Prestasi Daerah pada MTQ ke-38 Tingkat Jawa Barat 2024",
    slug: "lorem-ipsum",
    createdAt: "2025-01-05T09:00:00Z",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 6,
    thumbnail:
      "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    title:
      "6. Ini Peringkat Prestasi Daerah pada MTQ ke-38 Tingkat Jawa Barat 2024",
    slug: "lorem-ipsum",
    createdAt: "2025-01-05T09:00:00Z",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

export const JabatanDummy: {
  id: string;
  nama: string;
  kelas: number;
  atasan: string; // atasan dari jabatan
}[] = [
  {
    id: "1",
    nama: "Kepala Dinas",
    kelas: 1,
    atasan: "", // posisi tertinggi
  },
  {
    id: "2",
    nama: "Sekretaris",
    kelas: 2,
    atasan: "Kepala Dinas",
  },
  {
    id: "3",
    nama: "Kepala Bidang Pelayanan",
    kelas: 2,
    atasan: "Kepala Dinas",
  },
  {
    id: "4",
    nama: "Kepala Bidang Pengawasan",
    kelas: 2,
    atasan: "Kepala Dinas",
  },
  {
    id: "5",
    nama: "Kepala Seksi Layanan Publik",
    kelas: 3,
    atasan: "Kepala Bidang Pelayanan",
  },
  {
    id: "6",
    nama: "Kepala Seksi Pengaduan Masyarakat",
    kelas: 3,
    atasan: "Kepala Bidang Pelayanan",
  },
  {
    id: "7",
    nama: "Kepala Seksi Audit Internal",
    kelas: 3,
    atasan: "Kepala Bidang Pengawasan",
  },
  {
    id: "8",
    nama: "Kepala Seksi Kepatuhan",
    kelas: 3,
    atasan: "Kepala Bidang Pengawasan",
  },
  {
    id: "9",
    nama: "Staf Sekretariat",
    kelas: 4,
    atasan: "Sekretaris",
  },
];

export const PegawaiDummy: {
  id: number;
  nama: string;
  atasan: string;
  jabatan: string;
}[] = [
  {
    id: 1,
    nama: "Ahmad Fadli",
    atasan: "Dr. Siti Lestari",
    jabatan: "Staff Keuangan",
  },
  {
    id: 2,
    nama: "Nina Kartika",
    atasan: "Dr. Siti Lestari",
    jabatan: "Analis Program",
  },
  {
    id: 3,
    nama: "Rudi Hartono",
    atasan: "Ir. Budi Prasetyo",
    jabatan: "Teknisi Lapangan",
  },
  {
    id: 4,
    nama: "Dewi Ayu",
    atasan: "Ir. Budi Prasetyo",
    jabatan: "Sekretaris",
  },
  {
    id: 5,
    nama: "Yusuf Hidayat",
    atasan: "Dr. Siti Lestari",
    jabatan: "Kasubbag Umum",
  },
];

export const SPPDDummy: {
  id: number;
  pegawai: string;
  kegiatan: string;
  waktu: string;
  lokasi: string;
  file?: string;
  anggaran: number;
  pengikut: string[];
}[] = [
  {
    id: 1,
    pegawai: "Ahmad Fadli",
    // file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Monitoring Dana BOS",
    waktu: "2025-04-10",
    lokasi: "Kabupaten Garut",
    anggaran: 3500000,
    pengikut: ["Nina Kartika", "Rudi Hartono"],
  },
  {
    id: 2,
    pegawai: "Yusuf Hidayat",
    file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Workshop Sistem Informasi",
    waktu: "2025-04-15",
    lokasi: "Kota Bandung",
    anggaran: 4200000,
    pengikut: ["Dewi Ayu"],
  },
  {
    id: 3,
    pegawai: "Rudi Hartono",
    file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Survey Lapangan Infrastruktur",
    waktu: "2025-04-20",
    lokasi: "Kabupaten Tasikmalaya",
    anggaran: 2800000,
    pengikut: [],
  },
  {
    id: 4,
    pegawai: "Nina Kartika",
    file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Bimbingan Teknis Aplikasi e-SPPD",
    waktu: "2025-04-22",
    lokasi: "Kota Cimahi",
    anggaran: 3900000,
    pengikut: ["Dewi Ayu"],
  },
  {
    id: 5,
    pegawai: "Dewi Ayu",
    file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Penyusunan Rencana Kegiatan Tahunan",
    waktu: "2025-04-25",
    lokasi: "Kota Sukabumi",
    anggaran: 3100000,
    pengikut: [],
  },
  {
    id: 6,
    pegawai: "Ahmad Fadli",
    file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Evaluasi Pelaporan Keuangan",
    waktu: "2025-04-28",
    lokasi: "Kabupaten Sumedang",
    anggaran: 3600000,
    pengikut: ["Yusuf Hidayat"],
  },
  {
    id: 7,
    pegawai: "Yusuf Hidayat",
    file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Sosialisasi SPBE (Sistem Pemerintahan Berbasis Elektronik)",
    waktu: "2025-05-01",
    lokasi: "Kota Tasikmalaya",
    anggaran: 4000000,
    pengikut: ["Rudi Hartono", "Nina Kartika"],
  },
  {
    id: 8,
    pegawai: "Rudi Hartono",
    file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Pemeliharaan Jaringan Komputer",
    waktu: "2025-05-05",
    lokasi: "Kabupaten Ciamis",
    anggaran: 2750000,
    pengikut: [],
  },
  {
    id: 9,
    pegawai: "Nina Kartika",
    file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Koordinasi Pengelolaan Data",
    waktu: "2025-05-08",
    lokasi: "Kota Cirebon",
    anggaran: 3400000,
    pengikut: ["Ahmad Fadli"],
  },
  {
    id: 10,
    pegawai: "Dewi Ayu",
    file: "https://static.gatra.com/foldershared/images/2019/thytha/11-Nov/qoh3.jpg",
    kegiatan: "Peningkatan Kompetensi Pegawai",
    waktu: "2025-05-12",
    lokasi: "Kota Bekasi",
    anggaran: 3800000,
    pengikut: ["Yusuf Hidayat", "Nina Kartika"],
  },
];
