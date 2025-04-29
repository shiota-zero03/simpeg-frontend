export interface StoreDataKegiatan {
  name?: string;
  accountBank?: string;
}
export interface StoreSubDataKegiatan {
  name?: string;
  accountBank?: string;
}

export interface StoreKegiatanBelanja {
  namaBelanja?: string;
  kegiatanId?: number | null;
  subKegiatanId?: number | null;
  uraian?: string;
  paguBelanja?: number;
  accountBank?: string;
}

export interface StoreDataBelanja {
  name?: string;
  idDataBelanja?: number | null;
  namaBarang?: string;
  tanggal?: string;
  jumlah?: number;
  satuan?: string;
  hargaPerItem?: number;
  jumlahPagu?: number;
}
