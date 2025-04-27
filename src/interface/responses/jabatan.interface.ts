import { BaseRes, PaginationRes } from "./base.response";

export interface JabatanRes {
  id: number;
  class: string;
  createdAt: string;
  eselon: string;
  fungsional: boolean;
  jabatanPermenpan: string | null;
  ketersediaan: number;
  nameJob: string;
  subJabatanPermenpan: string | null;
  subUnor: string | null;
  atasan: number | null;
  unitId: number | null;
  parent: {
    nameJob: string;
    id: number;
  } | null;
  unit: {
    nameUnit: string;
    id: number;
  } | null;
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
