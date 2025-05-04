import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllNotification, updateNotification } from "./http";
import { AxiosError } from "axios";
import { BaseErrorRes } from "@/interface/responses/base.response";
import { INotificationRes } from "@/interface/responses/notification.interface";

export const useGetAllNotificatin = () => {
  return useQuery({
    queryKey: ["getAllNotification"],
    queryFn: () => getAllNotification(),
    staleTime: 300000,
  });
};
export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation<
    INotificationRes,
    AxiosError<BaseErrorRes>,
    { id: string }
  >({
    mutationFn: ({ id }) => updateNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updateNotification"] });
    },
    onError: (error) => {
      throw error;
    },
  });
};
