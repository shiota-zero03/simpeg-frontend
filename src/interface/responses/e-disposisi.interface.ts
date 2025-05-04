import { BaseRes, PaginationRes } from "./base.response";

export interface EDisposisiRes {
  id: number;
  nomorSurat: string;
  tanggalSurat: string;
  tanggalDiterima: string;
  sifat: string;
  description: string;
  paraf: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
  };
  instruksi: string | null;
  riwayat: {
    id: number;
    description: string;
    createdAt: string;
  }[];
}

export interface IEDisposisiListRes extends BaseRes {
  data: {
    response: EDisposisiRes[];
    pagination: PaginationRes;
  };
}

export interface IEDisposisiRes extends BaseRes {
  data: EDisposisiRes;
}
