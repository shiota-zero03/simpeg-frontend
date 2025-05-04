import { BaseRes, PaginationRes } from "./base.response";

export interface AssetHolderRes {
  userId: string;
  userName: string;
  jabatan: string;
  unit: string;
  tanggal: string;
  holders: {
    id: number;
    tanggal: string;
    assetId: string;
    kodeBarang: string;
    nomorRegistrasi: string;
    kategori: string;
    assetName: string;
    merk: string;
    harga: number;
    file: string;
    noBast: string;
  }[];
}

export interface IAssetHolderRes extends BaseRes {
  data: {
    response: AssetHolderRes[];
    pagination: PaginationRes;
  };
}

export interface IAssetHolderDetailRes extends BaseRes {
  data: AssetHolderRes;
}

export interface IAssetHolderOptionRes extends BaseRes {
  data: AssetHolderRes[];
}
