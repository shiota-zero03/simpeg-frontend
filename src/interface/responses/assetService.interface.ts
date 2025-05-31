import { BaseRes, PaginationRes } from "./base.response";

export interface AssetServiceRes {
  id: number;
  type: string;
  createdAt: string;
  pajak5Tahun: string;
  pembayaranPajak: string;
  nominalBayar: number;
  startServis: string;
  endServis: string;
  nominalServis: number;
  servicesKe: number;
  nomorSurat: string;
  tanggalSurat: string;
  itemBelanjaRel: {
    id: number;
    name: string;
    namaBarang: string;
    dataBelanja: {
      kegiatan: {
        id: number;
        name: string;
        accountBank: string;
      };
    };
  };
  asset: {
    id: string;
    namaBarang: string;
    merkTipe: string;
  };
  assetHolder: {
    id: number;
    user: {
      id: string;
      name: string;
      jabatan: {
        id: number;
        nameJob: string;
      };
    };
  };
}

export interface IAssetServiceRes extends BaseRes {
  data: {
    response: AssetServiceRes[];
    pagination: PaginationRes;
  };
}

export interface IAssetServiceDetailRes extends BaseRes {
  data: AssetServiceRes;
}

export interface IAssetServiceOptionRes extends BaseRes {
  data: AssetServiceRes[];
}
