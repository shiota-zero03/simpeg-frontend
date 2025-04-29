import { BaseRes, PaginationRes } from "./base.response";

export interface AssetRes {
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
}

export interface IAssetRes extends BaseRes {
  data: {
    response: AssetRes[];
    pagination: PaginationRes;
  };
}

export interface IAssetDetailRes extends BaseRes {
  data: AssetRes;
}

export interface IAssetOptionRes extends BaseRes {
  data: AssetRes[];
}

export interface IAssetWithHolderRes extends BaseRes {
  data: {
    id: string;
    namaBarang: string;
    holders: [
      {
        id: number;
        user: {
          id: string;
          name: string;
        };
      },
    ];
  }[];
}
