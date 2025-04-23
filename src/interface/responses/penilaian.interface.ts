import { BaseRes, PaginationRes } from "./base.response";

export interface PernilaianListRes {
  id: string;
  user: {
    id: string;
    name: string;
    nip: string;
    photo: string;
    jabatan: {
      nameJob: string;
    } | null;
  };
  userId: string;
  performanceBobot: number | null;
  performanceProofBobot: string | null;
  disciplineBobot: number | null;
  disciplineProofBobot: string | null;
  loyaltyBobot: number | null;
  loyaltyProofBobot: string | null;
  cooperationBobot: number | null;
  cooperationProofBobot: string | null;
  attitudeBobot: number | null;
  attitudeProofBobot: string | null;
  totalBobot: number | null;
  performanceNilai: number | null;
  performanceProofNilai: string | null;
  disciplineNilai: number | null;
  disciplineProofNilai: string | null;
  loyaltyNilai: number | null;
  loyaltyProofNilai: string | null;
  cooperationNilai: number | null;
  cooperationProofNilai: string | null;
  attitudeNilai: number | null;
  attitudeProofNilai: string | null;
  createdAt: string | null;
}

export interface IPenilaianListRes extends BaseRes {
  data: {
    response: PernilaianListRes[];
    pagination: PaginationRes;
  };
}

export interface IPenilaianDetailRes extends BaseRes {
  data: PernilaianListRes;
}
