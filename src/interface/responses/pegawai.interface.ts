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
    fungsionalJob: string;
    jabatanFungsional: string;
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
  isPimpinan: boolean;
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

export interface PegawaiOptionRes {
  userId: string;
  userName: string;
  jabatan: string;
  bawahan: {
    id: string;
    nip: string;
    name: string;
    email: string;
    jabatan: {
      id: number;
      nameJob: string;
    };
  }[];
}
export interface IPegawaiOptionRes extends BaseRes {
  data: PegawaiOptionRes;
}
export interface IPegawaiOptionDetailRes extends BaseRes {
  data: PegawaiRes[];
}

export interface SuratPegawaiRes {
  id: number;
  userId: string;
  startDate: string;
  endDate: string;
  typeForm: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    nip: string;
    name: string;
    jabatan: {
      id: number;
      nameJob: string;
    };
  };
}

export interface ISuratPegawaiListRes extends BaseRes {
  data: {
    response: SuratPegawaiRes[];
    data: SuratPegawaiRes[];
    pagination: PaginationRes;
  };
}

export interface ISuratPegawaiRes extends BaseRes {
  data: SuratPegawaiRes;
}

export interface PelaporanPegawaiRes {
  id: number;
  latarBelakang: string;
  sasaran: string;
  maksud: string;
  tujuan: string;
  dasarHukum: string;
  isiLaporan: string;
  jabatanPengelola: string;
  pengelola: string;
  nipPengelola: string;
  subgadin: string;
  jabatanSubagin: string;
  nipSubagin: string;
  sekertaris: string;
  jabatanSekertaris: string;
  nipSekertaris: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPelaporanPegawaiListRes extends BaseRes {
  data: {
    response: PelaporanPegawaiRes[];
    data: PelaporanPegawaiRes[];
    pagination: PaginationRes;
  };
}

export interface IPelaporanPegawaiRes extends BaseRes {
  data: PelaporanPegawaiRes;
}
