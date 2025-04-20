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
  diPanggil: string;
  nipDiPanggil: string;
  jabatanDiPanggil: string;
  unitDiPanggil: string;
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
