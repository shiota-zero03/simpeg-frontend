import { BaseRes, PaginationRes } from "./base.response";

export interface PernilaianListRes {
  id: string;
  user: {
    name: string;
    nip: string;
    position: number;
    jabatan: {
      nameJob: string;
      id: number;
      atasan: number;
    };
  };
  performanceBobot: number | null;
  disciplineBobot: number | null;
  loyaltyBobot: number | null;
  cooperationBobot: number | null;
  attitudeBobot: number | null;
  performanceNilai: number | null;
  disciplineNilai: number | null;
  loyaltyNilai: number | null;
  cooperationNilai: number | null;
  attitudeNilai: number | null;
  totalBobot: number | null;
  totalNilai: number | null;
  bulanTahun: string | null;
  createdAt: string | null;
}

export interface IPenilaianListRes extends BaseRes {
  data: {
    response: PernilaianListRes[];
    pagination: PaginationRes;
  };
}
