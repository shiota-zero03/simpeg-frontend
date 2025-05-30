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
  namaBarang?: string;
  jumlah?: number;
  satuan?: string;
  hargaPerItem?: number;
  jumlahPagu?: number;
  tanggal?: string;
  idDataBelanja?: number | null;

  asset? :{
    idBarang?: string;
    kodeBarang?: string;
    namaBarang?: string;
    nomorRegistrasi?: string;
    harga?: number;
    merkTipe?: string;
    ukuranCC?: string;
    jenisBahan?: string;
    nomorPabrik?: string;
    nomorRangka?: string;
    nomorMesin?: string;
    nomorPolisi?: string;
    dokumenTipe?: string;
    dokumenNomor?: string;
    keterangan?: string;
    tahunPerolehan?: string;
    kategori?: string;
    dokumen?: string;
  }
}
