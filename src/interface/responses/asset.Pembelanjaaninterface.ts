import { BaseRes, PaginationRes } from "./base.response";

export interface DataKegiatanRes {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  accountBank: string;
}

export interface IDataKegiatanRes extends BaseRes {
  data: {
    response: DataKegiatanRes[];
    pagination: PaginationRes;
  };
}

export interface IDataKegiatanDetailRes extends BaseRes {
  data: DataKegiatanRes;
}

export interface IDataKegiatanOptionRes extends BaseRes {
  data: DataKegiatanRes[];
}

export interface SubDataKegiatanRes {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  accountBank: string;
}

export interface ISubDataKegiatanRes extends BaseRes {
  data: {
    response: SubDataKegiatanRes[];
    pagination: PaginationRes;
  };
}

export interface ISubDataKegiatanDetailRes extends BaseRes {
  data: SubDataKegiatanRes;
}

export interface ISubDataKegiatanOptionRes extends BaseRes {
  data: SubDataKegiatanRes[];
}

export interface KegiatanBelanjaRes {
  id: number;
  namaBelanja: string;
  kegiatanId: number;
  subKegiatanId: number;
  uraian: string;
  accountBank: string;
  paguBelanja: number;
  createdAt: string;
  updatedAt: string;
  kegiatan: {
    id: number;
    name: string;
  };
  subKegiatan: {
    id: number;
    name: string;
  };
}

export interface IKegiatanBelanjaRes extends BaseRes {
  data: {
    response: KegiatanBelanjaRes[];
    pagination: PaginationRes;
  };
}

export interface IKegiatanBelanjaDetailRes extends BaseRes {
  data: KegiatanBelanjaRes;
}

export interface IKegiatanBelanjaOptionRes extends BaseRes {
  data: KegiatanBelanjaRes[];
}

export interface DataBelanjaRes {
  id: number;
  name: string;
  namaBarang: string;
  jumlah: number;
  satuan: string;
  hargaPerItem: number;
  jumlahPagu: number;
  tanggal: string;
  dataBelanja: {
    id: number;
    namaBelanja: string;
    kegiatan: {
      id: number;
      name: string;
    };
    subKegiatan: {
      id: number;
      name: string;
    };
  };
  Asset: {
    id: string;
    idBarang: string;
    kodeBarang: string;
    namaBarang: string;
    nomorRegistrasi: string;
    harga: number;
    merkTipe: string;
    ukuranCC: string;
    jenisBahan: string;
    nomorPabrik: string;
    nomorRangka: string;
    nomorMesin: string;
    nomorPolisi: string;
    dokumenTipe: string;
    dokumenNomor: string;
    keterangan: string;
    dokumen: string;
    kategori: string;
    tahunPerolehan: string;
    createdAt: string;
    updatedAt: string;
    images: string;
    status: boolean | null;
    holders: {
      id: number;
      user: {
        id: string;
        name: string;
      };
    }[];
  };
}

export interface IDataBelanjaRes extends BaseRes {
  data: {
    response: DataBelanjaRes[];
    pagination: PaginationRes;
  };
}

export interface IDataBelanjaDetailRes extends BaseRes {
  data: DataBelanjaRes;
}

export interface IDataBelanjaOptionRes extends BaseRes {
  data: DataBelanjaRes[];
}
