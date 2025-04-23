export interface StoreSPPD {
  nomorSurat?: string;
  type?: string;
  kodeRekening?: string;
  activity?: string;
  location?: string;
  tanggal?: string;
  startDate?: string;
  endDate?: string;
  file?: string;
  komitmenid?: string;
  reasoning?: string;
  komitmenName?: string;
  komitmenJabatan?: string;
  komitmenNip?: string;
  bendaharaId?: string;
  bendaharaName?: string;
  bendaharaJabatan?: string;
  bendaharaNip?: string;
  participants?: {
    userId?: string;
    bankAccount?: string;
    position?: string;
    role?: string;
    budgets?: {
      transport?: number;
      volTransport?: number;
      representatif?: number;
      volRepresentatif?: number;
      dailyAllowance?: number;
      volDailyAllowance?: number;
      bankAccount?: string;
    }[];
  }[];
}
