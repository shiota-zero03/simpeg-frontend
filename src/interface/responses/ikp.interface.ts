import { BaseRes, PaginationRes } from "./base.response";

export interface IKPListRes {
  id: string;
  name: string;
  nip: string;
  jabatan: string;
  ikps: {
    id: number;
    sasaran: string;
    target: string;
    ubahTarget: string;
    realisasi: string;
    status: string;
  }[];
  createdAt: string;
}
export interface IIKPListRes extends BaseRes {
  data: {
    response: IKPListRes[];
    pagination: PaginationRes;
  };
}

export interface IIKPDetailRes extends BaseRes {
  data: IKPListRes;
}
