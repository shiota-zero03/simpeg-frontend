import { BaseRes } from "./base.response";

export interface NotificationRes {
  id: number;
  type: "INFORMASI" | "TOLAK" | "SETUJU";
  jenis: "IKP" | "DISPOSISI" | "PENILAIAN";
  status: boolean;
  message: string;
  createdAt: string;
}

export interface INotificationRes extends BaseRes {
  data: NotificationRes[];
}
