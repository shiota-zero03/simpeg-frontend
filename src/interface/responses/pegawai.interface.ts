import { BaseRes, PaginationRes } from "./base.response";

export interface PegawaiRes {
  id: string;
  nip: string;
  name: string;
  role: string;
  unit: {
    id: number;
    nameUnit: string;
  };
  jabatan: {
    id: number;
    nameJob: string;
  };
  email: string;
  password: string;
  phoneNumber: string;
  dateOfBirth: string;
  placeOfBirth: string;
  rank: string;
  group: string;
  eselon: string;
  position: number | null;
  education: string;
  pensionAge: number | null;
  pensionDate: string;
  employmentDate: string;
  photo: string;
  employmentStatus: string;
  tanggalKGB: string;
  statusAsn: boolean;
  status: boolean;
  gender: string;
}

export interface IPegawaiListRes extends BaseRes {
  data: {
    response: PegawaiRes[];
    data: PegawaiRes[];
    pagination: PaginationRes;
  };
}

export interface IPegawaiRes extends BaseRes {
  data: PegawaiRes;
}
