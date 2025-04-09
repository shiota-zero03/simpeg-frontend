import { BaseRes, PaginationRes } from "./base.response";

export interface BeritaRes {
  id: string;
  images: string;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
}

export interface IBeritaListRes extends BaseRes {
  data: {
    response: BeritaRes[];
    pagination: PaginationRes;
  };
}

export interface IBeritaRes extends BaseRes {
  data: BeritaRes;
}
