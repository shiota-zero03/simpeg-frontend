import { BaseRes, PaginationRes } from "./base.response";

export interface SPPDRes {
  id: string;
  nomorSurat: string;
  type: string;
  kodeRekening: string;
  activity: string;
  location: string;
  tanggal: string;
  startDate: string;
  endDate: string;
  reasoning: string;
  file: string;
  komitmenid: string;
  komitmenName: string;
  komitmenJabatan: string;
  komitmenNip: string;
  bendaharaId: string;
  bendaharaName: string;
  bendaharaJabatan: string;
  bendaharaNip: string;

  participants: {
    id: number;
    userId: string;
    bankAccount: string;
    position: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      nip: string;
      jabatan: {
        nameJob: string;
      } | null;
    };
    budgets: {
      id: number;
      transport: number;
      volTransport: number;
      representatif: number;
      volRepresentatif: number;
      dailyAllowance: number;
      volDailyAllowance: number;
      bankAccount: string;
    }[];
  }[];
}

export interface SPPDRekapRes {
  id: number;
  bankAccount: string;
  position: string;
  role: string;
  user: {
    id: string;
    nip: string;
    name: string;
  };
  sppd: {
    id: string;
    nomorSurat: string;
    type: string;
    kodeRekening: string;
    startDate: string;
    endDate: string;
    location: string;
    activity: string;
  }
}

export interface ISPPDRekapRes extends BaseRes {
  data: {
    response: SPPDRekapRes[];
    pagination: PaginationRes;
  };
}

export interface ISPPDRes extends BaseRes {
  data: {
    response: SPPDRes[];
    pagination: PaginationRes;
  };
}

export interface ISPPDDetailRes extends BaseRes {
  data: SPPDRes;
}

export interface ISPPDOptionRes extends BaseRes {
  data: SPPDRes[];
}


export interface PelaporanSPPDRes {
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

export interface IPelaporanSPPDListRes extends BaseRes {
  data: {
    response: PelaporanSPPDRes[];
    data: PelaporanSPPDRes[];
    pagination: PaginationRes;
  };
}

export interface IPelaporanSPPDRes extends BaseRes {
  data: PelaporanSPPDRes;
}
