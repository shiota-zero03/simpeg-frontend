import { BaseRes, PaginationRes } from "./base.response";

export interface KopSuratRes {
  id: number;
  kopSurat: string;
  slug: string;
}

export interface IKopSuratDetaiRes extends BaseRes {
  data: KopSuratRes;
}

export interface SuratPemeriksaanRes {
  id: number;
  nomorSurat: string;
  tempatDikeluarkan: string;
  tanggalSurat: string;
  keterangan: string;
  pemberiPerintah: string;
  nipPemberiPerintah: string;
  jabatanPemberiPerintah: string;
  diPerintah: string;
  nipDiPerintah: string;
  jabatanDiPerintah: string;
  namaTtd: string;
  jabatanTtd: string;
  nipTtd: string;
  DiPerintahSuratPemeriksaan?: {
    diPerintah: string;
    nipDiPerintah: string;
    jabatanDiPerintah: string;
  }[];
}

export interface ISuratPemeriksaanRes extends BaseRes {
  data: {
    response: SuratPemeriksaanRes[];
    pagination: PaginationRes;
  };
}

export interface ISuratPemeriksaanDetaiRes extends BaseRes {
  data: SuratPemeriksaanRes;
}

export interface SuratPemanggilanRes {
  id: number;
  nomorSurat: string;
  nomorPemanggilan: string;
  tanggalSurat: string;
  waktu: string;
  tempat: string;
  keterangan: string;
  pemanggil: string;
  nipPemanggil: string;
  jabatanPemanggil: string;
  unitPemanggil: string;
  diPanggil?: string;
  nipDiPanggil?: string;
  jabatanDiPanggil?: string;
  unitDiPanggil?: string;
  DiPanggilSuratPemanggilan?: {
    diPanggil: string;
    nipDiPanggil: string;
    jabatanDiPanggil: string;
    unitDiPanggil: string;
  }[] | null;
  namaTtd: string;
  nipTtd: string;
  jabatanTtd: string;
}

export interface ISuratPemanggilanRes extends BaseRes {
  data: {
    response: SuratPemanggilanRes[];
    pagination: PaginationRes;
  };
}

export interface ISuratPemanggilanDetaiRes extends BaseRes {
  data: SuratPemanggilanRes;
}

export interface BeritaAcaraPermintaanRes {
  id: number;
  nomorSurat: string;
  nomorSuratKeterangan: string;
  tanggalSurat: string;
  waktu: string;
  tempat: string;
  keterangan: string;
  createdAt: string;
  updatedAt: string;
  TimPemeriksa: {
    id: number;
    name: string;
    pemeriksaKeteranganId: number;
  }[];
  PihakDimintai: {
    id: number;
    name: string;
    nip: string;
    jabatan: string;
    pangkat: string;
    golongan: string;
    pemeriksaKeteranganId: number;
  }[];
  Pertanyaan: {
    id: number;
    pemeriksaKeteranganId: number;
    pertanyaan: string;
    jawaban: string;
  }[];
}

export interface IBeritaAcaraPermintaanRes extends BaseRes {
  data: {
    response: BeritaAcaraPermintaanRes[];
    pagination: PaginationRes;
  };
}

export interface IBeritaAcaraPermintaanDetaiRes extends BaseRes {
  data: BeritaAcaraPermintaanRes;
}

export interface BeritaAcaraPemeriksaanRes {
  id: number;
  tanggalSurat: string;
  nomorSurat: string;
  keterangan: string;
  pemeriksa: string;
  nipPemeriksa: string;
  jabatanPemeriksa: string;
  pangkatPemeriksa: string;
  golonganPemeriksa: string;
  unitPemeriksa: string;
  diPeriksa: string;
  nipDiPeriksa: string;
  jabatanDiPeriksa: string;
  pangkatDiPeriksa: string;
  golonganDiPeriksa: string;
  unitDiPeriksa: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBeritaAcaraPemeriksaanRes extends BaseRes {
  data: {
    response: BeritaAcaraPemeriksaanRes[];
    pagination: PaginationRes;
  };
}

export interface IBeritaAcaraPemeriksaanDetaiRes extends BaseRes {
  data: BeritaAcaraPemeriksaanRes;
}

export interface HasilPemeriksaanRes {
  id: number;
  lokasi: string;
  yangMelaporkan: string;
  nipMelaporkan: string;
  jabatanMelaporkan: string;
  pangkatMelaporakn: string;
  nameKepada: string;
  namePermintaan: string;
  tanggalSurat: string;
  nipPermintaan: string;
  jabatanPermintaan: string;
  golonganPermintaan: string;
  unitPermintaan: string;
  keterangan: string;
  createdAt: string;
  updatedAt: string;
  hasil: {
    id: number;
    idHasilPemeriksaan: number;
    bentukPelanggaran: string;
    waktu: string;
    tempat: string;
    faktorPemberat: string;
    faktorMeringankan: string;
    dampak: string;
  }[];
  tembusan: {
    id: number;
    jabatan: string;
    idHasilPemeriksaan: number;
    idKeputusan: null;
  }[];
}

export interface IHasilPemeriksaanRes extends BaseRes {
  data: {
    response: HasilPemeriksaanRes[];
    pagination: PaginationRes;
  };
}

export interface IHasilPemeriksaanDetaiRes extends BaseRes {
  data: HasilPemeriksaanRes;
}

export interface KeputusanRes {
  id: number;
  membaca: string;
  menimbang: string;
  mengingat: string;
  kesatu: string;
  nameYangDitetapkan: string;
  nipYangDitetapkan: string;
  jabatanYangDitetapkan: string;
  golonganYangDitetapkan: string;
  unitYangDitetapkan: string;
  alasan: string;
  kedua: string;
  ketiga: string;
  nameJabatan: string;
  nipJabatan: string;
  ttdJabatan: string;
  tanggalSurat: string;
  nomorSurat: string;
  tingkat: string;
  tempatDikeluarkan: string;
  createdAt: string;
  updatedAt: string;
  tembusan: {
    id: number;
    jabatan: string;
    idHasilPemeriksaan: string;
    idKeputusan: number;
  }[];
}

export interface IKeputusanRes extends BaseRes {
  data: {
    response: KeputusanRes[];
    pagination: PaginationRes;
  };
}

export interface IKeputusanDetaiRes extends BaseRes {
  data: KeputusanRes;
}
