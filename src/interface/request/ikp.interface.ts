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
