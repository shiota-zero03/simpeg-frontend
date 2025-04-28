export interface StorePegawai {
  name?: string | null;
  email?: string | null;
  oldPassword?: string | null;
  password?: string | null;
  nip?: string | null;
  role?: string | null;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  placeOfBirth?: string | null;
  tempatLahir?: string | null;
  rank?: string | null;
  group?: string | null;
  gender?: string | null;
  position?: number | null;
  education?: string | null;
  pensionAge?: number | null;
  pensionDate?: string | null;
  employmentDate?: string | null;
  status?: boolean;
  photo?: string | null;
  employmentStatus?: string | null;
  statusAsn?: boolean | null;
}

export interface StoreSuratPegawai {
  userId?: string;
  startDate?: string;
  endDate?: string;
  typeForm?: string;
  description?: string;
}

export interface StorePelaporanPegawai {
  latarBelakang?: string;
  sasaran?: string;
  maksud?: string;
  tujuan?: string;
  dasarHukum?: string;
  isiLaporan?: string;
  jabatanPengelola?: string;
  pengelola?: string;
  nipPengelola?: string;
  subgadin?: string;
  jabatanSubagin?: string;
  nipSubagin?: string;
  sekertaris?: string;
  jabatanSekertaris?: string;
  nipSekertaris?: string;
}