import { BaseRes, PaginationRes } from "./base.response";

export interface GaleriRes {
  id: string;
  title: string;
  type: string;
  images: string;
  video: string;
  status: boolean;
  createdAt: string;
}

export interface IGaleriListRes extends BaseRes {
  data: {
    response: GaleriRes[];
    pagination: PaginationRes;
  };
}

export interface IGaleriRes extends BaseRes {
  data: GaleriRes;
}
