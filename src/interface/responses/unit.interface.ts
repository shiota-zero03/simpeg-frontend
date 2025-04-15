import { BaseRes, PaginationRes } from "./base.response";

export interface UnitRes {
  id: number;
  idUnit: string;
  nameUnit: string;
  description: string | null;
}

export interface IUnitRes extends BaseRes {
  data: {
    response: UnitRes[];
    pagination: PaginationRes;
  };
}

export interface IUnitDetailRes extends BaseRes {
  data: UnitRes;
}

export interface IUnitOptionRes extends BaseRes {
  data: UnitRes[];
}
