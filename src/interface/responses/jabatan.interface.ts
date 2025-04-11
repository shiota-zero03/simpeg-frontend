import { BaseRes, PaginationRes } from "./base.response";

export interface JabatanRes {
  id: number;
  nameJob: string;
  singkatan: string;
  fungsionalJob: string | null;
  fungsional: boolean;
  class: string;
  atasan: number | null;
  parent: {
    nameJob: string;
    id: number;
  } | null;
  createdAt: string;
}

export interface IJabatanRes extends BaseRes {
  data: {
    response: JabatanRes[];
    pagination: PaginationRes;
  };
}

export interface IJabatanDetailRes extends BaseRes {
  data: JabatanRes;
}

export interface IJabatanOptionRes extends BaseRes {
  data: JabatanRes[];
}
