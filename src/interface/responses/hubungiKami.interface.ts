import { BaseRes, PaginationRes } from "./base.response";

export interface HubungiKamiRes {
  id: string;
  title: string;
  phoneNumber: string;
  description: string;
  createdAt: string;
}

export interface IHubungiKamiRes extends BaseRes {
  data: {
    response: HubungiKamiRes[];
    pagination: PaginationRes;
  };
}
