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
        },
        budgets: {
            id: number;
            transport: number;
            volTransport: number;
            representatif: number;
            volRepresentatif: number;
            dailyAllowance: number;
            volDailyAllowance: number;
            bankAccount: string;
        }[]
    }[];
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
