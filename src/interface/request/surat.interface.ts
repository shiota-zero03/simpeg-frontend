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
  DiPerintahSuratPemeriksaan?: {
    diPerintah?: string;
    nipDiPerintah?: string;
    jabatanDiPerintah?: string;
  }[];
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

export interface StoreBeritaAcaraPemeriksaan {
  nomorSurat?: string;
  tanggalSurat?: string;
  keterangan?: string;
  pemeriksa?: string;
  nipPemeriksa?: string;
  jabatanPemeriksa?: string;
  pangkatPemeriksa?: string;
  golonganPemeriksa?: string;
  unitPemeriksa?: string;
  diPeriksa?: string;
  nipDiPeriksa?: string;
  jabatanDiPeriksa?: string;
  pangkatDiPeriksa?: string;
  golonganDiPeriksa?: string;
  unitDiPeriksa?: string;
}

export interface StoreHasilPemeriksaan {
  lokasi?: string;
  yangMelaporkan?: string;
  nipMelaporkan?: string;
  jabatanMelaporkan?: string;
  pangkatMelaporakn?: string;
  nameKepada?: string;
  namePermintaan?: string;
  nipPermintaan?: string;
  jabatanPermintaan?: string;
  golonganPermintaan?: string;
  unitPermintaan?: string;
  tanggalSurat?: string;
  keterangan?: string;
  hasil?: {
    bentukPelanggaran?: string;
    waktu?: string;
    tempat?: string;
    faktorPemberat?: string;
    faktorMeringankan?: string;
    dampak?: string;
  }[];
  tembusan?: {
    jabatan?: string;
  }[];
}

export interface StoreKeputusan {
  membaca?: string;
  menimbang?: string;
  mengingat?: string;
  kesatu?: string;
  nameYangDitetapkan?: string;
  nipYangDitetapkan?: string;
  jabatanYangDitetapkan?: string;
  golonganYangDitetapkan?: string;
  unitYangDitetapkan?: string;
  alasan?: string;
  kedua?: string;
  ketiga?: string;
  nameJabatan?: string;
  nipJabatan?: string;
  ttdJabatan?: string;
  tingkat?: string;
  tanggalSurat?: string;
  nomorSurat?: string;
  tempatDikeluarkan?: string;
  tembusan?: {
    jabatan?: string;
  }[];
}
