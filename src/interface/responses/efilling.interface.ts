import { BaseRes, PaginationRes } from "./base.response";

export interface EFillingRes {
  id: string;
  userId: string;
  tanggal: string;
  title: string;
  description: string;
  file: string;
  createdAt: string;
  updatedAt: string;
}

export interface IEFillingRes extends BaseRes {
  data: {
    response: EFillingRes[];
    pagination: PaginationRes;
  };
}

export interface IEFillingDetailRes extends BaseRes {
  data: EFillingRes;
}
