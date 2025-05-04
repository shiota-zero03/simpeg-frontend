import instance from "@/api/axios";
import { INotificationRes } from "@/interface/responses/notification.interface";

export const getAllNotification = async (): Promise<INotificationRes> => {
  const response = await instance.get(`/admin/notifikasi`);
  return response.data;
};
export const updateNotification = async (
  id: string,
): Promise<INotificationRes> => {
  const response = await instance.put(
    `/admin/notifikasi/update/status/${id}`,
    {},
  );
  return response.data;
};
