export interface StoreIKP {
  userId?: string;
  ikps?: {
    sasaran?: string;
    indicator?: string;
    target?: number;
    status?: string;
  }[];
}
