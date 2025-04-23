import { BaseRes, PaginationRes } from "./base.response";

export interface IKPListRes {
  id: string;
  name: string;
  nip: string;
  jabatan: string;
  ttdNIP: string;
  ttdName: string;
  ttdJabatan: string;
  ikps: {
    id: number | null;
    sasaran: string | null;
    target: string | null;
    indicator: string | null;
    description: string | null;
    dialog: string | null;
    status: string | null;
    ubahTarget: string | null;
    realisasi: string | null;
    reasoning: string | null;
    count: number | null;
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
