import { BaseRes, PaginationRes } from "./base.response";

export interface AssetHolderRes {
  id: number;
  assetId: string;
  userId: string;
  dokumenPendukung: string;
  noBast: string;
  file: string;
  name: string;
  asset: {
    idBarang: string;
    kodeBarang: string;
    namaBarang: string;
    nomorRegistrasi: string;
  };
  jabatan: {
    id: number;
    nameJob: string;
    unit: {
      id: number;
      nameUnit: string;
    }
  };
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
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
