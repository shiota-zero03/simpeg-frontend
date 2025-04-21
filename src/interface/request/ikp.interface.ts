export interface StoreIKP {
  userId?: string;
  ikps?: {
    sasaran?: string;
    indicator?: string;
    target?: string;
    status?: string;
    realisasi?: string;
  }[];
}

export interface StoreIKPSetuju {
  sasaran?: string;
  indicator?: string;
  target?: string;
  status?: string;
  realisasi?: string;
}

export interface StoreIKPPerubahan {
  description?: string;
  dialog?: string;
  ubahTarget?: string;
  status?: string;
}