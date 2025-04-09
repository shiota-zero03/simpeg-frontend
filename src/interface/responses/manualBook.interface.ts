import { BaseRes, PaginationRes } from "./base.response";

export interface ManualBookRes {
    id: string;
    files: string;
}

export interface IManualBookRes extends BaseRes {
  data: {
    response: ManualBookRes[];
    pagination: PaginationRes;
  };
}
