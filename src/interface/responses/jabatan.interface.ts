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

export interface HirarkiRes {
  id: number;
  nameJob: string;
  class: string | null;
  ketersediaan: number;
  subUnor: string;
  eselon: string | null;
  unit: {
    id: number;
    nameUnit: string;
  };
  user: {
    id: string;
    name: string;
    nip: string;
    photo: string | null;
    jabatan: {
      id: number;
      nameJob: string;
      class: string;
      ketersediaan: number;
      eselon: string | null;
      unit: {
        id: number;
        nameUnit: string;
      };
    };
  }[];
  parent: {
    nameJob: string;
    class: string;
    ketersediaan: number;
    eselon: string | null;
    unit: {
      id: number;
      nameUnit: string;
    };
  } | null;
  children: {
    id: number;
    nameJob: string;
    class: string;
    ketersediaan: number;
    eselon: string | null;
    unit: {
      id: number;
      nameUnit: string;
    };
  }[];
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
export interface IJabatanHirarkiRes extends BaseRes {
  data: HirarkiRes[];
}
