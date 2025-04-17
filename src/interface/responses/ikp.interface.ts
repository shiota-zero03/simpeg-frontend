import { BaseRes, PaginationRes } from "./base.response";

export interface IKPListRes {
  id: string;
  user: {
    id: string;
    nip: string;
    name: string;
    jabatan: {
      id: number;
      nameJob: string;
    };
  };
  createdAt: string;
  status: string;
}
export interface IIKPListRes extends BaseRes {
  data: {
    response: IKPListRes[];
    pagination: PaginationRes;
  };
}
