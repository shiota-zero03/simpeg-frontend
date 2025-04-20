export interface StoreKopSurat {
  file?: string;
}

export interface StoreSuratPemeriksaan {
  nomorSurat?: string;
  tempatDikeluarkan?: string;
  tanggalSurat?: string;
  pemberiPerintah?: string;
  nipPemberiPerintah?: string;
  jabatanPemberiPerintah?: string;
  diPerintah?: string;
  nipDiPerintah?: string;
  jabatanDiPerintah?: string;
  keterangan?: string;
  namaTtd?: string;
  nipTtd?: string;
  jabatanTtd?: string;
}

export interface StoreSuratPemanggilan {
  nomorSurat?: string;
  nomorPanggilan?: string;
  tanggalSurat?: string;
  waktu?: string;
  tempat?: string;
  keterangan?: string;
  pemanggil?: string;
  nipPemanggil?: string;
  jabatanPemanggil?: string;
  unitPemanggil?: string;
  diPanggil?: string;
  nipDiPanggil?: string;
  jabatanDiPanggil?: string;
  unitDiPanggil?: string;
  namaTtd?: string;
  nipTtd?: string;
  jabatanTtd?: string;
}

export interface StoreBeritaAcaraPermintaan {
  nomorSurat?: string;
  nomorSuratKeterangan?: string;
  tanggalSurat?: string;
  waktu?: string;
  tempat?: string;
  keterangan?: string;
  timPemeriksa?: {
    name?: string;
  }[];
  pihakDiminta?: {
    name?: string;
    nip?: string;
    jabatan?: string;
    pangkat?: string;
    golongan?: string;
  }[];
  pertanyaan?: {
    tanya?: string;
    jawaban?: string;
  }[];
}
