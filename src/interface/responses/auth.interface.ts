import { BaseRes } from "./base.response";

export interface LoginRes {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    role: string;
    nip: string;
    name: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    rank: string;
    group: string;
    eselon: string;
    position: string;
    education: string;
    pensionAge: number;
    pensionDate: string;
    employmentDate: string;
    photo: string;
    employmentStatus: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ILoginRes extends BaseRes {
  data: LoginRes;
}
